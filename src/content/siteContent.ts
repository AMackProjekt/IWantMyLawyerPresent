export type SiteContent = {
  brandName: string;
  navShopCta: string;
  domains: {
    primary: string;
    www: string;
    short: string;
  };
  navigation: {
    home: string;
    shop: string;
    videoClips: string;
    gallery: string;
    checkout: string;
    about: string;
    contact: string;
  };
  media: {
    founderProfileImage: string;
    bookCoverImage: string;
    launchCoverImage: string;
    launchPosterImage: string;
    launchPrimaryVideo: string;
    launchSecondaryVideo: string;
  };
  payments: {
    paypalEnabled: boolean;
    paypalCheckoutUrl: string;
    googlePayEnabled: boolean;
    googlePayCheckoutUrl: string;
    applePayEnabled: boolean;
    applePayCheckoutUrl: string;
    zelleEnabled: boolean;
    zelleHandle: string;
    cashAppEnabled: boolean;
    cashAppTag: string;
  };
  hero: {
    line1: string;
    line2: string;
    highlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
  };
  launch: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    primaryCta: string;
    secondaryCta: string;
    videoTitle: string;
    videoTag: string;
  };
  founder: {
    name: string;
    role: string;
    storyLabel: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    quote: string;
  };
  bookLaunch: {
    namespace: string;
    title: string;
    description: string;
    launchDate: string;
    preOrderStatus: string;
    mediaKitStatus: string;
    preOrderButton: string;
    mediaKitButton: string;
  };
  contact: {
    heading: string;
    subheading: string;
    card1Title: string;
    card1Description: string;
    card2Title: string;
    card2Description: string;
    card3Title: string;
    card3Description: string;
    card4Title: string;
    card4Description: string;
    formTitle: string;
  };
  shop: {
    sectionTitle: string;
    featuredTitle: string;
    allTitle: string;
  };
  footer: {
    brandTitle: string;
    brandDescription: string;
    legalNote: string;
  };
};

export const defaultSiteContent: SiteContent = {
  brandName: 'I want My Lawyer Present',
  navShopCta: 'Shop Now',
  domains: {
    primary: 'https://iwantmylawyerpresent.com',
    www: 'https://www.iwantmylawyerpresent.com',
    short: 'iwantmylawyerpresent',
  },
  navigation: {
    home: 'Home',
    shop: 'Shop',
    videoClips: 'Video Clips',
    gallery: 'Gallery',
    checkout: 'Checkout',
    about: 'About',
    contact: 'Contact',
  },
  media: {
    founderProfileImage: '/images/FoundersProfile.JPG',
    bookCoverImage: '/images/Book%20Cover.JPG',
    launchCoverImage: '/images/Bold-Cover.JPG',
    launchPosterImage: '/images/Book-Cover.JPG',
    launchPrimaryVideo: '/images/Launch-Teaser-1.mp4',
    launchSecondaryVideo: '/images/Launch-Teaser-2.mp4',
  },
  payments: {
    paypalEnabled: true,
    paypalCheckoutUrl: 'https://www.paypal.com/paypalme/YOUR_HANDLE',
    googlePayEnabled: true,
    googlePayCheckoutUrl: '',
    applePayEnabled: true,
    applePayCheckoutUrl: '',
    zelleEnabled: true,
    zelleHandle: 'zelle@iwantmylawyerpresent.com',
    cashAppEnabled: true,
    cashAppTag: '$YOURCASHTAG',
  },
  hero: {
    line1: 'Premium Gear.',
    line2: 'Bold Message.',
    highlight: 'Official Storefront.',
    subtitle: 'Apparel, accessories, and digital drops from I Want My Lawyer Present.',
    primaryCta: 'Shop The Storefront',
    secondaryCta: 'View Merch Gallery',
    stat1Number: '30+',
    stat1Label: 'Merch Variations',
    stat2Number: '24/7',
    stat2Label: 'Secure Checkout Access',
    stat3Number: '4+',
    stat3Label: 'Payment Methods',
  },
  launch: {
    badge: 'Coming Soon Drop',
    titleLine1: 'Coming Soon',
    titleLine2: 'Launch Wave',
    primaryCta: 'Shop The Drop',
    secondaryCta: 'Watch Clips',
    videoTitle: 'Dynamic Book Launch Video',
    videoTag: 'Book Cover Feature',
  },
  founder: {
    name: 'Brian Mason',
    role: 'Founder / Creative Director',
    storyLabel: 'Brand Story',
    headline: 'Built To Be Worn. Built To Be Seen.',
    paragraph1:
      'I Want My Lawyer Present is a statement brand built around bold design, conversation-starting apparel, and quality-first drops that represent confidence and identity.',
    paragraph2:
      'Brian Mason leads the creative direction, product curation, and launch strategy behind each release, keeping every piece clean, wearable, and instantly recognizable.',
    paragraph3:
      'From signature tees to digital wallet products, the storefront is designed to make checkout easy while giving customers a premium experience from first click to delivery.',
    quote:
      '"The goal is simple: release products people actually want to wear, and make every launch feel like an event."',
  },
  bookLaunch: {
    namespace: 'L.W.O.P',
    title: 'Founder Book Launch',
    description: 'Upcoming release details, pre-order link, launch date, and media kit assets will be published here.',
    launchDate: 'Coming Soon',
    preOrderStatus: 'Opening Soon',
    mediaKitStatus: 'Press Assets Pending',
    preOrderButton: 'Pre-Order Link Coming Soon',
    mediaKitButton: 'Download Media Kit (Soon)',
  },
  contact: {
    heading: "Let's Build Your Order",
    subheading: 'Need help with sizing, bulk orders, or custom bundles? Reach out and we will get back to you.',
    card1Title: 'Order Support',
    card1Description: 'Get quick help with order updates and checkout questions',
    card2Title: 'Wholesale Inquiries',
    card2Description: 'Ask about bulk pricing for teams, events, and partners',
    card3Title: 'Size + Fit Guide',
    card3Description: 'Get recommendations before placing your order',
    card4Title: 'Secure Orders',
    card4Description: 'Protected checkout with multiple payment options',
    formTitle: 'Contact The Storefront Team',
  },
  shop: {
    sectionTitle: 'Official Storefront',
    featuredTitle: 'Featured Products',
    allTitle: 'All Products',
  },
  footer: {
    brandTitle: 'I Want My Lawyer',
    brandDescription: 'Official storefront for I Want My Lawyer Present apparel, accessories, and digital drops.',
    legalNote:
      'Product details, pricing, and availability may change without notice. Please review your order before submitting payment.',
  },
};
