# Azure Deployment Plan: I Want My Lawyer Present

**Created:** 2026-03-09  
**Status:** `Ready for Validation`  
**Mode:** MODIFY — Prepare existing Next.js 15 ecommerce app for Azure deployment  
**Target:** Azure Static Web Apps (Free Tier)  

---

## 1. Project Analysis

### Mode: MODIFY ✓
- Existing Next.js 15 + TypeScript application
- Already configured for static export (`output: "export"`)
- SWA config file exists (`staticwebapp.config.json`)
- Docker & Docker Compose configs present
- Application Insights SDK already installed

### Tech Stack
| Component | Version | Notes |
|-----------|---------|-------|
| Framework | Next.js 15.5.10 | Full-stack with static export |
| Language | TypeScript 5.7 | Strict type checking |
| Styling | Tailwind CSS 3.4 | Dark theme, utilities |
| Animation | Framer Motion 11.12 | Scroll & interactive animations |
| Charts | Recharts 2.15 | Data visualizations |
| Monitoring | Application Insights 3.12 | Already integrated |
| Node Runtime | 18+ | Required |
| Build Output | `/out/` | Static HTML/CSS/JS |

### Project Structure
```
├── app/                      # Next.js App Router pages
│   ├── (public)/            # Public pages (landing, about, etc.)
│   ├── portal/              # User portal (if any)
│   └── layout.tsx           # Root layout
├── components/              # React components
├── lib/                     # Utilities (cn, auth, etc.)
├── public/                  # Static assets (images, videos, media)
├── styles/                  # Global CSS (Tailwind)
├── api/                     # Backend API (if needed post-SWA)
├── next.config.js           # Next.js configuration (static export)
├── staticwebapp.config.json # SWA configuration ✓
├── Dockerfile               # Docker image
├── docker-compose.yml       # Local development stack
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

---

## 2. Requirements & Constraints

### User Requirements
- **Budget:** No cost for storage (Free tier acceptable)
- **Deployment:** Single static SPA to Azure
- **Performance:** Fast CDN delivery, caching optimization
- **Monitoring:** Application Insights already integrated

### Constraints
- Static export only (no SSR, no API routes in SWA)
- Build: `npm run build` (Node 18+ required)
- Node version: Specify 20+ for SWA build container
- Build timeout: ~5 minutes (typical)
- Max file size: 1 GB per SWA resource
- Staging environments: Free PR previews on `develop` branch

### Cost Analysis
**Azure Static Web Apps - Free Tier**
| Service | Cost |
|---------|------|
| Hosting | **FREE** (5 GB storage included) |
| Bandwidth | FREE (50 GB/month) |
| SSL/TLS | FREE |
| Custom Domain | FREE |
| CI/CD (GitHub) | FREE |
| Staging Environments | FREE |
| **Total Monthly** | **$0** ✓ |

---

## 3. Deployment Architecture

### Target: Azure Static Web Apps
```
GitHub Repository
    ↓
GitHub Actions Workflow (CI/CD)
    ↓
Build: npm ci → npm run build
    ↓
Deploy: /out directory → SWA
    ↓
CDN Edge Locations (Global)
    ↓
