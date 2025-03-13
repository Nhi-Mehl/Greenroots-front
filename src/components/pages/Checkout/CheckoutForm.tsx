import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardElement,
  AddressElement,
} from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { IoArrowBackOutline } from 'react-icons/io5';

import { useCreatePaymentIntentMutation } from '../../../store/features/StripePayment/stripePaymentApiSlice';
import { useAppDispatch } from '../../../store/hooks';
import { clearCart } from '../../../store/features/cart/cartSlice';
import { useCreateOrderMutation } from '../../../store/features/order/orderApiSlice';
import Form from '../../Form/Form';
import Button from '../../Form/Button/Button';

// Définition de l'interface pour les données de la commande
interface OrderDataProps {
  orderData: {
    totalAmountOrder: number;
    orderLine: {
      project_tree_id: number;
      project_tree_name: string;
      project_tree_picture: string;
      projet_name: string;
      quantity: number;
      amount: number;
    }[];
  };
}
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state }: { state: OrderDataProps } = useLocation();
  //   Récupérer les données de la commande depuis l'emplacement de l'URL
  const { orderData } = state;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const cartItems = useAppSelector(selectCart);

  // Mutations avec RTK Query
  const [createPaymentIntent, { isLoading: isPaymentLoading }] =
    useCreatePaymentIntentMutation();
  const [createOrder, { data: order, isSuccess: isOrderSuccess }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (isOrderSuccess) {
      // Rediriger vers la page de confirmation de paiement
      navigate('/confirm-payment', {
        state: {
          orderData,
          // paymentMethodId: result.paymentIntent.payment_method,
          orderId: order.newOrder.id,
        },
      });
    }
  }, [isOrderSuccess, orderData, navigate, order]);

  // Gestion de la soumission du formulaire de paiement
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    try {
      // Création du Payment Intent via RTK Query
      const response = await createPaymentIntent(
        orderData.totalAmountOrder * 100
      ).unwrap();

      if (!response.clientSecret) {
        return;
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        Swal.fire('Erreur', 'Veuillez entrer une carte valide.', 'error');
        return;
      }

      const result = await stripe.confirmCardPayment(response.clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        Swal.fire(
          'Erreur de paiement',
          result.error.message || 'Une erreur est survenue',
          'error'
        );
        return;
      }

      // Si le paiement réussit, création de la commande
      if (result.paymentIntent?.status === 'succeeded') {
        await createOrder(orderData).unwrap();

        // Vider le panier après commande
        dispatch(clearCart());
      }
    } catch (err) {
      Swal.fire('Erreur', 'Une erreur est survenue lors du paiement.', 'error');
    }
  };

  return (
    <main className="container min-h-screen mx-auto pt-12 px-4 lg:px-10">
      <Link
        to="/cart"
        className="flex gap-2 mb-10 items-center hover:underline"
      >
        <IoArrowBackOutline className="text-lg" />
        <p className="text-xl hidden lg:block">Retour au panier</p>
      </Link>
      <h1 className="h1-title text-center mb-10">Confirmer la commande</h1>
      <p
        className="text-center font-bold text-lg
             text-red-500 bg-red-100 border border-red-200 rounded-lg p-6 mb-10"
      >
        Ceci est un projet de démonstration, il ne s&apos;agit pas du site
        e-commerce définitif. Veuillez ne pas effectuer de paiement avec votre
        bancaire.
      </p>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Section de résumé de la commande */}
        <section
          aria-labelledby="Résumé de la commande"
          className="w-full h-fit p-4 border rounded-lg shadow"
        >
          <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>
          <ul className="flex flex-col gap-2">
            {orderData.orderLine.map((line) => (
              <li
                key={line.project_tree_id}
                className="border-b-2 border-gray-100 mb-2 flex gap-4"
              >
                <img
                  src={`/images/species/${line.project_tree_picture}.webp`}
                  alt={`${line.project_tree_name}`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="w-full">
                  <p className="font-bold mb-2">{line.projet_name}</p>
                  <p>{line.project_tree_name}</p>
                  <p className="flex justify-between mb-2">
                    <span>x {line.quantity}</span>
                    <span className="text-right">{line.amount} €</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="flex justify-between">
            <span>Total</span>
            <span>{orderData.totalAmountOrder} €</span>
          </p>
        </section>

        {/* Section de formulaire de paiement */}
        <section
          aria-labelledby="formulaire de paiement"
          className="w-full h-fit mx-auto p-4 mb-10 border rounded-lg shadow"
        >
          <Form
            onSubmit={handleSubmit}
            action="/checkout"
            className="flex flex-col gap-6"
          >
            <label htmlFor="billing-address" className="font-bold">
              Adresse de facturation
              <AddressElement
                id="billing-address"
                options={{
                  mode: 'billing',
                  allowedCountries: ['FR'],
                  fields: { phone: 'always' },
                }}
                className="mt-2"
              />
            </label>

            <label htmlFor="card-element" className="font-bold">
              Carte de crédit
              <CardElement
                id="card-element"
                options={{
                  hidePostalCode: true,
                }}
                className="p-2 mt-2 border rounded-lg"
              />
            </label>

            {/* {isPaymentError && (
            <p className="text-red-500 mt-2">
              {paymentError?.message || 'Erreur de paiement'}
            </p>
          )} */}

            <Button
              variant="form"
              type="submit"
              isLoading={!stripe || isPaymentLoading}
              // className="disabled:opacity-50"
            >
              Payer
            </Button>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default CheckoutForm;
