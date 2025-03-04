import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import createSlug from '../../../../utils/slug';
import { IProjectTreeSpecies } from '../../../../@types/ProjectTree';
import { useGetAllProjectsQuery } from '../../../../store/features/project/projectApiSlice';
import { useGetprojectTreesByArrayProjectIdQuery } from '../../../../store/features/projectTree/projectTreeApiSlice';

/**
 * Composant ProjectList - Affiche une liste de projets avec leur progression.
 */
function ProjectList() {
  /**
   * Récupération des projets avec RTK Query.
   */
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetAllProjectsQuery();

  // Extraction des IDs des projets pour récupérer leurs données associées.
  const projectIds = projects?.map((project) => project.id) || [];

  /**
   * Récupération des arbres des projets avec RTK Query.
   */
  const {
    data: projectTreesData,
    isLoading: istTreesLoading,
    isError: isTreesError,
  } = useGetprojectTreesByArrayProjectIdQuery(projectIds, {
    skip: projectIds.length === 0,
  });

  /**
   * Fonction permettant de récupérer les données d'un projet spécifique.
   * @param {number} projectId - ID du projet.
   * @returns {{ progress: number, totalCurrentQuantity: number } | null} - Données du projet ou null si non trouvé.
   */
  const getProjectData = (
    projectId: number
  ): { progress: number; totalCurrentQuantity: number } | null => {
    const projectTree = projectTreesData?.find((treeData) =>
      treeData.trees.some(
        (tree: IProjectTreeSpecies) => tree.project_id === projectId
      )
    );

    return projectTree
      ? {
          progress: projectTree.progress,
          totalCurrentQuantity: projectTree.totalCurrentQuantity,
        }
      : null;
  };

  // Détermine si les données sont en cours de chargement
  const isLoading = isProjectsLoading || istTreesLoading;

  /**
   * Affichage d'une alerte en cas d'erreur de chargement des données.
   */
  if (isProjectsError || isTreesError) {
    return (
      <p className="text-red-500">
        Une erreur s&apos;est produite lors du chargement des projets.
      </p>
    );
  }

  /**
   * Fonction utilitaire pour tronquer une description.
   * @param {string} description - Texte à tronquer.
   * @param {number} limit - Nombre de caractères maximum.
   * @returns {string} - Description tronquée.
   */
  const truncateDescription = (description: string, limit: number): string =>
    description.length > limit
      ? `${description.substring(0, limit)}...`
      : description;

  const DESCRIPTION_LIMIT = 80;

  return (
    <section
      className="p-8 flex flex-col gap-16 justify-center lg:p-16 lg:flex-row lg:flex-wrap md:flex-col"
      aria-labelledby="project-list-title"
    >
      <h1 id="project-list-title" className="sr-only">
        Liste des projets
      </h1>

      {/* Liste des projets */}
      {projects?.map((project) => {
        return isLoading ? (
          <Skeleton key={project.id} height={500} width={500} />
        ) : (
          <article
            key={project.id}
            className="lg:max-w-[402px] bg-beige shadow-lg"
            aria-labelledby={`project-title-${project.id}`}
          >
            <figure>
              <img
                className="w-full h-60 object-cover"
                src={`images/projets/${project.picture}.jpg`}
                alt={`Illustration du projet ${project.name}`}
              />
              <figcaption className="sr-only">
                Illustration du projet {project.name}
              </figcaption>
            </figure>
            <div className="p-6 flex flex-col gap-6 justify-between ">
              <h2 className="font-montserrat text-xl font-bold text-center lg:text-2xl">
                {project.name} - {project.country}
              </h2>

              {/* Barre de progression de chaque projet */}
              <div className="w-full space-y-2">
                <p className="flex items-center justify-between font-sans text-base font-semibold text-slate-800 antialiased">
                  <span>arbres financés</span>
                  <span>{getProjectData(project.id)?.progress} %</span>
                </p>
                <div className="block h-4 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-none bg-greenRegular"
                    style={{
                      width: `${getProjectData(project.id)?.progress}%`,
                    }}
                  />
                </div>
              </div>

              <p className="font-bold">
                {getProjectData(project.id)?.totalCurrentQuantity} arbres
                disponibles pour planter
              </p>

              <p className="text-justify">
                {truncateDescription(project.description, DESCRIPTION_LIMIT)}
              </p>
              {/* Lien vers le projet */}
              <Link
                to={`/projects/${project.id}/${createSlug(project.name)}`}
                className="font-bold underline"
                aria-label={`Suivre le projet ${project.name}`}
              >
                Suivre ce projet
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default ProjectList;
