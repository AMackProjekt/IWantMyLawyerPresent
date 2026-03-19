import { useMemo, useState } from 'react';
import { defaultSiteContent, type SiteContent } from '../content/siteContent';
import { useSiteContent } from '../context/SiteContentContext';

const AUTH_STORAGE_KEY = 'iwmlp.adminAuth.v1';

const palettePresets = [
  {
    name: 'Obsidian Gold',
    values: {
      primaryColor: '#d4af37',
      secondaryColor: '#c0c0c0',
      accentColor: '#8b4513',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      headingColor: '#ffffff',
      ctaBackgroundColor: '#d4af37',
      ctaTextColor: '#000000',
      navBackgroundColor: '#000000',
      footerBackgroundColor: '#0a0a0a',
    },
  },
  {
    name: 'Electric Neon',
    values: {
      primaryColor: '#38f9d7',
      secondaryColor: '#43e97b',
      accentColor: '#00f5ff',
      backgroundColor: '#06070b',
      textColor: '#f8fafc',
      headingColor: '#ffffff',
      ctaBackgroundColor: '#00f5ff',
      ctaTextColor: '#02121c',
      navBackgroundColor: '#081018',
      footerBackgroundColor: '#050b11',
    },
  },
  {
    name: 'Sunset Punch',
    values: {
      primaryColor: '#ff6a3d',
      secondaryColor: '#ffd166',
      accentColor: '#ef476f',
      backgroundColor: '#1a1210',
      textColor: '#fff3e9',
      headingColor: '#ffffff',
      ctaBackgroundColor: '#ff6a3d',
      ctaTextColor: '#1a0f0a',
      navBackgroundColor: '#2b1a15',
      footerBackgroundColor: '#140d0b',
    },
  },
];

type AdminAuth = {
  username: string;
  password: string;
};

type AdminTab =
  | 'dashboard'
  | 'brand'
  | 'media'
  | 'theme'
  | 'layout'
  | 'content'
  | 'commerce'
  | 'marketing'
  | 'advanced';

function readAdminAuth(): AdminAuth | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as AdminAuth;
  } catch {
    return null;
  }
}

function saveAdminAuth(nextAuth: AdminAuth) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
  }
}

function cls(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/75 p-5 shadow-lg shadow-black/20">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      {description ? <p className="mt-1 text-sm text-slate-300">{description}</p> : null}
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-200">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-200">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
      />
    </label>
  );
}

function ToggleField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2">
      <span className="text-sm font-semibold text-slate-200">{label}</span>
      <button
        type="button"
        aria-label={`${label} toggle`}
        onClick={() => onChange(!value)}
        className={cls(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          value ? 'bg-emerald-500' : 'bg-slate-500'
        )}
      >
        <span
          className={cls(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            value ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-200">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-200">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-14 cursor-pointer rounded border border-slate-600 bg-slate-800 p-1"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100"
        />
      </div>
    </label>
  );
}

function FileUploadField({
  label,
  onLoaded,
  accept,
}: {
  label: string;
  onLoaded: (dataUrl: string) => void;
  accept?: string;
}) {
  const [status, setStatus] = useState('');

  const handleFile = (file: File | null) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!result) {
        setStatus('Failed to load file.');
        return;
      }
      onLoaded(result);
      setStatus(`Loaded ${file.name}`);
    };
    reader.onerror = () => setStatus('Failed to load file.');
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-3">
      <p className="text-sm font-semibold text-slate-200">{label}</p>
      <label className="mt-2 inline-block cursor-pointer rounded-md border border-slate-500 bg-slate-700 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-600">
        Upload File
        <input
          type="file"
          accept={accept}
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>
      {status ? <p className="mt-2 text-xs text-emerald-300">{status}</p> : null}
    </div>
  );
}

function tabLabel(tab: AdminTab): string {
  switch (tab) {
    case 'dashboard':
      return 'Dashboard';
    case 'brand':
      return 'Brand';
    case 'media':
      return 'Media + Uploads';
    case 'theme':
      return 'Theme + Colors';
    case 'layout':
      return 'Layout + Typography';
    case 'content':
      return 'Content Blocks';
    case 'commerce':
      return 'Commerce';
    case 'marketing':
      return 'SEO + Social';
    case 'advanced':
      return 'Advanced';
    default:
      return tab;
  }
}

