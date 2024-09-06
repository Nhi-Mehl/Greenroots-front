import { useState } from 'react';

function Stats() {
  const [finishProject, setFinishProject] = useState(0);
  const [finishTree, setFinishTree] = useState(0);

  const dataFinishProjet = fetch('http://localhost:3000/api/');

  return (
    <div>
      <h1 className="w-full text-center text-6xl font-bold">
        QUELQUES CHIFFRES
      </h1>
      <div>
        <h2>NOMBRE DE PROJETS DÉJÀ REALISÉ</h2>
        <h3></h3>
      </div>
      <div>
        <h2>NOMBRE D&apos;ARBRES DÉJÀ PLANTÉS</h2>
        <h3></h3>
      </div>
    </div>
  );
}

export default Stats;
