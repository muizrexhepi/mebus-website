import { Bell, BookImageIcon, Facebook, Globe, Heart, HeartPulse, Instagram, Linkedin, Twitter, User, X } from "lucide-react";

export const NAV_LINKS = [
    {
        name:'Hotel',
        url:'/hotel',
    },
    {
        name:'Flights',
        url:'/flights',
    },
    {
        name:'Train',
        url:'/train',
    },
    {
        name:'Travel',
        url:'/travel',
    },
]


export const FOOTER_LINKS = [
  {
    title: "Services",
    links: [
      {
        name: "Book Tickets",
        link: "/services/book-tickets",
      },
      {
        name: "Bus Routes",
        link: "/services/bus-routes",
      },
      {
        name: "Travel Insurance",
        link: "/services/travel-insurance",
      },
      {
        name: "Customer Support",
        link: "/services/customer-support",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        link: "/about-us",
      },
      {
        name: "Careers",
        link: "/careers",
      },
      {
        name: "Blog",
        link: "/blog",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
  },
];

interface FlexFeature {
  name: string;
  price: number;
  value: string;
  features: string[];
}


export const flexFeatures: FlexFeature[] = [
  {
    name: "Premium Flex",
    value: "premium",
    price: 4,
    features: [
      "Cancel your trip up to 48 hours before departure",
      "Change trip details up to 24 hours before departure",
      "Reschedule your booking up to 3 days before departure",
    ],
  },
  {
    name: "Basic Flex",
    value: "basic",
    price: 2,
    features: [
      "Cancel your trip up to 5 days before departure",
      "Change trip details up to 3 days before departure",
    ],
  },
  {
    name: "No Flexibility",
    value: "no_flex",
    price: 0,
    features: [],
  },
];



  export const SOCIAL_LINKS = [
    {
      id: "social-media-1",
      icon: Instagram,
      link: "https://www.instagram.com/insyllium",
    },
    {
      id: "social-media-2",
    icon: Facebook,
      link: "https://www.facebook.com/insyllium",
    },
    {
      id: "social-media-3",
    icon: X,
      link: "https://www.twitter.com/insyllium",
    },
    {
      id: "social-media-4",
    icon: Linkedin,
      link: "https://www.linkedin.com/company/97935419",
    },
    {
      id: "social-media-5",
    icon: Twitter,
      link: "https://www.linkedin.com/company/97935419",
    },
  ];


  export enum TRAVEL_FLEX_PRICES {
    PREMIUM = 4,
    BASIC = 2,
    NO_FLEX = 0
  };

  export const ACCOUNT_SETTINGS = [
    {
      href: "/account/personal-info",
      icon: User,
      title: "Profile",
      description: "Manage and provide personal details how we can reach you.",
    },
    {
      href: "/account/login-security",
      icon: User,
      title: "Security",
      description: "Manage your account security settings.",
    },
    {
      href: "/account/bookings",
      icon: BookImageIcon,
      title: "My Bookings",
      description: "Customize and quicky manage your bookings.",
    },
    // {
    //   href: "/account/patient-info",
    //   icon: HeartPulse,
    //   title: "Patient Information",
    //   description: "You can use this information to quickly make appointments.",
    // },
    {
      href: "/account/notifications",
      icon: Bell,
      title: "Notifications",
      description: "Customize your notification preferences.",
    },
    {
      href: "/account/saved-destinations",
      icon: Heart,
      title: "Saved Destinations",
      description: "Quickly access your saved destinations.",
    },
  ];