export default function AdminEditor() {
  const { content, setContent, resetContent } = useSiteContent();
  const [auth, setAuth] = useState<AdminAuth | null>(readAdminAuth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [setupUsername, setSetupUsername] = useState('');
  const [setupPassword, setSetupPassword] = useState('');
  const [setupConfirmPassword, setSetupConfirmPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [notice, setNotice] = useState('');
  const [jsonDraft, setJsonDraft] = useState(() => JSON.stringify(content, null, 2));
  const [newPassword, setNewPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const liveJson = useMemo(() => JSON.stringify(content, null, 2), [content]);

  const updateContent = (updater: (current: SiteContent) => SiteContent) => {
    const next = updater(content);
    setContent(next);
    setJsonDraft(JSON.stringify(next, null, 2));
  };

  const updateTheme = (key: keyof SiteContent['theme'], value: string) => {
    updateContent((curr) => ({ ...curr, theme: { ...curr.theme, [key]: value } }));
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!auth) {
      setLoginError('Create admin credentials before signing in.');
      return;
    }
    if (username === auth.username && password === auth.password) {
      setLoggedIn(true);
      setLoginError('');
      return;
    }
    setLoginError('Invalid login credentials.');
  };

  const handleCreateAdmin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!setupUsername.trim() || !setupPassword.trim()) {
      setLoginError('Username and password are required.');
      return;
    }
    if (setupPassword !== setupConfirmPassword) {
      setLoginError('Passwords do not match.');
      return;
    }

    const nextAuth = { username: setupUsername.trim(), password: setupPassword.trim() };
    saveAdminAuth(nextAuth);
    setAuth(nextAuth);
    setSetupPassword('');
    setSetupConfirmPassword('');
    setPassword('');
    setUsername(nextAuth.username);
    setLoginError('Admin credentials created. Sign in to continue.');
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginError('');
    setNotice('');
  };

  const applyJsonDraft = () => {
    try {
      const parsed = JSON.parse(jsonDraft) as SiteContent;
      setContent({ ...defaultSiteContent, ...parsed });
      setNotice('JSON imported successfully.');
    } catch {
      setNotice('Invalid JSON. Please fix formatting and try again.');
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(liveJson);
      setNotice('Current content copied.');
    } catch {
      setNotice('Clipboard copy failed.');
    }
  };

  const rotatePassword = () => {
    if (!newPassword.trim()) {
      setNotice('Enter a new password first.');
      return;
    }
    if (!auth) {
      setNotice('Create admin credentials first.');
      return;
    }
    const nextAuth = { username: auth.username, password: newPassword.trim() };
    saveAdminAuth(nextAuth);
    setAuth(nextAuth);
    setNewPassword('');
    setNotice('Password updated.');
  };

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-700 bg-slate-900/90 p-8 shadow-2xl">
          <h1 className="text-3xl font-bold">Admin Control Center</h1>
          <p className="mt-2 text-sm text-slate-300">Comprehensive website configuration console.</p>

          {!auth ? (
            <form className="mt-6 space-y-4" onSubmit={handleCreateAdmin}>
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
                First-time setup: create local admin credentials.
              </div>
              <TextField label="Admin Username" value={setupUsername} onChange={setSetupUsername} />
              <TextField label="Admin Password" value={setupPassword} onChange={setSetupPassword} />
              <TextField
                label="Confirm Password"
                value={setupConfirmPassword}
                onChange={setSetupConfirmPassword}
              />
              {loginError ? <p className="text-sm text-red-400">{loginError}</p> : null}
              <button
                type="submit"
                className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Create Credentials
              </button>
            </form>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
              <TextField label="Username" value={username} onChange={setUsername} />
              <TextField label="Password" value={password} onChange={setPassword} />
              {loginError ? <p className="text-sm text-red-400">{loginError}</p> : null}
              <button
                type="submit"
                className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Sign In
              </button>
            </form>
          )}
        </div>
      </main>
    );
  }

  const tabs: AdminTab[] = [
    'dashboard',
    'brand',
    'media',
    'theme',
    'layout',
    'content',
    'commerce',
    'marketing',
    'advanced',
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="mx-auto grid min-h-screen max-w-425 grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-slate-800 bg-slate-950/90 p-4 lg:border-b-0 lg:border-r">
          <h1 className="text-xl font-black tracking-tight">Admin Suite</h1>
          <p className="mt-1 text-xs text-slate-400">Kitchen-sink website operations panel</p>

          <nav className="mt-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cls(
                  'w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition',
                  activeTab === tab
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                )}
              >
                {tabLabel(tab)}
              </button>
            ))}
          </nav>

          <div className="mt-6 space-y-2">
            <a href="/" className="block rounded-lg bg-emerald-500 px-3 py-2 text-center text-sm font-bold text-slate-950">
              View Website
            </a>
            <button
              type="button"
              onClick={() => {
                resetContent();
                setJsonDraft(JSON.stringify(defaultSiteContent, null, 2));
                setNotice('Content reset to defaults.');
              }}
              className="w-full rounded-lg bg-amber-400 px-3 py-2 text-sm font-bold text-slate-950"
            >
              Reset Defaults
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white"
            >
              Sign Out
            </button>
          </div>
        </aside>

        <section className="p-4 md:p-6">
          <header className="mb-5 rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
            <h2 className="text-2xl font-extrabold">{tabLabel(activeTab)}</h2>
            <p className="text-sm text-slate-300">Live changes are persisted immediately in local storage.</p>
            {notice ? <p className="mt-2 text-sm text-cyan-300">{notice}</p> : null}
          </header>

          {activeTab === 'dashboard' ? (
            <div className="grid gap-4 md:grid-cols-3">
              <SectionCard title="Quick Stats">
                <p className="text-sm text-slate-300">Brand: {content.brandName}</p>
                <p className="text-sm text-slate-300">Primary domain: {content.domains.primary}</p>
                <p className="text-sm text-slate-300">Theme primary: {content.theme.primaryColor}</p>
              </SectionCard>
              <SectionCard title="Publishing Checklist">
                <ToggleField label="PayPal Enabled" value={content.payments.paypalEnabled} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, paypalEnabled: value } }))} />
                <ToggleField label="Google Pay Enabled" value={content.payments.googlePayEnabled} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, googlePayEnabled: value } }))} />
                <ToggleField label="Apple Pay Enabled" value={content.payments.applePayEnabled} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, applePayEnabled: value } }))} />
              </SectionCard>
              <SectionCard title="JSON Utilities">
                <button type="button" onClick={handleCopyJson} className="w-full rounded-lg bg-cyan-500 px-3 py-2 text-sm font-bold text-slate-950">Copy JSON</button>
                <button type="button" onClick={applyJsonDraft} className="w-full rounded-lg bg-slate-700 px-3 py-2 text-sm font-bold text-white">Apply JSON Draft</button>
              </SectionCard>
            </div>
          ) : null}

          {activeTab === 'brand' ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <SectionCard title="Brand + Domains">
                <TextField label="Brand Name" value={content.brandName} onChange={(value) => updateContent((curr) => ({ ...curr, brandName: value }))} />
                <TextField label="Shop CTA Label" value={content.navShopCta} onChange={(value) => updateContent((curr) => ({ ...curr, navShopCta: value }))} />
                <TextField label="Primary Domain" value={content.domains.primary} onChange={(value) => updateContent((curr) => ({ ...curr, domains: { ...curr.domains, primary: value } }))} />
                <TextField label="WWW Domain" value={content.domains.www} onChange={(value) => updateContent((curr) => ({ ...curr, domains: { ...curr.domains, www: value } }))} />
                <TextField label="Short Name" value={content.domains.short} onChange={(value) => updateContent((curr) => ({ ...curr, domains: { ...curr.domains, short: value } }))} />
              </SectionCard>

              <SectionCard title="Navigation Labels">
                <TextField label="Home" value={content.navigation.home} onChange={(value) => updateContent((curr) => ({ ...curr, navigation: { ...curr.navigation, home: value } }))} />
                <TextField label="Shop" value={content.navigation.shop} onChange={(value) => updateContent((curr) => ({ ...curr, navigation: { ...curr.navigation, shop: value } }))} />
                <TextField label="Video Clips" value={content.navigation.videoClips} onChange={(value) => updateContent((curr) => ({ ...curr, navigation: { ...curr.navigation, videoClips: value } }))} />
                <TextField label="Gallery" value={content.navigation.gallery} onChange={(value) => updateContent((curr) => ({ ...curr, navigation: { ...curr.navigation, gallery: value } }))} />
                <TextField label="Checkout" value={content.navigation.checkout} onChange={(value) => updateContent((curr) => ({ ...curr, navigation: { ...curr.navigation, checkout: value } }))} />
                <TextField label="About" value={content.navigation.about} onChange={(value) => updateContent((curr) => ({ ...curr, navigation: { ...curr.navigation, about: value } }))} />
                <TextField label="Contact" value={content.navigation.contact} onChange={(value) => updateContent((curr) => ({ ...curr, navigation: { ...curr.navigation, contact: value } }))} />
              </SectionCard>
            </div>
          ) : null}

          {activeTab === 'media' ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <SectionCard title="Media URLs">
                <TextField label="Founder Profile Image" value={content.media.founderProfileImage} onChange={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, founderProfileImage: value } }))} />
                <TextField label="Book Cover Image" value={content.media.bookCoverImage} onChange={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, bookCoverImage: value } }))} />
                <TextField label="Launch Cover Image" value={content.media.launchCoverImage} onChange={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, launchCoverImage: value } }))} />
                <TextField label="Launch Poster Image" value={content.media.launchPosterImage} onChange={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, launchPosterImage: value } }))} />
                <TextField label="Launch Primary Video" value={content.media.launchPrimaryVideo} onChange={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, launchPrimaryVideo: value } }))} />
                <TextField label="Launch Secondary Video" value={content.media.launchSecondaryVideo} onChange={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, launchSecondaryVideo: value } }))} />
              </SectionCard>

              <SectionCard title="Direct Uploads" description="Upload local files and store as base64 Data URLs.">
                <FileUploadField label="Upload Founder Image" accept="image/*" onLoaded={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, founderProfileImage: value } }))} />
                <FileUploadField label="Upload Book Cover" accept="image/*" onLoaded={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, bookCoverImage: value } }))} />
                <FileUploadField label="Upload Launch Cover" accept="image/*" onLoaded={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, launchCoverImage: value } }))} />
                <FileUploadField label="Upload Launch Poster" accept="image/*" onLoaded={(value) => updateContent((curr) => ({ ...curr, media: { ...curr.media, launchPosterImage: value } }))} />
              </SectionCard>
            </div>
          ) : null}

          {activeTab === 'theme' ? (
            <div className="grid gap-4 lg:grid-cols-3">
              <SectionCard title="Palette Presets" description="Apply one-click creative direction.">
                {palettePresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => updateContent((curr) => ({ ...curr, theme: { ...curr.theme, ...preset.values } }))}
                    className="mb-2 w-full rounded-lg bg-slate-700 px-3 py-2 text-sm font-bold text-white hover:bg-slate-600"
                  >
                    {preset.name}
                  </button>
                ))}
              </SectionCard>

              <SectionCard title="Brand Colors">
                <ColorField label="Primary" value={content.theme.primaryColor} onChange={(value) => updateTheme('primaryColor', value)} />
                <ColorField label="Secondary" value={content.theme.secondaryColor} onChange={(value) => updateTheme('secondaryColor', value)} />
                <ColorField label="Accent" value={content.theme.accentColor} onChange={(value) => updateTheme('accentColor', value)} />
                <ColorField label="Background" value={content.theme.backgroundColor} onChange={(value) => updateTheme('backgroundColor', value)} />
                <ColorField label="Text" value={content.theme.textColor} onChange={(value) => updateTheme('textColor', value)} />
              </SectionCard>

              <SectionCard title="UI Colors">
                <ColorField label="Heading" value={content.theme.headingColor} onChange={(value) => updateTheme('headingColor', value)} />
                <ColorField label="CTA Background" value={content.theme.ctaBackgroundColor} onChange={(value) => updateTheme('ctaBackgroundColor', value)} />
                <ColorField label="CTA Text" value={content.theme.ctaTextColor} onChange={(value) => updateTheme('ctaTextColor', value)} />
                <ColorField label="Nav Background" value={content.theme.navBackgroundColor} onChange={(value) => updateTheme('navBackgroundColor', value)} />
                <ColorField label="Footer Background" value={content.theme.footerBackgroundColor} onChange={(value) => updateTheme('footerBackgroundColor', value)} />
              </SectionCard>
            </div>
          ) : null}

          {activeTab === 'layout' ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <SectionCard title="Layout Controls">
                <SelectField label="Hero Alignment" value={content.layout.heroAlignment} onChange={(value) => updateContent((curr) => ({ ...curr, layout: { ...curr.layout, heroAlignment: value as SiteContent['layout']['heroAlignment'] } }))} options={['left', 'center', 'right']} />
                <SelectField label="Hero Spacing" value={content.layout.heroSpacing} onChange={(value) => updateContent((curr) => ({ ...curr, layout: { ...curr.layout, heroSpacing: value as SiteContent['layout']['heroSpacing'] } }))} options={['compact', 'normal', 'spacious']} />
                <SelectField label="CTA Style" value={content.layout.ctaStyle} onChange={(value) => updateContent((curr) => ({ ...curr, layout: { ...curr.layout, ctaStyle: value as SiteContent['layout']['ctaStyle'] } }))} options={['solid', 'outline', 'ghost']} />
                <SelectField label="Container Width" value={content.layout.containerWidth} onChange={(value) => updateContent((curr) => ({ ...curr, layout: { ...curr.layout, containerWidth: value as SiteContent['layout']['containerWidth'] } }))} options={['narrow', 'normal', 'wide']} />
                <SelectField label="Border Radius" value={content.layout.borderRadius} onChange={(value) => updateContent((curr) => ({ ...curr, layout: { ...curr.layout, borderRadius: value as SiteContent['layout']['borderRadius'] } }))} options={['sharp', 'rounded', 'pill']} />
              </SectionCard>

              <SectionCard title="Typography Controls">
                <TextField label="Heading Font" value={content.typography.headingFont} onChange={(value) => updateContent((curr) => ({ ...curr, typography: { ...curr.typography, headingFont: value } }))} />
                <TextField label="Body Font" value={content.typography.bodyFont} onChange={(value) => updateContent((curr) => ({ ...curr, typography: { ...curr.typography, bodyFont: value } }))} />
                <TextField label="Heading Weight" value={content.typography.headingWeight} onChange={(value) => updateContent((curr) => ({ ...curr, typography: { ...curr.typography, headingWeight: value } }))} />
                <SelectField label="Base Size" value={content.typography.baseSize} onChange={(value) => updateContent((curr) => ({ ...curr, typography: { ...curr.typography, baseSize: value as SiteContent['typography']['baseSize'] } }))} options={['sm', 'md', 'lg']} />
              </SectionCard>
            </div>
          ) : null}

          {activeTab === 'content' ? (
            <div className="space-y-4">
              <SectionCard title="Hero Content">
                <div className="grid gap-3 md:grid-cols-2">
                  <TextField label="Line 1" value={content.hero.line1} onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, line1: value } }))} />
                  <TextField label="Line 2" value={content.hero.line2} onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, line2: value } }))} />
                  <TextField label="Highlight" value={content.hero.highlight} onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, highlight: value } }))} />
                  <TextAreaField label="Subtitle" value={content.hero.subtitle} onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, subtitle: value } }))} />
                  <TextField label="Primary CTA" value={content.hero.primaryCta} onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, primaryCta: value } }))} />
                  <TextField label="Secondary CTA" value={content.hero.secondaryCta} onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, secondaryCta: value } }))} />
                </div>
              </SectionCard>

              <SectionCard title="Founder + Launch + Contact + Footer" description="Top-level narrative and messaging controls.">
                <TextField label="Founder Name" value={content.founder.name} onChange={(value) => updateContent((curr) => ({ ...curr, founder: { ...curr.founder, name: value } }))} />
                <TextField label="Founder Role" value={content.founder.role} onChange={(value) => updateContent((curr) => ({ ...curr, founder: { ...curr.founder, role: value } }))} />
                <TextAreaField label="Founder Quote" value={content.founder.quote} onChange={(value) => updateContent((curr) => ({ ...curr, founder: { ...curr.founder, quote: value } }))} />
                <TextField label="Launch Badge" value={content.launch.badge} onChange={(value) => updateContent((curr) => ({ ...curr, launch: { ...curr.launch, badge: value } }))} />
                <TextField label="Contact Heading" value={content.contact.heading} onChange={(value) => updateContent((curr) => ({ ...curr, contact: { ...curr.contact, heading: value } }))} />
                <TextAreaField label="Footer Legal Note" value={content.footer.legalNote} onChange={(value) => updateContent((curr) => ({ ...curr, footer: { ...curr.footer, legalNote: value } }))} />
              </SectionCard>
            </div>
          ) : null}

          {activeTab === 'commerce' ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <SectionCard title="Payment Methods">
                <ToggleField label="PayPal" value={content.payments.paypalEnabled} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, paypalEnabled: value } }))} />
                <TextField label="PayPal URL" value={content.payments.paypalCheckoutUrl} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, paypalCheckoutUrl: value } }))} />
                <ToggleField label="Google Pay" value={content.payments.googlePayEnabled} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, googlePayEnabled: value } }))} />
                <TextField label="Google Pay URL" value={content.payments.googlePayCheckoutUrl} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, googlePayCheckoutUrl: value } }))} />
                <ToggleField label="Apple Pay" value={content.payments.applePayEnabled} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, applePayEnabled: value } }))} />
                <TextField label="Apple Pay URL" value={content.payments.applePayCheckoutUrl} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, applePayCheckoutUrl: value } }))} />
                <ToggleField label="Zelle" value={content.payments.zelleEnabled} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, zelleEnabled: value } }))} />
                <TextField label="Zelle Handle" value={content.payments.zelleHandle} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, zelleHandle: value } }))} />
                <ToggleField label="Cash App" value={content.payments.cashAppEnabled} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, cashAppEnabled: value } }))} />
                <TextField label="Cash App Tag" value={content.payments.cashAppTag} onChange={(value) => updateContent((curr) => ({ ...curr, payments: { ...curr.payments, cashAppTag: value } }))} />
              </SectionCard>

              <SectionCard title="Shop + Launch Controls">
                <TextField label="Shop Section Title" value={content.shop.sectionTitle} onChange={(value) => updateContent((curr) => ({ ...curr, shop: { ...curr.shop, sectionTitle: value } }))} />
                <TextField label="Featured Title" value={content.shop.featuredTitle} onChange={(value) => updateContent((curr) => ({ ...curr, shop: { ...curr.shop, featuredTitle: value } }))} />
                <TextField label="All Products Title" value={content.shop.allTitle} onChange={(value) => updateContent((curr) => ({ ...curr, shop: { ...curr.shop, allTitle: value } }))} />
                <TextField label="Book Launch Title" value={content.bookLaunch.title} onChange={(value) => updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, title: value } }))} />
                <TextField label="Pre-Order Status" value={content.bookLaunch.preOrderStatus} onChange={(value) => updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, preOrderStatus: value } }))} />
                <TextField label="Media Kit Status" value={content.bookLaunch.mediaKitStatus} onChange={(value) => updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, mediaKitStatus: value } }))} />
              </SectionCard>
            </div>
          ) : null}

          {activeTab === 'marketing' ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <SectionCard title="SEO">
                <TextField label="Page Title" value={content.seo.pageTitle} onChange={(value) => updateContent((curr) => ({ ...curr, seo: { ...curr.seo, pageTitle: value } }))} />
                <TextAreaField label="Meta Description" value={content.seo.metaDescription} onChange={(value) => updateContent((curr) => ({ ...curr, seo: { ...curr.seo, metaDescription: value } }))} />
                <TextField label="OG Image" value={content.seo.ogImage} onChange={(value) => updateContent((curr) => ({ ...curr, seo: { ...curr.seo, ogImage: value } }))} />
                <TextField label="Site Name" value={content.seo.siteName} onChange={(value) => updateContent((curr) => ({ ...curr, seo: { ...curr.seo, siteName: value } }))} />
                <TextField label="Twitter Handle" value={content.seo.twitterHandle} onChange={(value) => updateContent((curr) => ({ ...curr, seo: { ...curr.seo, twitterHandle: value } }))} />
                <TextAreaField label="Keywords" value={content.seo.keywords} onChange={(value) => updateContent((curr) => ({ ...curr, seo: { ...curr.seo, keywords: value } }))} rows={2} />
              </SectionCard>

              <SectionCard title="Social + Analytics">
                <TextField label="Instagram" value={content.social.instagram} onChange={(value) => updateContent((curr) => ({ ...curr, social: { ...curr.social, instagram: value } }))} />
                <TextField label="Twitter" value={content.social.twitter} onChange={(value) => updateContent((curr) => ({ ...curr, social: { ...curr.social, twitter: value } }))} />
                <TextField label="Facebook" value={content.social.facebook} onChange={(value) => updateContent((curr) => ({ ...curr, social: { ...curr.social, facebook: value } }))} />
                <TextField label="YouTube" value={content.social.youtube} onChange={(value) => updateContent((curr) => ({ ...curr, social: { ...curr.social, youtube: value } }))} />
                <TextField label="TikTok" value={content.social.tiktok} onChange={(value) => updateContent((curr) => ({ ...curr, social: { ...curr.social, tiktok: value } }))} />
                <TextField label="LinkedIn" value={content.social.linkedin} onChange={(value) => updateContent((curr) => ({ ...curr, social: { ...curr.social, linkedin: value } }))} />
                <TextField label="Google Analytics ID" value={content.analytics.googleAnalyticsId} onChange={(value) => updateContent((curr) => ({ ...curr, analytics: { ...curr.analytics, googleAnalyticsId: value } }))} />
                <TextField label="Meta Pixel ID" value={content.analytics.metaPixelId} onChange={(value) => updateContent((curr) => ({ ...curr, analytics: { ...curr.analytics, metaPixelId: value } }))} />
                <TextField label="Google Tag Manager ID" value={content.analytics.googleTagManagerId} onChange={(value) => updateContent((curr) => ({ ...curr, analytics: { ...curr.analytics, googleTagManagerId: value } }))} />
              </SectionCard>
            </div>
          ) : null}

          {activeTab === 'advanced' ? (
            <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
              <SectionCard title="Admin Security">
                <TextField label="New Password" value={newPassword} onChange={setNewPassword} />
                <button
                  type="button"
                  onClick={rotatePassword}
                  className="w-full rounded-lg bg-cyan-500 px-3 py-2 text-sm font-bold text-slate-950"
                >
                  Update Password
                </button>
                <p className="text-xs text-slate-400">Credentials are saved in this browser local storage.</p>
              </SectionCard>

              <SectionCard title="Raw JSON Editor" description="Full configuration import/export and direct manipulation.">
                <textarea
                  aria-label="Raw site content JSON editor"
                  placeholder="Paste or edit full JSON configuration here"
                  value={jsonDraft}
                  onChange={(event) => setJsonDraft(event.target.value)}
                  className="h-105 w-full rounded-lg border border-slate-600 bg-slate-800 p-3 font-mono text-xs text-slate-100"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={applyJsonDraft}
                    className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950"
                  >
                    Apply JSON
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-bold text-white"
                  >
                    Copy Live JSON
                  </button>
                </div>
              </SectionCard>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
