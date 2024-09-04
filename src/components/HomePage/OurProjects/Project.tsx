function Project() {
  return (
    <article className="w-5/6 h-128 flex my-20 mx-auto border-greenRegular border-4">
      <div className="w-1/3">
        <img
          className="w-full h-full object-cover"
          src="../../../../../public/images/project-3-home.jpg"
          alt="projet:nom de projet"
        />
      </div>
      <div className="w-2/3 flex flex-col gap-y-20 items-center justify-center p-20">
        <h2 className="h2-title text-center">Pay, Ville</h2>
        <p className="sectionText">
          Reverdissons Moroni vise à restaurer les forêts de Moroni en plantant
          des milliers d&aposarbres indigènes. Ce projet réduit le CO2, prévient
          l&aposérosion, protège la biodiversité et engage la communauté locale
          dans la protection de leur environnement pour un avenir durable.
        </p>
        <button className="btn" type="button">
          En savoir plus
        </button>
      </div>
    </article>
  );
}

export default Project;
