import Video from '../Video/Video';
import OurProjects from './OurProjects/OurProjects';
import Projects from './OurProjects/Projects';
import Stats from './OurProjects/Stats';

function HomePage() {
  return (
    <main>
      <Stats />
      <OurProjects />
      <Projects />
      <Video />
    </main>
  );
}

export default HomePage;
