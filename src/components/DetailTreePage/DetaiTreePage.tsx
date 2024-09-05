function DetailTreePage() {
  return (
    <main className="p-20">
      <section className="w-full relative inline-block">
        <img
          className="w-4/5 h-200 object-cover mx-auto"
          src="/images/id9-HêtreCommun.jpg"
          alt="nom arbre"
        />

        <h2 className="absolute inset-0 flex items-center justify-center h1-title text-white">
          Tire du projet
        </h2>
      </section>
      <section className="w-4/5 my-20 mx-auto sectionText">
        <p>Nom de l’arbre: Groot</p>
        <p>Nom scientifique : Grout Arborius Titanicus</p>
        <p>
          Grout Arborius Titanicus est le plus grand des végétaux à la fois sage
          et boisé. Avec ses branches comme bras et son tronc majestueux, il
          passe ses journées à rooter pour la nature tout en faisant des blagues
          à ses amis forestiers.
        </p>
        <p>Co2 : Absobre 100 tonnes de co2 par an</p>
        <p>Prix : 8€</p>
      </section>
      <section className="flex justify-center gap-x-40 sectionText">
        <div className="">
          <p>Quantité disponible</p>
          <p>12</p>
        </div>
        <button className="btn" type="button">
          Ajouter au panier
        </button>
        <div>
          <p>Quantité planté</p>
          <p>500</p>
        </div>
      </section>
    </main>
  );
}

export default DetailTreePage;
