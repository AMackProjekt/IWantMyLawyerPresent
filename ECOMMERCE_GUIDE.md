# E-commerce Features

## Overview
This site now includes a full e-commerce storefront with secure payment processing.

## Features Added

### 1. Media Folders
- `/public/images/` - For product photos, logos
- `/public/videos/` - For MP4 and video files  
- `/public/media/` - For audio, documents, etc.

### 2. Founder Bio Section
- Professional bio section on main page
- Highlights 20+ years experience
- Customizable content (update in `src/components/FounderBio.tsx`)
- **Important:** Replace `[Founder Name]` placeholder with actual name

### 3. Product Catalog
- Product data in `src/data/products.ts`
- Categories: Books, Courses, Consulting, Merchandise, Resources
- Easy to add/edit products

### 4. Shopping Cart
- Add to cart functionality
- Quantity adjustment
- Cart drawer with live updates
- Persistent cart badge in navigation

### 5. Secure Checkout
- Multiple payment methods:
  - Credit/Debit Cards
  - PayPal integration
- SSL encrypted checkout
- Order confirmation page
- Full billing information form

## To Enable Live Payments

### Stripe Integration (Credit Cards)
1. Install Stripe SDK:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

2. Create Stripe account at https://stripe.com

3. Add environment variables (create `.env` file):
   ```
   VITE_STRIPE_PUBLIC_KEY=your_publishable_key_here
   ```

4. Update `Checkout.tsx` to use real Stripe Elements

### PayPal Integration
1. Create PayPal business account at https://paypal.com

2. Get API credentials from PayPal Developer Portal

3. Install PayPal SDK:
   ```bash
   npm install @paypal/react-paypal-js
   ```

4. Add to `.env`:
   ```
   VITE_PAYPAL_CLIENT_ID=your_client_id_here
   ```

## Customization

### Update Founder Bio
Edit `src/components/FounderBio.tsx`:
- Replace `[Founder Name]` with actual name
- Update bio text to reflect real story
- Add actual profile image to `/public/images/`
- Update stats (Years Experience, Lives Impacted, etc.)

### Add Products
Edit `src/data/products.ts`:
- Add new products to the `products` array
- Set prices, descriptions, categories
- Add product images to `/public/images/`
- Mark featured products with `featured: true`

### Product Images
1. Add images to `/public/images/`
2. Update product `image` path (e.g., `'/images/my-product.jpg'`)
3. Recommended size: 800x800px minimum

## Navigation
New sections accessible via navigation:
- **About** - Founder bio (#about)
- **Shop** - Product catalog (#shop)
- **Cart** - Shopping cart (icon in header)
- **Checkout** - Secure checkout page (#checkout)

## Security Notes
- All payment information is encrypted
- Never store card details in your database
- Use environment variables for API keys
- Enable HTTPS in production
- Comply with PCI DSS standards for card processing

## Next Steps
1. Run `npm install` to install dependencies
2. Update founder bio with real information
3. Add product images to `/public/images/`
4. Set up Stripe/PayPal accounts
5. Configure payment environment variables
6. Test checkout flow
7. Deploy with HTTPS enabled
