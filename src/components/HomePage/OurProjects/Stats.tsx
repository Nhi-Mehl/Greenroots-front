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
        console.log(projectFinish);
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
    <div className="p-10 bg-gradient-to-r from-emerald-400 to-blue-500">
      <h1 className="w-full text-center text-6xl font-bold">
        QUELQUES CHIFFRES
      </h1>
      <div className="flex flex-row justify-around w-full h-56">
        <div className="p-10">
          <h2 className="text-center text-2xl font-bold">
            NOMBRE DE PROJETS DÉJÀ REALISÉ
          </h2>
          <h3 className="p-10 text-center text-5xl font-bold">
            {finishProject}
          </h3>
        </div>
        <div className="p-10">
          <h2 className="text-center text-2xl font-bold">
            NOMBRE D&apos;ARBRES DÉJÀ PLANTÉS
          </h2>
          <h3 className=" p-10 text-center text-5xl font-bold">{finishTree}</h3>
        </div>
      </div>
    </div>
  );
}

export default Stats;
