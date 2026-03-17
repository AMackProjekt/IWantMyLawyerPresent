import { useMemo, useState } from 'react';
import { defaultSiteContent, type SiteContent } from '../content/siteContent';
import { useSiteContent } from '../context/SiteContentContext';

const AUTH_STORAGE_KEY = 'iwmlp.adminAuth.v1';

type AdminAuth = {
  username: string;
  password: string;
};

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

function TextField({
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
      <span className="mb-1 block text-sm font-semibold text-gray-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-gray-700">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
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
    <label className="flex cursor-pointer items-center gap-3">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-slate-900' : 'bg-gray-300'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
      <span className="text-xs text-gray-500">{value ? 'Enabled' : 'Disabled'}</span>
    </label>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold text-slate-900">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
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
  const [authNotice, setAuthNotice] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [jsonDraft, setJsonDraft] = useState(() => JSON.stringify(content, null, 2));

  const liveJson = useMemo(() => JSON.stringify(content, null, 2), [content]);

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
    setLoginError('Invalid login. Please use the handoff credentials.');
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
    setAuthNotice('');
  };

  const updateContent = (updater: (current: SiteContent) => SiteContent) => {
    const next = updater(content);
    setContent(next);
    setJsonDraft(JSON.stringify(next, null, 2));
  };

  const applyJsonDraft = () => {
    try {
      const parsed = JSON.parse(jsonDraft) as SiteContent;
      setContent({ ...defaultSiteContent, ...parsed });
      setAuthNotice('JSON imported successfully.');
    } catch {
      setAuthNotice('Invalid JSON. Please fix formatting and try again.');
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(liveJson);
      setAuthNotice('Current content copied to clipboard.');
    } catch {
      setAuthNotice('Clipboard copy failed. You can still copy manually from the box.');
    }
  };

  const rotatePassword = () => {
    if (!newPassword.trim()) {
      setAuthNotice('Enter a new password before updating login credentials.');
      return;
    }
    if (!auth) {
      setAuthNotice('Create admin credentials first.');
      return;
    }
    const nextAuth = { username: auth.username, password: newPassword.trim() };
    saveAdminAuth(nextAuth);
    setAuth(nextAuth);
    setAuthNotice('Password updated and saved locally for this site.');
    setNewPassword('');
  };

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-slate-900">Admin Editor</h1>
          <p className="mt-2 text-sm text-slate-600">Website handoff console for content edits and updates.</p>

          {!auth ? (
            <form className="mt-6 space-y-4" onSubmit={handleCreateAdmin}>
              <div className="rounded-lg border border-blue-300 bg-blue-50 p-4 text-sm text-blue-900">
                <p className="font-semibold">First-Time Setup</p>
                <p>Create admin credentials for this browser. No default password is shipped in code.</p>
              </div>
              <TextField label="Admin Username" value={setupUsername} onChange={setSetupUsername} />
              <TextField label="Admin Password" value={setupPassword} onChange={setSetupPassword} />
              <TextField
                label="Confirm Password"
                value={setupConfirmPassword}
                onChange={setSetupConfirmPassword}
              />
              {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Create Admin Credentials
              </button>
            </form>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
              <TextField label="Username" value={username} onChange={setUsername} />
              <TextField label="Password" value={password} onChange={setPassword} />
              {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Sign In
              </button>
            </form>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Header */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold text-slate-900">Admin Editor</h1>
          <p className="mt-2 text-sm text-slate-600">
            Edit website content and save instantly. Changes persist in local storage and update live on the site.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              View Website
            </a>
            <button
              type="button"
              onClick={() => {
                resetContent();
                setJsonDraft(JSON.stringify(defaultSiteContent, null, 2));
                setAuthNotice('Content reset to defaults.');
              }}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Reset Defaults
            </button>
            <button
              type="button"
              onClick={handleCopyJson}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Copy JSON
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              Sign Out
            </button>
          </div>
          {authNotice ? <p className="mt-3 text-sm text-blue-700">{authNotice}</p> : null}
        </div>

        {/* Row 1: Branding + Domains */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Branding">
            <TextField
              label="Brand Name"
              value={content.brandName}
              onChange={(value) => updateContent((curr) => ({ ...curr, brandName: value }))}
            />
            <TextField
              label="Navigation Shop Button"
              value={content.navShopCta}
              onChange={(value) => updateContent((curr) => ({ ...curr, navShopCta: value }))}
            />
          </SectionCard>

          <SectionCard title="Domains">
            <TextField
              label="Primary Domain (https://...)"
              value={content.domains.primary}
              onChange={(value) => updateContent((curr) => ({ ...curr, domains: { ...curr.domains, primary: value } }))}
            />
            <TextField
              label="WWW Domain (https://www....)"
              value={content.domains.www}
              onChange={(value) => updateContent((curr) => ({ ...curr, domains: { ...curr.domains, www: value } }))}
            />
            <TextField
              label="Short Name (no protocol)"
              value={content.domains.short}
              onChange={(value) => updateContent((curr) => ({ ...curr, domains: { ...curr.domains, short: value } }))}
            />
          </SectionCard>
        </div>

        {/* Row 2: Navigation */}
        <SectionCard title="Navigation Labels">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ['Home', 'home'],
                ['Shop', 'shop'],
                ['Video Clips', 'videoClips'],
                ['Gallery', 'gallery'],
                ['Checkout', 'checkout'],
                ['About', 'about'],
                ['Contact', 'contact'],
              ] as [string, keyof typeof content.navigation][]
            ).map(([label, key]) => (
              <TextField
                key={key}
                label={label}
                value={content.navigation[key]}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, navigation: { ...curr.navigation, [key]: value } }))
                }
              />
            ))}
          </div>
        </SectionCard>

        {/* Row 3: Hero */}
        <SectionCard title="Hero Section">
          <div className="grid gap-3 lg:grid-cols-2">
            <TextField
              label="Line 1"
              value={content.hero.line1}
              onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, line1: value } }))}
            />
            <TextField
              label="Line 2"
              value={content.hero.line2}
              onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, line2: value } }))}
            />
            <TextField
              label="Highlight Text"
              value={content.hero.highlight}
              onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, highlight: value } }))}
            />
            <TextAreaField
              label="Subtitle"
              value={content.hero.subtitle}
              onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, subtitle: value } }))}
            />
            <TextField
              label="Primary CTA Button"
              value={content.hero.primaryCta}
              onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, primaryCta: value } }))}
            />
            <TextField
              label="Secondary CTA Button"
              value={content.hero.secondaryCta}
              onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, secondaryCta: value } }))}
            />
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            <div className="space-y-2">
              <TextField
                label="Stat 1 Number"
                value={content.hero.stat1Number}
                onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, stat1Number: value } }))}
              />
              <TextField
                label="Stat 1 Label"
                value={content.hero.stat1Label}
                onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, stat1Label: value } }))}
              />
            </div>
            <div className="space-y-2">
              <TextField
                label="Stat 2 Number"
                value={content.hero.stat2Number}
                onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, stat2Number: value } }))}
              />
              <TextField
                label="Stat 2 Label"
                value={content.hero.stat2Label}
                onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, stat2Label: value } }))}
              />
            </div>
            <div className="space-y-2">
              <TextField
                label="Stat 3 Number"
                value={content.hero.stat3Number}
                onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, stat3Number: value } }))}
              />
              <TextField
                label="Stat 3 Label"
                value={content.hero.stat3Label}
                onChange={(value) => updateContent((curr) => ({ ...curr, hero: { ...curr.hero, stat3Label: value } }))}
              />
            </div>
          </div>
        </SectionCard>

        {/* Row 4: Launch + Shop */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Launch Section">
            <TextField
              label="Badge"
              value={content.launch.badge}
              onChange={(value) => updateContent((curr) => ({ ...curr, launch: { ...curr.launch, badge: value } }))}
            />
            <TextField
              label="Title Line 1"
              value={content.launch.titleLine1}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, launch: { ...curr.launch, titleLine1: value } }))
              }
            />
            <TextField
              label="Title Line 2"
              value={content.launch.titleLine2}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, launch: { ...curr.launch, titleLine2: value } }))
              }
            />
            <TextField
              label="Primary CTA Button"
              value={content.launch.primaryCta}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, launch: { ...curr.launch, primaryCta: value } }))
              }
            />
            <TextField
              label="Secondary CTA Button"
              value={content.launch.secondaryCta}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, launch: { ...curr.launch, secondaryCta: value } }))
              }
            />
            <TextField
              label="Video Title"
              value={content.launch.videoTitle}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, launch: { ...curr.launch, videoTitle: value } }))
              }
            />
            <TextField
              label="Video Tag"
              value={content.launch.videoTag}
              onChange={(value) => updateContent((curr) => ({ ...curr, launch: { ...curr.launch, videoTag: value } }))}
            />
          </SectionCard>

          <SectionCard title="Shop Section">
            <TextField
              label="Section Title"
              value={content.shop.sectionTitle}
              onChange={(value) => updateContent((curr) => ({ ...curr, shop: { ...curr.shop, sectionTitle: value } }))}
            />
            <TextField
              label="Featured Products Title"
              value={content.shop.featuredTitle}
              onChange={(value) => updateContent((curr) => ({ ...curr, shop: { ...curr.shop, featuredTitle: value } }))}
            />
            <TextField
              label="All Products Title"
              value={content.shop.allTitle}
              onChange={(value) => updateContent((curr) => ({ ...curr, shop: { ...curr.shop, allTitle: value } }))}
            />
          </SectionCard>
        </div>

        {/* Row 5: Founder */}
        <SectionCard title="Founder Bio">
          <div className="grid gap-3 lg:grid-cols-2">
            <TextField
              label="Name"
              value={content.founder.name}
              onChange={(value) => updateContent((curr) => ({ ...curr, founder: { ...curr.founder, name: value } }))}
            />
            <TextField
              label="Role / Title"
              value={content.founder.role}
              onChange={(value) => updateContent((curr) => ({ ...curr, founder: { ...curr.founder, role: value } }))}
            />
            <TextField
              label="Story Label"
              value={content.founder.storyLabel}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, founder: { ...curr.founder, storyLabel: value } }))
              }
            />
            <TextField
              label="Headline"
              value={content.founder.headline}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, founder: { ...curr.founder, headline: value } }))
              }
            />
          </div>
          <TextAreaField
            label="Paragraph 1"
            value={content.founder.paragraph1}
            onChange={(value) =>
              updateContent((curr) => ({ ...curr, founder: { ...curr.founder, paragraph1: value } }))
            }
          />
          <TextAreaField
            label="Paragraph 2"
            value={content.founder.paragraph2}
            onChange={(value) =>
              updateContent((curr) => ({ ...curr, founder: { ...curr.founder, paragraph2: value } }))
            }
          />
          <TextAreaField
            label="Paragraph 3"
            value={content.founder.paragraph3}
            onChange={(value) =>
              updateContent((curr) => ({ ...curr, founder: { ...curr.founder, paragraph3: value } }))
            }
          />
          <TextAreaField
            label="Pull Quote"
            value={content.founder.quote}
            onChange={(value) => updateContent((curr) => ({ ...curr, founder: { ...curr.founder, quote: value } }))}
          />
        </SectionCard>

        {/* Row 6: Book Launch */}
        <SectionCard title="Book Launch">
          <div className="grid gap-3 lg:grid-cols-2">
            <TextField
              label="Namespace / Acronym"
              value={content.bookLaunch.namespace}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, namespace: value } }))
              }
            />
            <TextField
              label="Title"
              value={content.bookLaunch.title}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, title: value } }))
              }
            />
            <TextField
              label="Launch Date"
              value={content.bookLaunch.launchDate}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, launchDate: value } }))
              }
            />
            <TextField
              label="Pre-Order Status"
              value={content.bookLaunch.preOrderStatus}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, preOrderStatus: value } }))
              }
            />
            <TextField
              label="Media Kit Status"
              value={content.bookLaunch.mediaKitStatus}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, mediaKitStatus: value } }))
              }
            />
            <TextField
              label="Pre-Order Button Label"
              value={content.bookLaunch.preOrderButton}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, preOrderButton: value } }))
              }
            />
            <TextField
              label="Media Kit Button Label"
              value={content.bookLaunch.mediaKitButton}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, mediaKitButton: value } }))
              }
            />
          </div>
          <TextAreaField
            label="Description"
            value={content.bookLaunch.description}
            onChange={(value) =>
              updateContent((curr) => ({ ...curr, bookLaunch: { ...curr.bookLaunch, description: value } }))
            }
          />
        </SectionCard>

        {/* Row 7: Contact Section */}
        <SectionCard title="Contact Section">
          <div className="grid gap-3 lg:grid-cols-2">
            <TextField
              label="Heading"
              value={content.contact.heading}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, contact: { ...curr.contact, heading: value } }))
              }
            />
            <TextAreaField
              label="Subheading"
              value={content.contact.subheading}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, contact: { ...curr.contact, subheading: value } }))
              }
            />
            <TextField
              label="Form Title"
              value={content.contact.formTitle}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, contact: { ...curr.contact, formTitle: value } }))
              }
            />
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {(
              [
                ['Card 1 Title', 'card1Title'],
                ['Card 1 Description', 'card1Description'],
                ['Card 2 Title', 'card2Title'],
                ['Card 2 Description', 'card2Description'],
                ['Card 3 Title', 'card3Title'],
                ['Card 3 Description', 'card3Description'],
                ['Card 4 Title', 'card4Title'],
                ['Card 4 Description', 'card4Description'],
              ] as [string, keyof typeof content.contact][]
            ).map(([label, key]) => (
              <TextField
                key={key}
                label={label}
                value={content.contact[key] as string}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, contact: { ...curr.contact, [key]: value } }))
                }
              />
            ))}
          </div>
        </SectionCard>

        {/* Row 8: Footer */}
        <SectionCard title="Footer">
          <TextField
            label="Brand Title"
            value={content.footer.brandTitle}
            onChange={(value) => updateContent((curr) => ({ ...curr, footer: { ...curr.footer, brandTitle: value } }))}
          />
          <TextAreaField
            label="Brand Description"
            value={content.footer.brandDescription}
            onChange={(value) =>
              updateContent((curr) => ({ ...curr, footer: { ...curr.footer, brandDescription: value } }))
            }
          />
          <TextAreaField
            label="Legal / Copyright Note"
            value={content.footer.legalNote}
            onChange={(value) => updateContent((curr) => ({ ...curr, footer: { ...curr.footer, legalNote: value } }))}
          />
        </SectionCard>

        {/* Row 9: Media Paths */}
        <SectionCard title="Media Paths (Images + Videos)">
          <p className="text-xs text-slate-500">
            These are file paths or URLs for images and video assets. Use paths relative to /public (e.g.
            /images/file.jpg) or full external URLs.
          </p>
          <div className="grid gap-3 lg:grid-cols-2">
            <TextField
              label="Founder Profile Image"
              value={content.media.founderProfileImage}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, media: { ...curr.media, founderProfileImage: value } }))
              }
            />
            <TextField
              label="Book Cover Image"
              value={content.media.bookCoverImage}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, media: { ...curr.media, bookCoverImage: value } }))
              }
            />
            <TextField
              label="Launch Cover Image"
              value={content.media.launchCoverImage}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, media: { ...curr.media, launchCoverImage: value } }))
              }
            />
            <TextField
              label="Launch Poster Image"
              value={content.media.launchPosterImage}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, media: { ...curr.media, launchPosterImage: value } }))
              }
            />
            <TextField
              label="Launch Primary Video"
              value={content.media.launchPrimaryVideo}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, media: { ...curr.media, launchPrimaryVideo: value } }))
              }
            />
            <TextField
              label="Launch Secondary Video"
              value={content.media.launchSecondaryVideo}
              onChange={(value) =>
                updateContent((curr) => ({ ...curr, media: { ...curr.media, launchSecondaryVideo: value } }))
              }
            />
          </div>
        </SectionCard>

        {/* Row 10: Payments */}
        <SectionCard title="Payment Methods">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3 rounded-xl border border-slate-200 p-4">
              <ToggleField
                label="PayPal"
                value={content.payments.paypalEnabled}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, paypalEnabled: value } }))
                }
              />
              <TextField
                label="PayPal Checkout URL"
                value={content.payments.paypalCheckoutUrl}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, paypalCheckoutUrl: value } }))
                }
              />
            </div>
            <div className="space-y-3 rounded-xl border border-slate-200 p-4">
              <ToggleField
                label="Google Pay"
                value={content.payments.googlePayEnabled}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, googlePayEnabled: value } }))
                }
              />
              <TextField
                label="Google Pay Checkout URL"
                value={content.payments.googlePayCheckoutUrl}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, googlePayCheckoutUrl: value } }))
                }
              />
            </div>
            <div className="space-y-3 rounded-xl border border-slate-200 p-4">
              <ToggleField
                label="Apple Pay"
                value={content.payments.applePayEnabled}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, applePayEnabled: value } }))
                }
              />
              <TextField
                label="Apple Pay Checkout URL"
                value={content.payments.applePayCheckoutUrl}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, applePayCheckoutUrl: value } }))
                }
              />
            </div>
            <div className="space-y-3 rounded-xl border border-slate-200 p-4">
              <ToggleField
                label="Zelle"
                value={content.payments.zelleEnabled}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, zelleEnabled: value } }))
                }
              />
              <TextField
                label="Zelle Handle / Email"
                value={content.payments.zelleHandle}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, zelleHandle: value } }))
                }
              />
            </div>
            <div className="space-y-3 rounded-xl border border-slate-200 p-4">
              <ToggleField
                label="Cash App"
                value={content.payments.cashAppEnabled}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, cashAppEnabled: value } }))
                }
              />
              <TextField
                label="Cash App $Tag"
                value={content.payments.cashAppTag}
                onChange={(value) =>
                  updateContent((curr) => ({ ...curr, payments: { ...curr.payments, cashAppTag: value } }))
                }
              />
            </div>
          </div>
        </SectionCard>

        {/* Row 11: Admin Security + JSON */}
        <section className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Admin Security + Full JSON</h2>
          <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <div className="space-y-3">
              <p className="text-sm text-slate-600">Update admin password for future handoff logins.</p>
              <TextField label="New Password" value={newPassword} onChange={setNewPassword} />
              <button
                type="button"
                onClick={rotatePassword}
                className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Update Password
              </button>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Advanced JSON Editor</p>
              <textarea
                value={jsonDraft}
                onChange={(event) => setJsonDraft(event.target.value)}
                className="h-72 w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-xs"
              />
              <button
                type="button"
                onClick={applyJsonDraft}
                className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Apply JSON Changes
              </button>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
