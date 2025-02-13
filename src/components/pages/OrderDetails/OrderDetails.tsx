import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';

import { useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import {
  useGetAllUserOrdersQuery,
  useGetOrderLinesQuery,
} from '../../../store/features/order/orderApiSlice';
import { useGetProjectsByIdsQuery } from '../../../store/features/project/projectApiSlice';

function OrderDetailsPage() {
  const { orderId } = useParams();
  console.log('orderId', orderId);

  // Récupérer l'utilisateur connecté de la store Redux
  const user = useAppSelector(selectCurrentUser);
  console.log('user', user);

  //  Récupéré la commande correspondant à l'id de la route de l'utilisateur connecté
  const { data: orderData } = useGetAllUserOrdersQuery(
    user ? user.id : skipToken,
    {
      selectFromResult: (result) => ({
        data: result?.data?.find((order) => order.id === Number(orderId)),
      }),
    }
  );

  console.log('orderData', orderData);

  const { data: orderLines } = useGetOrderLinesQuery(Number(orderId));

  console.log('orderLines', orderLines);
  // Récupération des projets associés à chaque ligne de commande
  const projectIds = useMemo(
    () =>
      orderLines
        ? [...new Set(orderLines.map((line) => line.project_tree.project_id))]
        : [],
    [orderLines]
  );

  console.log('projectIds', projectIds);

  const { data: projects } = useGetProjectsByIdsQuery(projectIds);

  console.log('projects', projects);

  return (
    <div className="m-10">
      <div>
        <h1 className="text-center text-xl font-bold mb-4">
          Commande numéro {orderData?.id}
        </h1>
        <p className="text-center mb-8">
          Date de la commande :{' '}
          {orderData &&
            orderData.createdAt &&
            new Date(orderData.createdAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
        </p>
      </div>

      <div className="space-y-8">
        {orderLines &&
          orderLines.map((orderLine) => (
            <div
              key={orderLine.id}
              className="shadow-md p-6 rounded-lg border border-gray-200"
            >
              <p className="mb-2">
                <strong>Nom du projet :</strong>{' '}
                {
                  projects?.filter((project) => {
                    return project.id === orderLine.project_tree.project_id;
                  })[0]?.name
                }
              </p>
              <p className="mb-2">
                <strong>Nom de l&apos;arbre :</strong>{' '}
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

      <p className="text-right font-bold mt-8">
        Montant Total de la commande : {orderData?.amount}€
      </p>
    </div>
  );
}

export default OrderDetailsPage;
