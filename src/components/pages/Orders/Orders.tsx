import { Link } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';

import { useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useGetAllUserOrdersQuery } from '../../../store/features/order/orderApiSlice';

function OrdersPage() {
  // Récupérer l'utilisateur connecté de la store Redux
  const user = useAppSelector(selectCurrentUser);

  // Récupérer les commandes de l'utilisateur via RTK Query
  const { data: orders, isLoading: isLoadingOrders } = useGetAllUserOrdersQuery(
    user ? user?.id : skipToken
  );

  //  🔴 Gestion du chargement avec un Skeleton UI
  if (isLoadingOrders) {
    return (
      <ul className="mt-16 space-y-4">
        {[...Array(3)].map((_, index) => (
          <li
            key={index}
            className="shadow-md p-6 rounded-lg border border-gray-200 animate-pulse"
          >
            <article className="w-full flex flex-col gap-y-4 justify-between items-center md:flex-row">
              <div className="h-6 w-48 bg-gray-300 rounded" />
              <div className="h-6 w-32 bg-gray-300 rounded" />
              <div className="h-6 w-20 bg-gray-300 rounded" />
              <div className="h-6 w-24 bg-gray-300 rounded" />
            </article>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-10 min-h-screen">
      <h1 className="text-center h2-title mt-10">Mes commandes</h1>

      {/* Si l'utilisateur n'a pas de commandes, afficher un message */}
      {orders?.length === 0 && !isLoadingOrders && (
        <p className="text-center mt-4">
          Vous n&apos;avez pas encore de commandes chez Greenroots.
        </p>
      )}

      {/* Si l'utilisateur a des commandes, les afficher */}
      {orders && orders.length > 0 && (
        <ul className="mt-16 space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="shadow-md p-6 rounded-lg border border-gray-200
                "
            >
              <article className="w-full flex flex-col gap-y-4 justify-between items-center md:flex-row">
                <h2 className="font-semibold">N° de la commande: {order.id}</h2>
                <p>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Date non disponible'}
                </p>
                <p className="font-bold">{order.amount} €</p>

                <Link
                  className="mx-4 underline"
                  to={`/my-account/purchases/order/${order.id}`}
                >
                  Voir la commande
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default OrdersPage;
