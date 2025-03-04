import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { IProject } from '../../../../@types/Project';
import createSlug from '../../../../utils/slug';
import Button from '../../../Form/Button/Button';

/**
 * Composant ProjectHome
 *
 * Affiche un projet avec ses détails et une image.
 * Si `isProjectsLoading` est vrai, un Skeleton est affiché pour un rendu fluide.
 * Utilisation de `loading="lazy"` pour optimiser le chargement des images.
 */
interface ProjectProps {
  project: IProject;
  index: number;
  isProjectsLoading: boolean;
}

function ProjectHome({ project, index, isProjectsLoading }: ProjectProps) {
  // Hook de navigation pour rediriger vers la page du projet
  const navigate = useNavigate();

  // Redirige vers la page du projet au clic sur le bouton En savoir plus
  const handleClickProjet = () => {
    const slug = createSlug(project.name);
    navigate(`/projects/${project.id}/${slug}`);
  };

  const isEven = index % 2 === 0;

  return (
    <article
      className={`${isProjectsLoading && 'bg-gray-300 border-none'} ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex w-5/6 h-[590px] lg:h-[500px] border-greenRegular bg-beige border-4 lg:mt-10`}
    >
      {isProjectsLoading ? (
        <Skeleton />
      ) : (
        <>
          <img
            className="w-full lg:w-1/2 h-[200px] sm:h-[320px] lg:h-full object-cover"
            src={`/images/projets/${project.picture}.jpg`}
            alt={`Projet ${project.name}`}
            loading="lazy"
          />

          <div
            className={`flex flex-col justify-center gap-4 lg:top-10 lg:w-1/2 pt-6 lg:pt-8 ${isEven ? 'lg:right-0' : 'lg:left-0'}`}
          >
            <h2 className="text-center h3-title lg:text-4xl">
              {project.country}, {project.city}
            </h2>
            <p className="text-sm text-justify px-3 lg:px-10 lg:pt-4 lg:text-lg ">
              {project.description}
            </p>
            <Button
              className="mx-auto mt-4 lg:mt-10"
              variant="default"
              type="button"
              onClick={handleClickProjet}
            >
              En savoir plus
            </Button>
          </div>
        </>
      )}
    </article>
  );
}

export default ProjectHome;
