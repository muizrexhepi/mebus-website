import { AlertCircle, BaggageClaim, Bell, Book, BookImageIcon, Clock, CreditCard, DollarSign, Facebook, Globe, Heart, HeartPulse, HelpCircle, Instagram, Linkedin, Lock, MapPin, RefreshCcw, Shield, TicketIcon, Twitter, User, X } from "lucide-react";
import { enUS, fr, es, de, mk, it, sq } from "date-fns/locale";

export const NAV_LINKS = [

  {
      name: 'Help',
      url: '/help',
  },
  {
      name: 'Contact',
      url: '/help/contact-support',
  },
  {
      name: 'Routes',
      url: '/routes',
  },
];


export const LOCALE_MAP = {
  en: enUS,
  fr: fr,
  es: es,
  de: de,
  mk: mk,
  it: it,
  al: sq,
}


export const FOOTER_LINKS = [
  {
    title: "Services",
    links: [
      {
        name: "Bus Routes",
        link: "/routes",
      },
      {
        name: "Travel Flex Options",
        link: "/help/travel-flex",
      },
      {
        name: "Customer Support",
        link: "/help/contact-support",
      },
      {
        name: "Luggage Policy",
        link: "/help/luggage-policy",
      },
      {
        name: "Discount Offers",
        link: "/discounts",
      },
      {
        name: "Help",
        link: "/help",
      },
    ],
  },
  {
    title: "Partners",
    links: [
      {
        name: "Partner Application",
        link: "/partners/apply",
      },
      {
        name: "Become a Partner",
        link: "/partners/overview",
      },
      {
        name: "Active Operators",
        link: "/partners/active-operators",
      },
      // {
      //   name: "Affiliate Program",
      //   link: "/partners/affiliate",
      // },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        name: "Privacy Policy",
        link: "/legal/privacy-policy",
      },
      {
        name: "Terms of Service",
        link: "/legal/terms-of-service",
      },
      {
        name: "Cookie Policy",
        link: "/legal/cookie-policy",
      },
      {
        name: "Data Policy",
        link: "/legal/data-policy",
      },
    ],
  },
];


export const QUICK_LINKS = [
  { name: "how-to-book", icon: Book, label: "howToBook" },
  { name: "cancellation-policy", icon: RefreshCcw, label: "cancellationPolicy" },
  { name: "payment-options", icon: CreditCard, label: "paymentOptions" },
  { name: "e-ticket-guide", icon: TicketIcon, label: "eTicketGuide" },
  { name: "travel-flex", icon: BaggageClaim, label: "travelFlexOptions" },
  { name: "travel-duration", icon: Clock, label: "travelDuration" },
  { name: "travel-advisory", icon: AlertCircle, label: "travelAdvisory" },
  { name: "contact-support", icon: HelpCircle, label: "contactSupport" }
];


export interface FlexFeature {
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
      name:'Instagram',
      id: "social-media-1",
      icon: Instagram,
      link: "https://www.instagram.com/insyllium",
    },
    {
      name:"Facebook",
      id: "social-media-2",
    icon: Facebook,
      link: "https://www.facebook.com/insyllium",
    },
    {
      name:"X(Twitter)",
      id: "social-media-3",
    icon: X,
      link: "https://www.twitter.com/insyllium",
    },
    {
      name:"Linkedin",
      id: "social-media-4",
    icon: Linkedin,
      link: "https://www.linkedin.com/company/97935419",
    },
  ];


  export enum TRAVEL_FLEX_PRICES {
    PREMIUM = 4,
    BASIC = 2,
    NO_FLEX = 0
  };

  export enum TRAVEL_FLEX_TYPES {
    PREMIUM = "premium",
    BASIC = "basic",
    NO_FLEX = "no_flex",
  };

  interface TravelFlexPermission {
    CAN_CANCEL: number;
    CAN_EDIT: number;
    RESCHEDULE: number;
    SUPPORT: number; 
}

interface TravelFlexPermissions {
    PREMIUM: TravelFlexPermission;
    BASIC: TravelFlexPermission;
    NO_FLEX: TravelFlexPermission;
}

export const TRAVEL_FLEX_PERMISSIONS: TravelFlexPermissions = {
    PREMIUM: {
        CAN_CANCEL: 2,
        CAN_EDIT: 1,
        RESCHEDULE: 3,
        SUPPORT: Infinity,
    },
    BASIC: {
        CAN_CANCEL: 5,
        CAN_EDIT: 3,
        RESCHEDULE: 0,
        SUPPORT: Infinity,
    },
    NO_FLEX: {
        CAN_CANCEL: 0,
        CAN_EDIT: 0,
        RESCHEDULE: 0,
        SUPPORT: Infinity,
    },
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
      icon: Lock,
      title: "Security",
      description: "Manage your account security settings.",
    },
    {
      href: "/account/data-privacy",
      icon: Shield,
      title: "Data and Privacy",
      description: "Control your data and privacy settings.",
    },
    {
      href: "/bookings",
      icon: Book,
      title: "Bookings",
      description: "View and manage your upcoming and past reservations in one place.",
    },
    {
      href: "/account/notifications",
      icon: Bell,
      title: "Notifications",
      description: "Customize your notification preferences.",
    },
    // {
    //   href: "/account/saved-destinations",
    //   icon: Heart,
    //   title: "Saved Destinations",
    //   description: "Quickly access your saved destinations.",
    // },
    {
      href: "/account/deposit",
      icon: DollarSign,
      title: "Deposit Funds",
      description: "Quickly deposit funds for easy future payments without using your card each time.",
    }
    
    
  ];