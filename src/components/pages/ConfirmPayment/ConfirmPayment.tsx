import { useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';

interface StateFormCheckoutProps {
  orderId: number;
  // paymentMethodId: string;
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
function ConfirmPaymentPage() {
  const { state }: { state: StateFormCheckoutProps } = useLocation();
  const { orderId, orderData } = state;
  const user = useAppSelector(selectCurrentUser);

  return (
    <main className="max-w-7xl mx-auto p-4 min-h-screen">
      <section className="mb-10">
        <figure className="relative">
          <img
            className="w-11/12 rounded-lg m-auto"
            src="/images/Groot.jpg"
            alt="groot"
          />
          <h1 className="h1-title text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {user?.first_name}, Merci pour votre commande !
          </h1>
        </figure>
      </section>
      <section className="w-11/12 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="h2-title text-center mb-6">Détails de la Transaction</h2>
        <ul>
          <li className="text-lg">
            <strong>Commande numéro:</strong> {orderId}
          </li>
          <li>
            <strong>Montant:</strong> {orderData.totalAmountOrder} €
          </li>
        </ul>
      </section>

      <Link className="btn block mx-auto my-10" to="/" type="button">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}

export default ConfirmPaymentPage;
