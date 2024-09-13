import './OurProjects.css';

function OurProjects() {
  return (
    <section>
      <figure className=" relative h-[300px] md:h-[360px] lg:h-[500px]">
        <img
          className="h-full w-full object-cover"
          src="/images/bg-our-projetcs-home.jpg"
          alt="backgroud plantation"
        />
        <div className="absolute top-0 flex flex-col justify-center text-white text-center">
          <h2 className="mb-4 p-4 text-center text-2xl font-semibold text-white md:text-4xl lg:m-auto lg:mb-10 lg:w-4/5 lg:p-10 lg:text-4xl">
            NOS PROJETS
          </h2>
          <p className="m-auto w-4/5 text-center text-xs text-white shadow-sm md:text-xl lg:text-2xl">
            Chez GreenRoots, nous croyons que la reforestation est un enjeu
            mondial qui necessite des actions locales à travers le monde. C’est
            pourquoi nous avons lancé des projets internationaux dans plusieurs
            régions, chacun visant à restaurer des écosystèmes uniques, protéger
            la biodiversité et soutenir les communautés locales. De l’Amérique
            du Sud à l’Afrique en passant par l’Asie, découvrez comment,
            ensemble, nous faisons grandir des forêts qui feront la différence
            pour les générations à venir.
          </p>
          {/* <img src={bgOurProjects} alt="background nos projects section" /> */}
        </div>
      </figure>
    </section>
  );
}

export default OurProjects;
