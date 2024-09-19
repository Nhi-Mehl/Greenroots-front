import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  IOrder,
  IOrderLine,
  IProject,
  IProjectTree,
  ISpecies,
} from '../../@types';
import { useUser } from '../../context/UserContext';
// import { useProject } from '../../context/ProjectContext';
import api from '../../api';

interface IOrderWithDate extends IOrder {
  createdAt: string;
}
interface IProjectTreesWithSpecies extends IProjectTree {
  species: ISpecies;
}

interface MixOrderLinesProps extends IOrderLine {
  project_tree: IProjectTreesWithSpecies;
}

function OrderDetailPage() {
  const { orderId } = useParams();
  console.log('orderId', orderId);

  const [orderLines, setOrderLines] = useState<MixOrderLinesProps[]>([]);
  const [orders, setOrders] = useState<IOrderWithDate[]>([]);

  // const { project } = useProject();

  const [project, setProject] = useState<IProject | null>(null);
  console.log('project', project);

  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const getOrderLines = async () => {
      try {
        const responseOrderLines = await api.get(`/order_line/${orderId}`);

        console.log('responseOrderLines', responseOrderLines.data);

        if (responseOrderLines.status === 200) {
          setOrderLines(responseOrderLines.data);
        }

        const responseOrders = await api.get(`/orders/${user.id}`);
        console.log('responseOrders', responseOrders.data);

        if (responseOrders.status === 200) {
          setOrders(responseOrders.data);
        }

        orderLines.forEach(async (line) => {
          const responseProject = await api.get(
            `/projects/${line.project_tree.project_id}`
          );

          console.log('reponseProject', responseProject.data);

          if (responseProject.status === 200) {
            setProject(responseProject.data);
          }
        });
      } catch (error: import('axios').AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data.message);
        }
      }
    };
    getOrderLines();
  }, [user, orderId]);

  const matchingOrders = orders?.filter((order: IOrderWithDate) =>
    orderLines.some((line) => line.order_id === order.id)
  );

  return (
    <div className="m-10">
      {matchingOrders?.map((order) => (
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
      ))}

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
              <strong>Nom de l'arbre :</strong>{' '}
              {orderLine.project_tree.species.name}
            </p>
            <p className="mb-2">
              <strong>Montant Unitaire :</strong>{' '}
              {orderLine.project_tree.species.price} €
            </p>
            <div className="flex justify-between">
              <p>
                <strong>Quantité :</strong> {orderLine.quantity}
              </p>
              <p>
                <strong>Montant Total :</strong> {orderLine.amount} €
              </p>
            </div>
          </div>
        ))}
      </div>

      {matchingOrders.map((order: IOrderWithDate) => (
        <p key={order.id} className="text-right font-bold mt-8">
          Montant Total de la commande :{' '}
          {order.amount || 'Montant indisponible'}€
        </p>
      ))}
    </div>
  );
}

export default OrderDetailPage;
