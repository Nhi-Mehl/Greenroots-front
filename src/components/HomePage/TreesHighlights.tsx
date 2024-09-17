function TreesHighlights() {
  return (
    <>
      <h1 className="h1-title text-center mt-10 lg:text-5xl lg:mt-24">
        Nos arbres les plus populaires
      </h1>
      <article className="w-5/6 m-auto my-10 p-10 bg-beige sm:max-w-sm lg:max-w-lg lg:mt-24">
        <img src="" alt="" />
        <h2 className="h2-title text-center">Grevillea robusta</h2>
        <p className="mt-10 text-justify">
          Le palmier, c'est l'arbre cool des tropiques, toujours prêt à bronzer,
          à faire de l'ombre et à apporter une touche de vacances, même en
          pleine ville.
        </p>
        <div className="flex justify-between mt-10">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">5€</p>
          <button className="btn lg:text-lg" type="button">
            Planter
          </button>
        </div>
      </article>
    </>
  );
}

export default TreesHighlights;
