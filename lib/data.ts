import { Facebook, Globe, Instagram, Linkedin, Twitter, X } from "lucide-react";

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