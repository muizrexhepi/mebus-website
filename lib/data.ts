import { AlertCircle, Bell, Book, BookImageIcon, Clock, CreditCard, DollarSign, Facebook, Globe, Heart, HeartPulse, HelpCircle, Instagram, Linkedin, MapPin, RefreshCcw, TicketIcon, Twitter, User, X } from "lucide-react";

export const NAV_LINKS = [
    {
        name:'Home',
        url:'/',
    },
    {
        name:'Bookings',
        url:'/bookings',
    },
    {
        name:'Help',
        url:'/help',
    },
    {
        name:'Contact',
        url:'/contact',
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
        name: "Help",
        link: "/help",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
  },
  {
    title: "Partners",
    links: [
      {
        name: "Partner Login",
        link: "/partners/login",
      },
      {
        name: "Become a Partner",
        link: "/partners/overview",
      },
      {
        name: "Active Operators",
        link: "/partners/active-operators",
      },
    ],
  },
];

export const QUICK_LINKS = [
    { name: "how-to-book", icon: Book, label: "How to Book" },
    { name: "cancellation-policy", icon: RefreshCcw, label: "Cancellation Policy" },
    { name: "payment-options", icon: CreditCard, label: "Payment Options" },
    { name: "e-ticket-guide", icon: TicketIcon, label: "E-Ticket Guide" },
    { name: "routes-and-stops", icon: MapPin, label: "Routes & Stops" },
    { name: "travel-duration", icon: Clock, label: "Travel Duration" },
    { name: "travel-advisory", icon: AlertCircle, label: "Travel Advisory" },
    { name: "contact-support", icon: HelpCircle, label: "Contact Support" },
]

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
    {
      href: "/account/deposit",
      icon: DollarSign,
      title: "Deposit Funds",
      description: "Quickly deposit funds for easy future payments without using your card each time.",
    }
    
    
  ];