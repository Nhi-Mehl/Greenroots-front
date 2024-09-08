import { useLocation } from 'react-router-dom';

function DetailTreePage() {
  const location = useLocation();

  const tree = location.state?.tree;
  const baseQuantity = tree.basic_quantity;
  const currentQuantity = tree.current_quantity;
  const treePlanted = baseQuantity - currentQuantity;

  return (
    <main>
      <section>
        <h2>{tree?.species.name}</h2>
        <img
          src={`/images/species/${tree.species.picture}.webp`}
          alt={tree.species.name}
        />
      </section>
      <section>
        <p>Nom de l’arbre: {tree?.species.name}</p>
        <p>Nom scientifique :{tree?.species.scientific_name}</p>
        <p>{tree.species.description}</p>
        <p>
          Co2 : Absobre {tree.species.co2_compensation} tonnes de co2 par an
        </p>
        <p>{}</p>
      </section>
      <section>
        <div>
          <p>Quantité disponible</p>
          <p>{tree.current_quantity}</p>
        </div>
        <button type="button">Ajouter au panier</button>
        <div>
          <p>Quantité planté</p>
          <p>{treePlanted}</p>
        </div>
      </section>
    </main>
  );
}

export default DetailTreePage;
