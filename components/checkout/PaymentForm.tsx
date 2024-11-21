// import React, { useState } from 'react';
// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';
// import { Stripe, StripeElements } from '@stripe/stripe-js';

// // Define type for focused state
// type FocusedState = {
//   cardNumber: boolean;
//   cardExpiry: boolean;
//   cardCvc: boolean;
// };

// // Define props type if you want to pass additional props
// interface StripePaymentFormProps {
//   onPaymentSubmit?: (stripe: Stripe, elements: StripeElements) => Promise<void>;
//   className?: string;
// }

// const StyledStripePaymentForm: React.FC<StripePaymentFormProps> = ({
//   onPaymentSubmit,
//   className = ''
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [focused, setFocused] = useState<FocusedState>({
//     cardNumber: false,
//     cardExpiry: false,
//     cardCvc: false
//   });

//   // Typed Stripe Element styles
//   const inputStyles: {
//     base: React.CSSProperties;
//     invalid: React.CSSProperties;
//   } = {
//     base: {
//       color: '#32325d',
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSize: '16px',
//       '::placeholder': {
//         color: '#aab7c4'
//       }
//     },
//     invalid: {
//       color: '#fa755a',
//       iconColor: '#fa755a'
//     }
//   };

//   // Stripe Element options with TypeScript
//   const cardNumberOptions: an = {
//     style: inputStyles,
//     placeholder: 'Card Number'
//   };

//   const cardExpiryOptions: StripeCardExpiryElementOptions = {
//     style: inputStyles,
//     placeholder: 'MM / YY'
//   };

//   const cardCvcOptions: StripeCardCvcElementOptions = {
//     style: inputStyles,
//     placeholder: 'CVC'
//   };

//   // Helper function for input classes with type safety
//   const getInputClasses = (type: keyof FocusedState): string => `
//     w-full
//     px-3
//     py-2
//     border
//     ${focused[type] ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}
//     rounded-md
//     transition-all
//     duration-200
//     ease-in-out
//   `;

//   // Handle form submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       return;
//     }

//     if (onPaymentSubmit) {
//       await onPaymentSubmit(stripe, elements);
//     }
//   };

//   // Focus state handlers with explicit typing
//   const handleFocus = (field: keyof FocusedState) => {
//     setFocused(prev => ({...prev, [field]: true}));
//   };

//   const handleBlur = (field: keyof FocusedState) => {
//     setFocused(prev => ({...prev, [field]: false}));
//   };

//   return (
//     <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Card Number
//         </label>
//         <div className={getInputClasses('cardNumber')}>
//           <CardNumberElement
//             options={cardNumberOptions}
//             onFocus={() => handleFocus('cardNumber')}
//             onBlur={() => handleBlur('cardNumber')}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Expiration Date
//           </label>
//           <div className={getInputClasses('cardExpiry')}>
//             <CardExpiryElement
//               options={cardExpiryOptions}
//               onFocus={() => handleFocus('cardExpiry')}
//               onBlur={() => handleBlur('cardExpiry')}
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             CVC
//           </label>
//           <div className={getInputClasses('cardCvc')}>
//             <CardCvcElement
//               options={cardCvcOptions}
//               onFocus={() => handleFocus('cardCvc')}
//               onBlur={() => handleBlur('cardCvc')}
//             />
//           </div>
//         </div>
//       </div>

//       {onPaymentSubmit && (
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//           disabled={!stripe}
//         >
//           Pay Now
//         </button>
//       )}
//     </form>
//   );
// };

// export default StyledStripePaymentForm;
