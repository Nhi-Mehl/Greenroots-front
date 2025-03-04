import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import createSlug from '../../../../utils/slug';
import Button from '../../../Form/Button/Button';
import { useGetTreesHighlightsQuery } from '../../../../store/features/projectTree/projectTreeApiSlice';
import { ThreeMostBoughtTreesResponse } from '../../../../@types/ProjectTree';

/**
 * Composant TreesHighlights
 *
 * Affiche les trois arbres les plus populaires. Si `isLoading` est vrai,
 * des Skeletons sont affichés pour un rendu fluide.
 *
 * Chargement optimisé des images avec `loading="lazy"`.
 */
function TreesHighlights() {
  const navigate = useNavigate();
  // Récupération des arbres les plus populaires depuis l'API via RTK Query
  const { data: treesHighlights, isLoading } = useGetTreesHighlightsQuery();

  // Fonction pour naviguer vers la page de détails de l'arbre le plus populaire
  const handleDetailTree = (tree: ThreeMostBoughtTreesResponse) => {
    const projectName = tree.name;
    const slug = createSlug(projectName);
    navigate(`/projects/${tree.project_id}/${slug}`, {
      state: { tree, projectName },
    });
  };

  return (
    <section aria-labelledby="trois arbres les plus populaires">
      <h1 className="h1-title text-center mt-10 lg:text-5xl lg:mt-24">
        Nos arbres les plus populaires
      </h1>
      <div className="lg:flex md:gap-4">
        {treesHighlights?.map((tree) => (
          <article
            key={tree.id}
            className={`flex flex-col items-center justify-between gap-4 w-5/6 min-h-[400px] m-auto my-20 bg-beige ${isLoading && 'bg-gray-300'} shadow-lg sm:max-w-sm md:max-w-1/3 lg:mt-24`}
          >
            {isLoading ? (
              <Skeleton key={tree.id} />
            ) : (
              <>
                <img
                  className="w-full h-[200px] lg:h-[250px] object-cover"
                  src={`/images/species/${tree.picture}.webp`}
                  alt={tree.tree_name}
                />
                <h2 className="h2-title">{tree.tree_name}</h2>
                <p className="px-10 text-justify">{tree.description}</p>
                <Button
                  className="mb-8"
                  variant="default"
                  type="button"
                  onClick={() => handleDetailTree(tree)}
                >
                  Planter
                </Button>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default TreesHighlights;
