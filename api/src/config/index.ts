export const config = {
  cosmosDb: {
    endpoint: process.env.COSMOS_DB_ENDPOINT || '',
    key: process.env.COSMOS_DB_KEY || '',
    databaseId: 'mackprojekt',
    containers: {
      users: 'users',
      contacts: 'contacts',
      sessions: 'sessions'
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: '7d'
  },
  email: {
    connectionString: process.env.COMMUNICATION_SERVICES_CONNECTION_STRING || '',
    senderAddress: process.env.SENDER_EMAIL || 'noreply@mackprojekt.com'
  },
  appInsights: {
    connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || ''
  },
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY || '',
    serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX || 'us1',
    audienceId: process.env.MAILCHIMP_AUDIENCE_ID || ''
  },
  passkit: {
    wwdrBase64: process.env.PASSKIT_WWDR_BASE64 || '',
    signerCertBase64: process.env.PASSKIT_SIGNER_CERT_BASE64 || '',
    signerKeyBase64: process.env.PASSKIT_SIGNER_KEY_BASE64 || '',
    signerKeyPassphrase: process.env.PASSKIT_SIGNER_KEY_PASSPHRASE || '',
    teamIdentifier: process.env.PASSKIT_TEAM_IDENTIFIER || '',
    passTypeIdentifier: process.env.PASSKIT_PASS_TYPE_IDENTIFIER || '',
    organizationName: process.env.PASSKIT_ORGANIZATION_NAME || 'T.O.O.L.S Inc'
  }
};

// Validate required environment variables
if (!config.jwt.secret || config.jwt.secret === '') {
  throw new Error('JWT_SECRET environment variable is required');
}

if (!config.cosmosDb.endpoint || !config.cosmosDb.key) {
  throw new Error('COSMOS_DB_ENDPOINT and COSMOS_DB_KEY environment variables are required');
}

if (!config.mailchimp.apiKey || !config.mailchimp.audienceId) {
  console.warn('MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID not configured - Mailchimp integration disabled');
}

