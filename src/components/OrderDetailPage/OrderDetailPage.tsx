import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { IOrder, IOrderLine } from '../../@types';
import { useUser } from '../../context/UserContext';
import api from '../../api';
import { useProject } from '../../context/ProjectContext';

interface IOrderWithDate extends IOrder {
  createdAt: string;
}

function OrderDetailPage() {
  const { orderId } = useParams();
  const [orderLines, setOrderLines] = useState<IOrderLine[]>([]);
  const [orderDetails, setOrderDetails] = useState<IOrderWithDate | null>(null);
  const { project } = useProject();
  console.log('project', project);

  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    console.log(user);

    // Récupération des lignes de commande
    const fetchOrderLines = async () => {
      try {
        // Récupération des détails de la commande
        const orderResponse = await api.get(`/orders/${user.id}`);
        console.log(orderResponse);
        setOrderDetails(orderResponse.data);

        const orders = orderResponse.data;

        orders.forEach(async (order: IOrder) => {
          const orderLinesResponse = await api.get(`/order_line/${order.id}`);
          setOrderLines(orderLinesResponse.data);
          console.log(orderLinesResponse);
        });
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des détails de la commande'
        );
      }
    };
    fetchOrderLines();
  }, [user, orderId]);

  console.log('orders', orderDetails);
  
  const orderLineId = orderLines.forEach((orderLine) => orderLine.order_id;

  const orderWithId = orderDetails.find(
    (order: IOrderWithDate) =>
      order.id === orderLineId)
  );

  return (
    <div className="m-10">
      {/* {orderDetails?.map((order: IOrderWithDate) => (
        <div key={order.id}>
          <h1 className="text-center text-xl font-bold mb-4">
            Commande numéro {order.id}
          </h1>
          <p className="text-center mb-8">
            Date de la commande :{' '}
            {new Date(order.createdAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      ))} */}

      <div className="space-y-8">
        {orderLines.map((orderLine) => (
          <div
            key={orderLine.id}
            className="bg-gray-200 p-4 rounded-md shadow-md"
          >
            <p className="mb-2">
              <strong>Nom du projet :</strong> {project?.name}
            </p>
            <p className="mb-2">
              <strong>Nom de l'arbre :</strong> {orderLine.project_tree_id}
            </p>
            <p className="mb-2">
              <strong>Montant Unitaire :</strong> {orderLine.amount} €
            </p>
            <div className="flex justify-between">
              <p>orderLine.order_
                <strong>Quantité :</strong> {orderLine.quantity}
              </p>
              <p>
                <strong>Montant Total :</strong> {orderLine.amount} €
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-right font-bold mt-8">
        Montant Total de la commande :
        {orderDetails?.amount || 'Montant indisponible'} €
      </p>
    </div>
  );
}

export default OrderDetailPage;
