import { useEffect, useState } from 'react';
import axios from 'axios';

function Stats() {
  const [finishProject, setFinishProject] = useState(0);
  const [finishTree, setFinishTree] = useState(0);

  useEffect(() => {
    const dataFinishProjet = async () => {
      try {
        const responseProjectFinish = await axios.get(
          'http://localhost:3000/api/projects/completed'
        );
        const responseTreePlanted = await axios.get(
          'http://localhost:3000/api/project_trees/planted'
        );

        setFinishProject(responseProjectFinish.data);

        setFinishTree(responseTreePlanted.data);
      } catch (error) {
        console.error('erreur erreur');
      }
    };
    dataFinishProjet();
  }, []);

  return (
    <div className="w-screen h-40 pt-6 lg:pt-1 uppercase md:h-48 lg:h-80">
      <h2 className="h2-title text-center md:text-4xl lg:text-6xl 2xl:text-5xl ">
        Quelques chiffres
      </h2>
      <div className="flex gap-10 sm:gap-24 md:gap-40 lg:gap-60 justify-center">
        <div className="mt-4 lg:mt-16">
          <h2 className="text-sm sm:text-xl md:text-2xl lg:text-4xl">
            Projets réalisés
          </h2>
          <h3 className="text-center text-2xl mt-4 md:text-3xl lg:text-5xl">
            {finishProject}
          </h3>
        </div>
        <div className="mt-4 lg:mt-16">
          <h2 className="text-sm sm:text-xl md:text-2xl lg:text-4xl">
            Arbres plantés
          </h2>
          <h3 className="text-center text-2xl mt-4 md:text-3xl lg:text-5xl">
            {finishTree}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Stats;
