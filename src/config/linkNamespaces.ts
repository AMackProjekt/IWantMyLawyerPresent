export const LINK_NAMESPACES = {
  // namespace: domain
  siteDomain: 'https://iwantmylawyerpresent.com',
  siteDomainWww: 'https://www.iwantmylawyerpresent.com',
  siteDomainShort: 'iwantmylawyerpresent',

  // namespace: social-links
  facebookPageUrl: 'https://www.facebook.com/YOUR_PAGE_HANDLE',
  instagramPageUrl: 'https://www.instagram.com/YOUR_PAGE_HANDLE',

  // namespace: payment-methods
  paymentAccounts: {
    cardProcessorCheckoutUrl: '',
    paypalMeUrl: 'https://www.paypal.com/paypalme/YOUR_HANDLE',
    zelleHandle: 'zelle@iwantmylawyerpresent.com',
    cashAppTag: '$YOURCASHTAG',
    applePayPhone: '+1 (000) 000-0000',
  },

  // namespace: launch-media
  launchMedia: {
    boldCoverImage: '/images/Bold-Cover.JPG',
    bookCoverImage: '/images/Book-Cover.JPG',
    comingSoonVideo: '/images/Launch-Teaser-1.mp4',
    secondaryLaunchVideo: '/images/Launch-Teaser-2.mp4',
  },

  // namespace: marketing-clips-from-gallery
  marketingClips: [
    {
      title: 'Streetwear Drop Reel',
      frames: [
        '/images/TShirt.JPG',
        '/images/TShirt2.JPG',
        '/images/TShirt3.JPG',
        '/images/Womens-Tees.JPG',
      ],
    },
    {
      title: 'Launch Energy Reel',
      frames: [
        '/images/Bold-Cover.JPG',
        '/images/Book-Cover.JPG',
        '/images/IMG_5703.JPG',
        '/images/IMG_5708.jpg',
      ],
    },
    {
      title: 'Community Fit Reel',
      frames: [
        '/images/IMG_5699.JPG',
        '/images/IMG_5701 (1).JPG',
        '/images/IMG_5702.JPG',
        '/images/IMG_5707.JPG',
      ],
    },
  ],

  // namespace: embedded-video-clips
  videoEmbeds: [
    {
      title: 'Storefront Highlight Reel',
      type: 'file',
      src: '/images/Launch-Teaser-1.mp4',
      poster: '/images/Bold-Cover.JPG',
    },
    {
      title: 'Book Launch Teaser',
      type: 'file',
      src: '/images/Launch-Teaser-2.mp4',
      poster: '/images/Book-Cover.JPG',
    },
    {
      title: 'Customer Clip Feature',
      type: 'embed',
      src: 'https://www.youtube.com/embed/VIDEO_ID_3',
    },
  ],
} as const;
