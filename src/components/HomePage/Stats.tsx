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
    <div className="w-screen h-40 font-semibold md:h-48 md:p-4 lg:h-72 lg:p-8 2xl:h-80">
      <h2 className="pt-8 uppercase h2-title text-center md:text-2xl lg:text-6xl 2xl:text-5xl ">
        Quelques chiffres
      </h2>
      <div className=" text-center flex flex-row justify-evenly ">
        <div className="m-auto p-3 flex flex-col justify-items-center gap-4">
          <h2 className="uppercase text-sm md:text-base lg:text-2xl 2xl:text-4xl">
            Projets réalisés
          </h2>
          <h3 className="text-center text-sm md:text-base lg:text-2xl 2xl:text-4xl ">
            {finishProject}
          </h3>
        </div>
        <div className="m-auto p-3 flex flex-col justify-items-center gap-4 2xl:py-12">
          <h2 className=" uppercase text-sm md:text-base lg:text-2xl 2xl:text-4xl">
            Arbres plantés
          </h2>
          <h3 className=" text-center text-sm md:text-base lg:text-2xl 2xl:text-4xl">
            {finishTree}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Stats;
