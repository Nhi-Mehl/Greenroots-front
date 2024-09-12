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
    <div className="w-screen font-semibold bg-beige">
      <h2 className="pt-12 bg-beige uppercase text-3xl text-center ">
        Quelques chiffres
      </h2>
      <div className=" text-center flex flex-row justify-evenly h-60 ">
        <div className="m-auto flex flex-col justify-items-center gap-6">
          <h2 className="uppercase text-2xl ">Projets réalisés</h2>
          <h3 className="text-center text-5xl ">{finishProject}</h3>
        </div>
        <div className="m-auto flex flex-col justify-items-center gap-6">
          <h2 className=" uppercase text-2xl ">Arbres plantés</h2>
          <h3 className=" text-center text-5xl ">{finishTree}</h3>
        </div>
      </div>
    </div>
  );
}

export default Stats;
