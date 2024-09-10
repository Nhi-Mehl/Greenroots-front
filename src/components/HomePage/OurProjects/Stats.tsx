import { useEffect, useState } from 'react';
import { IProject } from '../../../@types';

function Stats() {
  const [finishProject, setFinishProject] = useState(0);
  const [finishTree, setFinishTree] = useState(0);

  useEffect(() => {
    const dataFinishProjet = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/project_trees');
        const projectResponse = await fetch(
          'http://localhost:3000/api/projects'
        );
        const data = await response.json();
        const projectData = await projectResponse.json();

        const projectFinish = projectData.filter(
          (project: IProject[]) => project.status === 'Terminé'
        );
        setFinishProject(projectFinish.length);

        const totalBasicQuantity = data.reduce(
          (acc, item) => acc + item.basic_quantity,
          0
        );
        const totalCurrentQuantity = data.reduce(
          (acc, item) => acc + item.current_quantity,
          0
        );
        const totalTreePlanted = totalBasicQuantity - totalCurrentQuantity;

        setFinishTree(totalTreePlanted);
      } catch (error) {
        console.error('erreur erreur');
      }
    };
    dataFinishProjet();
  }, []);

  return (
    <div className="p-10">
      <h1 className="w-full text-center text-lg font-bold ">
        QUELQUES CHIFFRES
      </h1>
      <div className="flex flex-row justify-around w-full h-48">
        <div className="p-10">
          <h2 className="text-center text-sm font-bold lg:text-2xl">
            PROJETS DÉJÀ REALISÉ
          </h2>
          <h3 className="p-10 text-center text-sm font-bold lg:text-5xl">
            {finishProject}
          </h3>
        </div>
        <div className="p-10">
          <h2 className="text-center text-sm font-bold">ARBRES DÉJÀ PLANTÉS</h2>
          <h3 className=" p-10 text-center text-sm font-bold lg:text-5xl">
            {finishTree}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Stats;
