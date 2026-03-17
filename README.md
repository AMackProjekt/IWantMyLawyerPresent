<img width="2157" height="1078" alt="Screenshot 2026-03-17 124551" src="https://github.com/user-attachments/assets/cc78bcb2-75e2-4eaf-82e4-2351fd62acda" />


# I Want My Lawyer Present - Merchandise Storefront

Simple, content-driven storefront built with React, TypeScript, Vite, and Tailwind.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Framer Motion + Lucide icons
- Azure Static Web Apps + Azure Functions (`api/`)

## Quick Start

```bash
npm install
npm run dev
```

Default local URL: `http://localhost:5173` (or next available port).

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run lint     # Run ESLint
npm run build    # Type-check + production build
npm run preview  # Preview production build
```

## Repo Layout

```text
src/             # Main frontend app code
components/      # Shared React components
public/          # Static assets
api/             # Azure Functions backend
```

## Release Checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Card checkout is disabled unless hosted processor URL is configured
- [ ] Admin sign-in/sign-out and password rotation tested
- [ ] Checkout + footer disclaimers match real payment data handling
- [ ] Apex and `www` domains resolve correctly with valid HTTPS

## License

MIT (see `LICENSE`)
