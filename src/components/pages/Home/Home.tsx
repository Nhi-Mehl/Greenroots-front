import Video from './Video';
import OurProjects from './OurProjects/OurProjects';
import Projects from './OurProjects/Projects';
import Stats from './Stats';
import TreesHighlights from './TreesHighlights';

function HomePage() {
  return (
    <main>
      <Stats />
      <OurProjects />
      <Projects />
      <Video />
      <TreesHighlights />
    </main>
  );
}

export default HomePage;
