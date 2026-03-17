<img width="2157" height="1078" alt="Screenshot 2026-03-17 124551" src="https://github.com/user-attachments/assets/cc78bcb2-75e2-4eaf-82e4-2351fd62acda" />


# I Want My Lawyer Present - Merchandise Storefront

A dynamic e-commerce platform for legal merchandise and products. Built with Next.js 15, React 18, TypeScript, and Tailwind CSS featuring a rich black color theme.

## Features

- 🛍️ **Merchandise Storefront** - Browse and purchase legal-themed products
- 🎨 **Rich Dynamic Black Theme** - Sophisticated black and gold color scheme
- 🛒 **Shopping Cart** - Full e-commerce functionality
- 📦 **Product Catalog** - Organized product categories and search
- 👤 **Customer Platform** - Account management and order tracking
- 🔒 **Secure Checkout** - Protected payment processing
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark/Light Mode** - Theme toggle support


## Technology Stack

- **Framework**: Next.js 15
- **UI**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API

## Release Checklist

Use this quick checklist before each production release:

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Checkout disclaimer is visible and accurate
- [ ] Card method remains disabled unless a hosted processor URL is configured
- [ ] No hardcoded admin credentials in client code
- [ ] Admin sign-in, sign-out, and password rotation tested
- [ ] Domain DNS resolves correctly for apex and `www`
- [ ] HTTPS certificate is valid for all production domains
- [ ] Test purchase flow completes using configured payment methods
- [ ] Legal copy (Terms/Privacy/Disclaimer) matches actual data handling behavior

## Project Structure

```
├── app/
│   ├── shop/          # Storefront pages
│   ├── account/       # Customer account
│   └── checkout/      # Payment flow
├── components/
│   └── ui/           # Reusable components
├── lib/              # Utilities
└── public/           # Static assets
```

## License

MIT License - see LICENSE file for details
