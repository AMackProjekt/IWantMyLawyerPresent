import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { PKPass } from 'passkit-generator';
import { config } from '../../config';
import { checkRateLimit } from '../../utils/rateLimit';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

function hasPasskitConfig(): boolean {
  return Boolean(
    config.passkit.wwdrBase64 &&
      config.passkit.signerCertBase64 &&
      config.passkit.signerKeyBase64 &&
      config.passkit.teamIdentifier &&
      config.passkit.passTypeIdentifier,
  );
}

async function loadImageAssets() {
  const logoPath = resolve(process.cwd(), '..', 'public', 'logos', 'main-logo.png');
  const iconPath = resolve(process.cwd(), '..', 'public', 'logos', 'org-logo-1.png');

  const [logo, logo2x, icon, icon2x] = await Promise.all([
    readFile(logoPath),
    readFile(logoPath),
    readFile(iconPath),
    readFile(iconPath),
  ]);

  return {
    'logo.png': logo,
    'logo@2x.png': logo2x,
    'icon.png': icon,
    'icon@2x.png': icon2x,
  } as const;
}

export async function walletKnowYourRightsPass(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  try {
    const rateLimitResponse = checkRateLimit(request, 20, 60000);
    if (rateLimitResponse) return rateLimitResponse;

    if (!hasPasskitConfig()) {
      return {
        status: 503,
        jsonBody: {
          error:
            'Apple Wallet pass is not configured yet. Configure PASSKIT_* environment variables to enable signed .pkpass downloads.',
        },
      };
    }

    const certificates = {
      wwdr: Buffer.from(config.passkit.wwdrBase64, 'base64'),
      signerCert: Buffer.from(config.passkit.signerCertBase64, 'base64'),
      signerKey: Buffer.from(config.passkit.signerKeyBase64, 'base64'),
      signerKeyPassphrase: config.passkit.signerKeyPassphrase || undefined,
    };

    const passImages = await loadImageAssets();

    const pass = await PKPass.from(
      {
        model: passImages,
        certificates,
      },
      {
        formatVersion: 1,
        passTypeIdentifier: config.passkit.passTypeIdentifier,
        teamIdentifier: config.passkit.teamIdentifier,
        organizationName: config.passkit.organizationName,
        serialNumber: `kyr-${Date.now()}`,
        description: 'Know Your Rights Digital Card',
        logoText: 'Know Your Rights',
        foregroundColor: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(18, 26, 45)',
        labelColor: 'rgb(255, 214, 10)',
      },
    );

    pass.setBarcodes({
      message: 'KNOW-YOUR-RIGHTS',
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1',
      altText: 'Know Your Rights',
    });

    pass.type = 'storeCard';
    pass.primaryFields.push({
      key: 'title',
      label: 'RESOURCE',
      value: 'Know Your Rights',
    });
    pass.secondaryFields.push({
      key: 'rights-1',
      label: 'RIGHT 1',
      value: 'Ask: Am I free to leave?',
    });
    pass.secondaryFields.push({
      key: 'rights-2',
      label: 'RIGHT 2',
      value: 'Say: I want a lawyer.',
    });
    pass.auxiliaryFields.push({
      key: 'rights-3',
      label: 'RIGHT 3',
      value: 'Do not consent to searches.',
    });

    pass.backFields.push({
      key: 'script',
      label: 'Emergency Script',
      value:
        'Officer, I am invoking my right to remain silent. I want to speak to a lawyer. I do not consent to any searches.',
    });
    pass.backFields.push({
      key: 'note',
      label: 'Reminder',
      value: 'Stay calm. Keep hands visible. Do not argue or run.',
    });

    const passBuffer = pass.getAsBuffer();

    return {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': 'attachment; filename="know-your-rights.pkpass"',
        'Cache-Control': 'no-store',
      },
      body: passBuffer,
    };
  } catch (error) {
    context.error('wallet-know-your-rights-pass error:', error);
    return {
      status: 500,
      jsonBody: {
        error: 'Failed to generate Apple Wallet pass. Verify PASSKIT certificate configuration.',
      },
    };
  }
}

app.http('wallet-know-your-rights-pass', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'wallet/know-your-rights/pass',
  handler: walletKnowYourRightsPass,
});
