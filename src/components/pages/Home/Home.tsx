import Video from './Video/Video';
import OurProjects from './OurProjects/OurProjects';
import Stats from './Stats/Stats';
import TreesHighlights from './TreesHighlights/TreesHighlights';
import ThreeProjectsHome from './ThreeProjectsHome/ThreeProjectsHome';

/**
 * Page d'accueil du site.
 * Cette page regroupe différentes sections : statistiques, projets,
 * vidéo et mise en avant des arbres.
 */
function HomePage() {
  return (
    <main>
      <Stats />
      <OurProjects />
      <ThreeProjectsHome />
      <Video />
      <TreesHighlights />
    </main>
  );
}

export default HomePage;
