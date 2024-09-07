import { environment } from '@/environment';
import { loadStripe } from '@stripe/stripe-js';

let stripePromise: any;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(environment.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;