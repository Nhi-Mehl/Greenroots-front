import { Link } from 'react-router-dom';
import { IOrder } from '../../../@types/Order';

/**
 * 🔹 Composant `OrderItem`
 * Affiche une **commande individuelle** avec ses informations détaillées.
 *
 */
function OrderItem({ order }: { order: IOrder }) {
  return (
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
  );
}
export default OrderItem;
