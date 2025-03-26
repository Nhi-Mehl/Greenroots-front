import { useGetCompletedProjectsQuery } from '../../../../store/features/project/projectApiSlice';
import { useGetPlantedTreesQuery } from '../../../../store/features/projectTree/projectTreeApiSlice';
import StatItem from './StatsItem';

/**
 * Composant Stats
 * ---------------------------
 * Ce composant affiche les statistiques des projets réalisés et des arbres plantés.
 * Il récupère ces données via RTK Query et gère leur affichage de manière réactive.
 * L'accessibilité et la mise en page responsive ont été prises en compte.
 */
function Stats() {
  // Récupération des données des projets réalisés et des arbres plantés via RTK Query
  const { data: finishProject, isLoading: isFinishProjectLoading } =
    useGetCompletedProjectsQuery();
  const { data: finishTree, isLoading: isFinishTreeLoading } =
    useGetPlantedTreesQuery();

  // Détermine si une des requêtes est en cours de chargement
  const isLoading = isFinishProjectLoading || isFinishTreeLoading;

  return (
    <section
      aria-labelledby="stats-section"
      className="w-screen h-40 pt-6 lg:pt-10 uppercase md:h-48 lg:h-80"
    >
      {/* Titre principal de la section, caché pour les lecteurs d'écran */}
      <h2
        aria-labelledby="stats-title"
        className="h2-title text-center md:text-4xl lg:text-5xl text-blue-500"
      >
        Quelques chiffres
      </h2>

      {/* Conteneur des statistiques */}
      <div className="flex gap-10 sm:gap-24 md:gap-40 lg:gap-60 justify-center">
        <StatItem
          title="Projets réalisés"
          value={finishProject}
          isLoading={isLoading}
        />
        <StatItem
          title="Arbres plantés"
          value={finishTree}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}

export default Stats;
