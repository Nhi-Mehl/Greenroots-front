import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext/CartContext';
import { removeFromCart } from '../Cart/CartContext/CartAction';
function Checkout() {
  const { state } = useLocation();
  const orderData = state?.orderData;
  const { cartItems, removeFromCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          'http://localhost:3000/api/stripe/charge',
          {
            amount: Math.round(parseFloat(orderData.amount) * 100),
            id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          if (!token) {
            console.log('Token missing, redirecting to login.');
            navigate('/login');
            return; // Arrêtez l'exécution si le token n'est pas présent
          }
          try {
            const orderResponse = await axios.post(
              'http://localhost:3000/api/orders/create_order',
              orderData,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(orderResponse.data.success);
            const { orderId } = orderResponse.data;
            cartItems.map((item) => removeFromCart(item.tree.id));
            navigate('/confirmPay', {
              state: {
                orderData,
                paymentMethodId: id,
                orderId,
              },
            });
          } catch (error) {
            console.log('erreur', error);
          }
        } else {
          console.error('paiement echoué');
        }
      } catch (err) {
        console.log('error.message', error);
      }
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Paiement</h2>
      <form className="space-y-4" onSubmit={handleSubmit} action="">
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="card"
          >
            Carte de crédit
          </label>
          <CardElement
            options={{
              hidePostalCode: true,
            }}
            className="mt-2 p-2 border border-gray-300 rounded-lg"
          />
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            payer
          </button>
        </div>
      </form>
    </div>
  );
}
export default Checkout;
