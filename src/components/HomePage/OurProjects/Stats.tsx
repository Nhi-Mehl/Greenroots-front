import { useEffect, useState } from 'react';
import { IProject } from '../../../@types';
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
    <div className="w-screen font-semibold bg-beige 2xl:h-96">
      <h2 className="pt-6 bg-beige uppercase text-xl text-center md:text-xl 2xl:text-5xl ">
        Quelques chiffres
      </h2>
      <div className=" text-center flex flex-row justify-evenly ">
        <div className="m-auto flex flex-col justify-items-center gap-4">
          <h2 className="uppercase text-sm md:text-md 2xl:text-3xl">
            Projets réalisés
          </h2>
          <h3 className="text-center text-sm ">{finishProject}</h3>
        </div>
        <div className="m-auto flex flex-col justify-items-center gap-4 2xl:py-12">
          <h2 className=" uppercase text-sm md:text-md 2xl:text-3xl 2xl">
            Arbres plantés
          </h2>
          <h3 className=" text-center text-sm md:text-md">{finishTree}</h3>
        </div>
      </div>
    </div>
  );
}

export default Stats;
