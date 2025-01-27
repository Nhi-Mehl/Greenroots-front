import { useLocation, Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

function ConfirmPaymentPage() {
  const { state } = useLocation();
  const { orderData, paymentMethodId, orderId } = state;
  const { user } = useUser();

  return (
    <div className="my-10">
      <div className="mb-10">
        <figure className="relative">
          <img
            className="w-11/12 rounded-lg m-auto"
            src="/images/Groot.jpg"
            alt="groot"
          />
          <h1 className="absolute inset-0 flex items-end text-center justify-center text-white font-semibold p-4 lg:text-3xl lg:p-48">
            On dit merci qui !!! <br /> Merci {user?.first_name} !
          </h1>
        </figure>
      </div>
      <div className="w-11/12 mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-6 text-center">
          Détails de la Transaction
        </h2>
        <div>
          <h3 className="text-lg font-semibold">Commande {orderId}</h3>
          <p>
            <strong>Montant:</strong> {orderData.amount} €
          </p>
          <p>
            <strong>Id de Paiement:</strong> {paymentMethodId}
          </p>
          {/* Ajoute d'autres détails de la commande ici */}
        </div>
      </div>
      <div className="flex items-center justify-center my-8">
        <Link
          className="border-1 bg-green-900 text-white py-2 px-2 rounded-lg"
          to="/"
          type="button"
        >
          retour vers l&apos;accueil
        </Link>
      </div>
    </div>
  );
}

export default ConfirmPaymentPage;
