import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Clé publique Stripe
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
);

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  // const options = {
  //   // passing the client secret obtained in step 3
  //   clientSecret: '{{CLIENT_SECRET}}',
  //   // Fully customizable with appearance API.
  //   appearance: {
  //     /*...*/
  //   },
  // };
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
