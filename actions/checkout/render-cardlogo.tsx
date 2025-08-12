enum CardNetwork {
  Visa = "visa",
  Mastercard = "mastercard",
  AmericanExpress = "amex",
  Discover = "discover",
  DinersClub = "diners",
  JCB = "jcb",
  UnionPay = "unionpay",
  Unknown = "unknown",
}

export const renderNetworkLogo = (network: string) => {
  switch (network.toLowerCase()) {
    case CardNetwork.Visa:
      return (
        <svg
          viewBox="0 0 48 32"
          className="h-6 w-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#1434CB" />
          <path
            d="M19.425 21.6L21.525 10.4H24.6L22.5 21.6H19.425ZM30.975 10.8C30.375 10.575 29.4 10.325 28.2 10.325C25.575 10.325 23.7 11.725 23.7 13.65C23.7 15.05 24.975 15.825 25.95 16.3C26.95 16.775 27.3 17.075 27.3 17.5C27.3 18.15 26.55 18.45 25.875 18.45C24.9 18.45 24.4 18.3 23.55 17.9L23.25 17.75L22.875 20.35C23.625 20.725 24.9 21.05 26.225 21.05C29.025 21.05 30.875 19.675 30.875 17.625C30.875 16.125 29.9 15.05 28.05 14.125C27.175 13.625 26.625 13.325 26.625 12.85C26.625 12.425 27.1 11.975 28.125 11.975C28.95 11.975 29.575 12.15 30.075 12.4L30.375 12.55L30.975 10.8Z"
            fill="white"
          />
          <path
            d="M35.25 10.4H37.725L40.05 21.6H37.2L36.825 19.575H33.75L33.075 21.6H30.3L33.6 10.675C33.9 10.5 34.425 10.4 35.25 10.4ZM36.375 17.45L35.7 14.225L35.025 17.45H36.375Z"
            fill="white"
          />
          <path
            d="M14.025 10.4L11.1 17.85L10.725 15.9L9.375 12.325C9.375 12.325 9.075 10.4 7.5 10.4H3L2.925 10.675C2.925 10.675 4.725 11.075 6.3 12.325L8.85 21.6H11.85L17.025 10.4H14.025Z"
            fill="white"
          />
        </svg>
      );

    case CardNetwork.Mastercard:
      return (
        <svg
          viewBox="0 0 48 32"
          className="h-6 w-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#F79E1B" />
          <circle cx="19" cy="16" r="10" fill="#EB001B" />
          <circle cx="29" cy="16" r="10" fill="#FF5F00" />
          <path
            d="M24 12.5C25.1272 13.3991 25.8207 14.6997 26 16C25.8207 17.3003 25.1272 18.6009 24 19.5C22.8728 18.6009 22.1793 17.3003 22 16C22.1793 14.6997 22.8728 13.3991 24 12.5Z"
            fill="white"
          />
        </svg>
      );

    case CardNetwork.AmericanExpress:
      return (
        <svg
          viewBox="0 0 48 32"
          className="h-6 w-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="32" rx="4" fill="#2557D6" />
          <path
            d="M9.5 14.925H11.85L10.675 12.625L9.5 14.925ZM37.025 10.4L34.1 17.85L33.725 15.9L32.375 12.325C32.375 12.325 32.075 10.4 30.5 10.4H26.025L25.95 10.675C25.95 10.675 27.75 11.075 29.325 12.325L31.875 21.6H34.875L42.075 10.4H37.025Z"
            fill="white"
          />
          <path
            d="M19.425 21.6L21.525 10.4H24.6L22.5 21.6H19.425ZM30.975 10.8C30.375 10.575 29.4 10.325 28.2 10.325C25.575 10.325 23.7 11.725 23.7 13.65C23.7 15.05 24.975 15.825 25.95 16.3C26.95 16.775 27.3 17.075 27.3 17.5C27.3 18.15 26.55 18.45 25.875 18.45C24.9 18.45 24.4 18.3 23.55 17.9L23.25 17.75L22.875 20.35C23.625 20.725 24.9 21.05 26.225 21.05C29.025 21.05 30.875 19.675 30.875 17.625C30.875 16.125 29.9 15.05 28.05 14.125C27.175 13.625 26.625 13.325 26.625 12.85C26.625 12.425 27.1 11.975 28.125 11.975C28.95 11.975 29.575 12.15 30.075 12.4L30.375 12.55L30.975 10.8Z"
            fill="white"
          />
        </svg>
      );

    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      );
  }
};
