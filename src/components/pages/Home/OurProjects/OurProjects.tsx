/**
 * Composant OurProjects
 * ---------------------------
 * Ce composant affiche une description les projets de reforestation de GreenRoots.
 */
function OurProjects() {
  return (
    <section
      aria-labelledby="Section présentaion des projets de GreenRoots"
      className="relative h-[350px] sm:h-[250px] md:h-[320px] lg:h-[500px]"
    >
      <img
        className="h-full w-full object-cover"
        src="/images/bg-our-projetcs-home.jpg"
        alt="Illustration d'une plantation d'arbres en cours"
      />
      <div className="absolute top-0 flex flex-col justify-center text-white pt-10 lg:pt-20">
        <h2
          aria-labelledby="Title de la section"
          className="mb-4 lg:mb-14 text-center h2-title font-semibold text-white md:text-4xl lg:text-5xl"
        >
          NOS PROJETS
        </h2>
        <p className="text-sm text-justify text-white shadow-sm px-4 md:px-8 lg:px-20 md:text-xl lg:text-2xl">
          Chez GreenRoots, nous croyons que la reforestation est un enjeu
          mondial qui necessite des actions locales à travers le monde. C’est
          pourquoi nous avons lancé des projets internationaux dans plusieurs
          régions, chacun visant à restaurer des écosystèmes uniques, protéger
          la biodiversité et soutenir les communautés locales. De l’Amérique du
          Sud à l’Afrique en passant par l’Asie, découvrez comment, ensemble,
          nous faisons grandir des forêts qui feront la différence pour les
          générations à venir.
        </p>
      </div>
    </section>
  );
}

export default OurProjects;
