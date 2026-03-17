# Landing Baseline (Vite)

This repository is now standardized around the Vite landing page implementation.

## Runtime Entry
- `index.html`
- `src/main.tsx`
- `src/App.tsx`

## Active Landing Sections (Render Order)
1. `Navigation`
2. `LaunchSpotlight`
3. `Hero`
4. `FounderBio`
5. `Shop`
6. `VideoClips`
7. `SupportMovement`
8. `Checkout`
9. `CallToAction`
10. `Footer`

## Cart State Modules
- `src/CartContext.ts`
- `src/CartProvider.tsx`
- `src/useCart.ts`
- `src/components/CartDrawer.tsx`

## Build/Lint Commands
- `npm run dev`
- `npm run lint`
- `npm run build`

## Notes
- Vite is the source-of-truth workflow.
- Legacy Next.js app surface was removed to prevent config/tooling conflicts.
