import Banner from '../Header/Banner/Banner';
import OurProjects from './OurProjects/OurProjects';
import Projects from './OurProjects/Projects';
import Stats from './OurProjects/Stats';

function HomePage() {
  return (
    <main>
      <Banner />

      <OurProjects />
      <Projects />
    </main>
  );
}

export default HomePage;