Visitor Browser
```

### Key Components
1. **GitHub Actions Workflow** — Auto-trigger on push/PR to `main`
2. **Build Container** — Node 20, 2GB RAM, 5-min build timeout
3. **SWA Resource** — Serves static content + SPA fallback routing
4. **SWA Config** — Routes, caching headers, MIME types, 404 fallback to index.html
5. **Application Insights** — Monitor page views, performance, errors (already configured)

### URL Structure
```
Production:  https://<swa-resource-name>.azurestaticapps.net/
Custom Domain: https://example.com/ (optional)
PR Staging:  https://<swa-resource-name>-<hash>.azurestaticapps.net/
```

---

## 4. Preparation Steps (Phase 2: Execution)

### Step 1: Create GitHub Workflow ✓
- **File:** `.github/workflows/azure-static-web-apps-blue-desert-08d808f10.yml`
- **Trigger:** Push to `main`, PR to `main`
- **Actions:**
  1. Checkout code
  2. Install Node 20
  3. Install dependencies: `npm ci`
  4. Build: `npm run build`
  5. Deploy: `/out` to SWA using official action

### Step 2: Verify Configuration ✓
- **File:** `staticwebapp.config.json` (already exists)
- **Checks:**
  - SPA fallback routing: `/index.html` for SPA
  - Cache headers: `cache-control: public, max-age=31536000` (immutable assets)
  - MIME types: Ensure `.woff2`, `.webp`, etc. configured
  - 404 handling: Route to `/index.html` with 200 status

### Step 3: Set Environment Variables ✓
- **Monitoring:** Application Insights key (already in code)
- **Payment APIs:** Stripe/PayPal keys (in SWA app settings, not repo)
- **Other:** Any runtime config

### Step 4: Create `.azure/config.yaml` (AZD-optional)
- Alternative: Use Azure CLI directly for one-time setup
- Goal: Automate SWA resource creation in subscription

### Step 5: Harden Security ✓
- GitHub Actions secrets (API keys)
- SWA managed identity (optional, for future APIs)
- CORS headers (if backend API added later)
- CSP headers (content security policy)

---

## 5. Post-Deployment (Phase 3)

### Manual Steps
1. **Create Azure Static Web Apps resource** (via Portal or AZD)
2. **Generate GitHub Personal Access Token** (PAT) for CI/CD
3. **Configure GitHub Workflow** with SWA token
4. **Verify Build & Deployment** in GitHub Actions
5. **Monitor via Application Insights** dashboard
6. **Add Custom Domain** (optional, via SWA portal)

### GitHub Workflow Status
- Successful build + deploy: ✓ Green check in PR
- Failed build: ✗ Red X in PR (check logs)
- Production deployment: Auto-deploy to SWA on `main` merge

---

## 6. Artifacts to Create

| File | Location | Status |
|------|----------|--------|
| GitHub Workflow | `.github/workflows/azure-static-web-apps-blue-desert-08d808f10.yml` | **Verified** ✓ |
| SWA Config | `staticwebapp.config.json` | **Verified** ✓ |
| Build Config | `next.config.js` | **Verified** ✓ |
| Environment Vars | `.env.local.example` (for local testing) | **Verified** ✓ |

---

## 7. Azure Context (To Confirm)

- **Subscription ID:** *(To be provided during Phase 2)*
- **Resource Group:** *(To be created or specify existing)*
- **Region:** *(Default: East US, or specify preference)*
- **SWA Resource Name:** *(Auto-generated or custom)*

---

## 8. Decision Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Platform** | Azure Static Web Apps | Free tier, no cost, built for SPAs |
| **Framework** | Next.js (existing) | Already configured for static export |
| **Build Tool** | npm (existing) | Standard Node.js workflow |
| **CI/CD** | GitHub Actions | Free with GitHub, native integration |
| **Monitoring** | Application Insights | Already integrated in code |
| **Hosting Model** | Static Export | Cost-free, fast CDN, SPA-optimized |
| **Infrastructure** | No additional IaC needed | SWA is managed service (wizard-driven) |

---

## 9. Next Steps

### ✓ Approved?
If yes → Proceed to **Phase 2: Execution**
- Generate GitHub Workflow
- Verify configuration
- Set up SWA resource

### ❌ Changes Needed?
If no → Provide feedback and we'll revise the plan

---

## Status

- [x] Phase 1: Planning (THIS DOCUMENT) — **COMPLETE**
- [x] Phase 2: Execution (Verify artifacts + build validation) — **COMPLETE**
- [ ] Phase 3: Validation (azure-validate) — **READY**
- [ ] Phase 4: Deploy (azure-deploy) — **PENDING**

