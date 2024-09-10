import './OurProjects.css';

function OurProjects() {
  return (
    <section>
      <div className="h-128">
        <img className='absolute h-128 object-cover w-screen bg-opacity-100' src="../../../../../public/images/bg-our-projetcs-home.jpg" alt="" />
        <div className='absolute flex flex-col justify-center text-white text-center'>
        <h2 className=" h2-title mt-2">NOS PROJETS</h2>
        <p className="text-3xl font-semibold text leading-relaxed mt-8 mx-2">
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
      </div>
    </section>
  );
}

export default OurProjects;
