import './OurProjects.css';

function OurProjects() {
  return (
    <section className="relative h-[350px] sm:h-[250px] md:h-[320px] lg:h-[500px]">
      <img
        className="h-full w-full object-cover"
        src="/images/bg-our-projetcs-home.jpg"
        alt="backgroud plantation"
      />
      <div className="absolute top-0 flex flex-col justify-center text-white pt-10 lg:pt-16">
        <h2 className="mb-4 lg:mb-14 text-center h2-title font-semibold text-white md:text-4xl lg:text-6xl">
          NOS PROJETS
        </h2>
        <p className="text-sm text-justify text-white shadow-sm md:px-8 px-4 md:text-xl lg:text-2xl">
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
