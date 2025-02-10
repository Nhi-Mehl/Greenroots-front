import { Link } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';

import { useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useGetAllUserOrdersQuery } from '../../../store/features/order/orderApiSlice';

function OrdersPage() {
  // Récupérer l'utilisateur connecté de la store Redux
  const user = useAppSelector(selectCurrentUser);

  // Récupérer les commandes de l'utilisateur via RTK Query
  const { data: orders } = useGetAllUserOrdersQuery(
    user ? { userId: user?.id } : skipToken
  );

  console.log('🚀 ~ file: Orders.tsx ~ line 21 ~ OrdersPage ~ orders', orders);

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-center h2-title">Mes commandes</h1>
      {orders && orders.length === 0 ? (
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
            {orders &&
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-300 bg-beige"
                >
                  <td className="py-4 px-6">Commande</td>
                  <td className="py-4 px-6">{order.id}</td>
                  <td className="py-4 px-6">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Date non disponible'}
                  </td>
                  <td className="py-4 px-6">{order.amount} €</td>
                  <td className="py-4 px-6">
                    <Link
                      className="btn text-white py-2 px-4 rounded"
                      to={`/order-details/${order.id}`}
                    >
                      Consulter
                    </Link>
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
