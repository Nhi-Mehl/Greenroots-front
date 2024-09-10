import './OurProjects.css';

function OurProjects() {
  return (
    <section>
      <div className="w-full bg-image p-10">
        <h2 className="text-3xl text-white text-center">NOS PROJETS</h2>
        <p
          className="text-sm text-white text-center leading-5
         mt-8 px-38"
        >
          Chez GreenRoots, nous croyons que la reforestation est un enjeu
          mondial qui necessite des actions locales à travers le monde. C’est
          pourquoi nous avons lancé des projets internationaux dans plusieurs
          régions, chacun visant à restaurer des écosystèmes uniques, protéger
          la biodiversité et soutenir les communautés locales. De l’Amérique du
          Sud à l’Afrique en passant par l’Asie, découvrez comment, ensemble,
          nous faisons grandir des forêts qui feront la différence pour les
          générations à venir.
        </p>
        {/* <img src={bgOurProjects} alt="background nos projects section" /> */}
      </div>
    </section>
  );
}

export default OurProjects;
