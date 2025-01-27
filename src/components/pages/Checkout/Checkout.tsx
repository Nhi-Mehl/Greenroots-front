import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Stripe from './Stripe';

const PUBLIC_KEY =
  'pk_test_51PwrTXCOFAh3xwigSEJ23L1fZ6t4QEjpplL9g0tqPwpvw8FHxUDubLt3rM2kjgg1P24JmFEDn5tHjqdKObtwPH0V00ckfHGndY';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const CheckoutPage = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <Stripe />
    </Elements>
  );
};

export default CheckoutPage;
