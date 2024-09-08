function ProjectDetails() {
  return (
    <div>
      <div className="p-4 m-16 bg-greenLight text-white h-76 max-w-max ">
        <h2 className="h3-title p-4 text-m text-center">
          Objectif : 15 000 arbres
        </h2>
        <p className="p-4 text-s text-justify ">
          {project !== null && project.description}
        </p>
      </div>
      <div className="m-9 flex flex-row justify-around flex-wrap">
        {treesProject !== null &&
          treesProject.project_trees.map((tree) => (
            <div key={tree.id} className="m-6 max-w-80 flex shadow-lg">
              <article className="flex flex-col justify-between bg-orange-50">
                <img
                  className="w-80 h-60 object-cover"
                  src={`/images/species/${tree.species.picture}.webp`}
                  alt="Illustration de l'arbre à planté"
                />
                <div className="p-4  flex flex-col text-center gap-6">
                  <button
                    className="p-2 bg-transparent border-solid border-2 border-greenRegular"
                    type="button"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    className="text-xs text-white w-2/5 rounded-lg bg-green-700 p-2 m-auto mb-4"
                    type="button"
                  >
                    Détails
                  </button>
                </div>
              </article>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectDetails;
