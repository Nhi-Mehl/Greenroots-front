import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  IOrder,
  IOrderLine,
  IProject,
  IProjectTree,
  ISpecies,
} from '../../../@types';
// import { useProject } from '../../context/ProjectContext';
import api from '../../../store/api';
import { useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';

interface IOrderWithDate extends IOrder {
  createdAt: string;
}
interface IProjectTreesWithSpecies extends IProjectTree {
  species: ISpecies;
}

interface MixOrderLinesProps extends IOrderLine {
  project_tree: IProjectTreesWithSpecies;
}

function OrderDetailsPage() {
  const { orderId } = useParams();
  console.log('orderId', orderId);

  const [orderLines, setOrderLines] = useState<MixOrderLinesProps[]>([]);
  const [orders, setOrders] = useState<IOrderWithDate[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  console.log('projects', projects);

  const user = useAppSelector(selectCurrentUser);
  console.log('user', user);

  useEffect(() => {
    if (!user) {
      return;
    }

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
      } catch (error: import('axios').AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data.message);
        }
      }
    };

    getOrderLines();
  }, [user, orderId]);

  useEffect(() => {
    const GetProjects = async () => {
      try {
        const responseProjects = await Promise.all(
          orderLines.map((line) =>
            api.get(`/projects/${line.project_tree.project_id}`)
          )
        );

        console.log('responseProjects', responseProjects);

        const projectsData = responseProjects
          .filter((project) => project.status === 200)
          .map((project) => project.data);
        console.log('projectsData', projectsData);

        setProjects(projectsData);
      } catch (error: import('axios').AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            'Erreur lors de la récupération des données du projet:',
            error?.response?.data.message
          );
        }
      }
    };

    if (orderLines.length > 0) {
      GetProjects();
    }
  }, [orderLines]);

  const matchingOrders = orders?.filter((order: IOrderWithDate) =>
    orderLines.some((line) => line.order_id === order.id)
  );

  console.log('matchingOrders', matchingOrders);

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
              <strong>Nom du projet :</strong>{' '}
              {
                projects.filter((project) => {
                  return project.id === orderLine.project_tree.project_id;
                })[0]?.name
              }
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
          Montant Total de la commande : {order.amount}€
        </p>
      ))}
    </div>
  );
}

export default OrderDetailsPage;
