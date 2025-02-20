import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { addToCart } from '../../../store/features/cart/cartSlice';
import { useAppDispatch } from '../../../store/hooks';
import Button from '../../Form/Button/Button';
import { useGetProjectByIdQuery } from '../../../store/features/project/projectApiSlice';
import { useGetProjectTreesByProjectIdQuery } from '../../../store/features/projectTree/projectTreeApiSlice';
import { IProjectTreeSpecies } from '../../../@types/ProjectTree';

/**
 * Génère un slug à partir d'un nom donné.
 * @param name Nom à convertir en slug.
 * @returns Slug formaté.
 */
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

function ProjectDetailsPage() {
  const dispatch = useAppDispatch();
  // Récupération de l'ID du projet depuis l'URL (défini dans react-router)
  const { projectId } = useParams();
  // Convertit l'ID en nombre
  const numderProjectId = Number(projectId);

  // Récupérer un projet selon son id avec RTK Query
  const {
    data: project,
    isError: isProjectError,
    error: projectError,
    isLoading: projectLoading,
  } = useGetProjectByIdQuery(numderProjectId, { skip: !numderProjectId });

  // Récupérer les arbres, totalBasicQuantity et progress  d'un projet selon son id avec RTK Query
  const {
    data: projectTrees,
    isError: isTreesError,
    error: treesError,
    isLoading: treesLoading,
  } = useGetProjectTreesByProjectIdQuery(numderProjectId, {
    skip: !numderProjectId,
  });

  // Vérifie si les données sont en cours de chargement
  const isDataLoading = projectLoading || treesLoading;

  // Vérifie s'il y a une erreur lors de la récupération des données
  if (projectError || isProjectError || isTreesError || treesError) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Impossible de charger les données.',
    });
    return null;
  }

  // Fonction pour ajouter un arbre au panier
  const handleAddToCart = (tree: IProjectTreeSpecies) => {
    if (!addToCart) return;

    // Récupère le nom du projet
    const projectName = project.name;
    // Ajoute l'arbre au panier
    dispatch(addToCart({ tree, projectName }));

    // Affiche une notification de succès
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ajouter au panier',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Vérifie si le projet ou les arbres n'existent pas
  if (!project || !projectTrees) {
    Swal.fire({
      icon: 'warning',
      title: 'Projet introuvable',
      text: "Le projet que vous cherchez n'existe pas.",
    });
    return null;
  }

  return (
    <main>
      {/* Section du projet */}
      <section className="bg-greenLight text-white h-76 max-w-max p-2 m-4 md:m-8 md:p-8">
        <h2 className="h2-title p-4 text-center">
          {isDataLoading ? <Skeleton width={300} height={30} /> : `Objectif :`}
          <span className="block sm:inline">
            {isDataLoading ? (
              <Skeleton width={200} height={30} />
            ) : (
              ` ${projectTrees.totalBasicQuantity} arbres`
            )}
          </span>
        </h2>
        <p className="p-4 text-sm text-justify lg:px-20 lg:text-xl">
          {isDataLoading ? (
            <Skeleton width={1600} height={100} />
          ) : (
            project?.description
          )}
        </p>
      </section>

      {/* Section des arbres des projets */}
      <section className="mx-auto mt-10 mb-16 flex flex-col items-center gap-8 lg:gap-12 2xl:gap-24 lg:flex-row lg:justify-center lg:flex-wrap">
        {projectTrees.trees.map((tree) =>
          isDataLoading ? (
            <Skeleton key={tree?.id} width={400} height={500} />
          ) : (
            <article
              key={tree?.id}
              className="w-4/5 lg:w-1/4 h-full flex flex-col justify-between  bg-orange-50 shadow-lg "
            >
              <Link
                to={`/tree/${tree.id}/${createSlug(tree.species.name)}`}
                state={{ tree, projectName: project.name }}
              >
                <img
                  className="w-full h-72 object-cover"
                  src={`/images/species/${tree.species.picture}.webp`}
                  alt={`Illustration de ${tree.species.name}`}
                />

                <h3 className="h3-title text-center mt-4">
                  {tree.species.name}
                </h3>
                <p className="text-xl md:text-2xl text-center">
                  {tree.species.price} €
                </p>

                {/* Ajoute e.preventDefault() au bouton "Ajouter au panier" pour éviter que le clic ne déclenche aussi la navigation. */}
                <Button
                  type="button"
                  variant="default"
                  className="my-8 mx-auto block"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(tree);
                  }}
                >
                  Ajouter au panier
                </Button>
              </Link>
            </article>
          )
        )}
      </section>
    </main>
  );
}
export default ProjectDetailsPage;
