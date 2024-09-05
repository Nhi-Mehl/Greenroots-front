function DetailTreePage() {
  return (
    <main>
      <section>
        <h2>Tire du projet</h2>
        <img src="/images/project-3-home.jpg" alt="nom arbre" />
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
