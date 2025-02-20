import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaLongArrowAltLeft } from 'react-icons/fa';

import { useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import {
  useGetAllUserOrdersQuery,
  useGetOrderLinesQuery,
} from '../../../store/features/order/orderApiSlice';
import { useGetProjectsByArrayIdsQuery } from '../../../store/features/project/projectApiSlice';
import Button from '../../Form/Button/Button';

/**
 * Composant OrderDetailsPage :
 * Ce composant affiche les détails d'une commande passée par un utilisateur.
 * Il récupère les informations de la commande, les lignes de commande associées,
 * et les projets liés à ces lignes grâce à RTK Query.
 */
function OrderDetailsPage() {
  const navigate = useNavigate();
  // Récupération de l'ID de la commande depuis l'URL (défini dans react-router)
  const { orderId } = useParams();
  // Convertit l'ID en nombre pour éviter les erreurs
  const numericOrderId = Number(orderId);
  // Récupérer l'utilisateur connecté de la store Redux
  const user = useAppSelector(selectCurrentUser);

  /**
   * Récupération de la commande spécifique de l'utilisateur connecté.
   * - `useGetAllUserOrdersQuery(user?.id)` récupère toutes les commandes de l'utilisateur connecté.
   * - `selectFromResult` filtre les commandes pour ne garder que celle correspondant à `orderId`.
   * - `skipToken` est utilisé pour éviter d'exécuter la requête si `user` est absent.
   */
  const {
    data: orderData,
    isLoading: isLoadingOrder,
    error: orderError,
  } = useGetAllUserOrdersQuery(user ? user.id : skipToken, {
    selectFromResult: ({ data, isLoading, error }) => ({
      data: data?.find((order) => order.id === numericOrderId),
      isLoading,
      error,
    }),
  });

  /**
   * Récupération des lignes de commande associées à la commande sélectionnée.
   * - La requête est exécutée uniquement si `numericOrderId` est valide (`skip: !numericOrderId`).
   */
  const {
    data: orderLines,
    isLoading: isLoadingLines,
    error: orderLinesError,
  } = useGetOrderLinesQuery(numericOrderId, {
    skip: !numericOrderId,
  });

  /**
   * Extraction des IDs des projets à partir des lignes de commande.
   * - Utilisation de `useMemo` pour optimiser la performance (évite les recalculs inutiles).
   * - Utilisation d'un `Set` pour supprimer les doublons.
   */
  const projectIds = useMemo(
    () =>
      orderLines?.length
        ? [...new Set(orderLines.map((line) => line.project_tree.project_id))]
        : [],
    [orderLines]
  );

  /**
   * Récupération des projets liés aux lignes de commande.
   * - La requête est ignorée si `projectIds` est vide (`skip: projectIds.length === 0`).
   */
  const {
    data: projects,
    isLoading: isLoadingProjects,
    error: projectsError,
  } = useGetProjectsByArrayIdsQuery(projectIds, {
    skip: projectIds.length === 0,
  });

  // Gestion des erreurs avec SweetAlert2
  if (orderError || orderLinesError || projectsError) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: "Une erreur s'est produite lors du chargement des détails de la commande.",
    });
  }

  // Skeleton Loader
  const isLoading = isLoadingOrder || isLoadingLines || isLoadingProjects;

  // Gestion des erreurs : si la commande n’existe pas, on affiche un message d’erreur clair
  if (!orderData) {
    Swal.fire({
      icon: 'warning',
      title: 'Commande introuvable',
      text: 'Aucune commande ne correspond à cet identifiant.',
    });
    return null;
  }

  return (
    <main className="p-4 min-h-screen">
      {/* 🔹 Bouton de retour à la page précédente */}
      <Button type="button" variant="default" onClick={() => navigate(-1)}>
        <FaLongArrowAltLeft />
      </Button>
      {/* Section Informations générales de la commande */}
      <section aria-labelledby="order-details" className="mt-10 text-center">
        <h1 className="h1-title font-bold mb-4">
          {isLoading ? (
            <Skeleton width={200} height={30} />
          ) : (
            `Commande numéro ${orderData?.id}`
          )}
        </h1>
        <h2 className="text-center mb-8">
          {isLoading ? (
            <Skeleton width={200} height={20} />
          ) : (
            'Date de la commande '
          )}
          <span className="block sm:inline">
            {isLoading ? (
              <Skeleton width={200} height={20} />
            ) : (
              orderData.createdAt &&
              new Date(orderData.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            )}
          </span>
        </h2>
      </section>

      {/* Liste des lignes de commande */}
      <section aria-labelledby="list-of-order-lines" className="space-y-8">
        {/* Titre de la section des lignes de commande seulement visible par screen reader */}
        <h2 id="list-of-order-lines" className="sr-only">
          Liste des lignes de commande de la commande numéro {orderData.id}
        </h2>
        {orderLines?.map((orderLine) => {
          const project = projects?.find(
            (p) => p.id === orderLine.project_tree.project_id
          );

          if (isLoading) {
            return (
              <div
                key={orderLine.id}
                className="shadow-md p-6 rounded-lg border border-gray-200 lg:mx-20"
              >
                <Skeleton height={30} />
              </div>
            );
          }

          return (
            <article
              key={orderLine.id}
              className="flex flex-col gap-2 items-center md:items-start shadow-md p-6 rounded-lg border border-gray-200 lg:mx-20"
              aria-labelledby={`project-${orderLine.id}`}
            >
              <h3
                id={`project-${orderLine.id}`}
                className="font-semibold h3-title"
              >
                {project?.name || 'Projet inconnu'}
              </h3>
              <p>
                <strong>Nom de l&apos;arbre :</strong>{' '}
                <span className="block sm:inline mt-1 sm:mt-0">
                  {orderLine.project_tree.species.name}
                </span>
              </p>
              <p>
                <strong>Montant Unitaire :</strong>{' '}
                {orderLine.project_tree.species.price} €
              </p>
              <div className="w-full flex flex-col gap-2 items-center md:flex-row md:justify-between">
                <p>
                  <strong>Quantité :</strong> {orderLine.quantity}
                </p>
                <p>
                  <strong>Montant Total :</strong> {orderLine.amount} €
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* Section Montant Total */}
      <section
        aria-labelledby="total-amount-all-orders"
        className="text-center lg:text-right font-bold my-8 lg:mr-20"
      >
        {isLoading ? (
          <Skeleton width={150} height={25} />
        ) : (
          `Montant Total de la commande : ${orderData?.amount}€`
        )}
      </section>
    </main>
  );
}

export default OrderDetailsPage;
