import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'prod-004',
    name: 'Tshirts',
    description: 'Premium cotton t-shirts with justice-forward messaging. Available in multiple sizes and colors.',
    price: 24.99,
    image: '/images/TShirt.JPG',
    category: 'merchandise',
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-007',
    name: 'Hoodies',
    description: 'Comfort-fit hoodies designed for everyday wear while supporting the movement for legal awareness.',
    price: 49.99,
    image: '/images/Hoodie.JPG',
    category: 'merchandise',
    inStock: true,
    featured: false,
  },
  {
    id: 'prod-005',
    name: 'Legal Rights Wallet Card (Digital Download)',
    description: 'Instant digital wallet card download with Apple Wallet, Google Wallet, and Samsung Wallet support.',
    price: 4.99,
    image: '/images/IMG_5707.JPG',
    category: 'resources',
    inStock: true,
    featured: true,
  },
  {
    id: 'prod-006',
    name: 'Advocacy Toolkit',
    description: 'Complete toolkit for becoming an advocate for justice reform in your community. Includes guides, templates, and resources.',
    price: 39.99,
    image: '/images/IMG_5708.jpg',
    category: 'resources',
    inStock: true,
    featured: true,
  },
];
