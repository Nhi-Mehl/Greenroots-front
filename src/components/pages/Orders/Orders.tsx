import { skipToken } from '@reduxjs/toolkit/query/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import OrderItem from './OrderItem';
import { useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useGetAllUserOrdersQuery } from '../../../store/features/order/orderApiSlice';

/**
 * 🔹 Page `OrdersPage`
 * Cette page affiche toutes les **commandes passées par l'utilisateur connecté**.
 *
 * - Si les commandes sont en cours de chargement, on affiche le Skeleton
 * - Si l'utilisateur n'a pas encore de commandes, un message explicatif est affiché
 * - Si des commandes existent, elles sont listées via `OrderItem`
 */
function OrdersPage() {
  // Récupérer l'utilisateur connecté de la store Redux
  const user = useAppSelector(selectCurrentUser);

  // Requête RTK Query pour récupérer les commandes de l'utilisateur connecté
  const { data: orders, isLoading: isLoadingOrders } = useGetAllUserOrdersQuery(
    user ? user?.id : skipToken
  );

  return (
    <main className="max-w-7xl mx-auto p-10 min-h-screen">
      {/* 🔹 Titre principal de la page */}
      <h1 className="text-center h2-title mt-10">
        {isLoadingOrders ? (
          <Skeleton width={300} height={30} />
        ) : (
          'Mes commandes'
        )}
      </h1>

      {/* 🔹 Message si l'utilisateur n'a pas encore de commandes */}
      {orders?.length === 0 && !isLoadingOrders && (
        <p className="text-center mt-4">
          Vous n&apos;avez pas encore de commandes chez Greenroots.
        </p>
      )}

      {/* 🔹 Liste des commandes existantes */}
      {orders && orders?.length > 0 && (
        <ul className="mt-16 space-y-4">
          {orders?.map((order) =>
            isLoadingOrders ? (
              // 🟢 Gestion du chargement avec un Skeleton UI
              <li
                key={order.id}
                className="shadow-md p-6 rounded-lg border border-gray-200"
              >
                <Skeleton height={20} />
              </li>
            ) : (
              <OrderItem key={order.id} order={order} />
            )
          )}
        </ul>
      )}
    </main>
  );
}

export default OrdersPage;
