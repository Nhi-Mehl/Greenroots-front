import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useAppDispatch } from '../../../store/hooks';
import Button from '../../Form/Button/Button';
import { useGetProjectByIdQuery } from '../../../store/features/project/projectApiSlice';
import { useGetProjectTreesByProjectIdQuery } from '../../../store/features/projectTree/projectTreeApiSlice';
import createSlug from '../../../utils/slug';
import { setProject } from '../../../store/features/project/projectSlice';
import handleAddToCart from '../../../utils/addToCart';

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

  // Définir le projet dans le store Redux si le projet existe
  if (project) {
    dispatch(setProject(project));
  }

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
    return (
      <p className="text-red-500">
        Une erreur s&apos;est produite lors du chargement des données.
      </p>
    );
  }
  // Vérifie si le projet ou les arbres n'existent pas
  if (!project || !projectTrees) {
    return (
      <p className="text-red-500">
        Le projet ou les arbres n&apos;existent pas.
      </p>
    );
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
            <Skeleton key={tree.id} width={400} height={500} />
          ) : (
            <article
              key={tree?.id}
              className="w-4/5 lg:w-1/4 lg:h-[520px] flex flex-col justify-between bg-orange-50 shadow-lg "
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
                    handleAddToCart(tree, project.name, dispatch);
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
