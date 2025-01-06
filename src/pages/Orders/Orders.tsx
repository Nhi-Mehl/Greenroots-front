import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { IOrder } from '../../@types';
import api from '../../api/index';

interface IOrderWithDate extends IOrder {
  createdAt: string;
}

function OrdersPage() {
  const [orders, setOrders] = useState<IOrderWithDate[]>([]);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await api.get(`/orders/${user.id}`); // Requête à l'API pour récupérer les commandes de l'utilisateur

        if (response.status === 200) {
          setOrders(response.data); // Mise à jour de l'état avec les données reçues
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes', error); // Gère les erreurs
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user, navigate]); // Exécute le useEffect quand l'utilisateur change

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-center h2-title">Mes commandes</h1>
      {orders.length === 0 ? (
        <p>Aucune commande trouvée</p>
      ) : (
        <table className="table-auto w-full mt-10">
          <thead>
            <tr className="bg-beige text-left">
              <th className="py-4 px-6">Commande</th>
              <th className="py-4 px-6">Numéro</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Montant</th>
              <th className="py-4 px-6">Détails</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-300 bg-beige">
                <td className="py-4 px-6">Commande</td>
                <td className="py-4 px-6">{order.id}</td>
                <td className="py-4 px-6">
                  {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td className="py-4 px-6">{order.amount} €</td>
                <td className="py-4 px-6">
                  <button
                    className="btn text-white py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                      navigate(`/order-details/${order.id}`);
                    }}
                  >
                    Consulter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default OrdersPage;
