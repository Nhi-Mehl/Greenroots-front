import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../../store/hooks';
import handleAddToCart from '../../../utils/addToCart';
import { IProjectTreeSpecies } from '../../../@types/ProjectTree';
import Button from '../../Form/Button/Button';

type StateProps = {
  tree: IProjectTreeSpecies;
  projectName: string;
};

function TreeDetailsPage() {
  const dispatch = useAppDispatch();
  const { state }: { state: StateProps } = useLocation();

  if (!state || !state.tree) {
    // Gérer le cas où les données sont manquantes
    return (
      <p role="alert">Erreur : Les détails de l&apos;arbre sont manquants.</p>
    );
  }

  const { tree, projectName } = state;

  const baseQuantity = tree.basic_quantity;
  const currentQuantity = tree.current_quantity;
  const treePlanted = baseQuantity - currentQuantity;

  return (
    <main className="min-h-screen grid gap-8 xl:grid-flow-col xl:grid-rows-2 xl:gap-10 xl:p-10">
      {/* Section de présentation de l’arbre */}
      <section className="xl:row-span-2">
        <figure>
          <img
            className="w-full h-64 sm:h-128 md:h-200 object-cover rounded-lg shadow-lg"
            src={`/images/species/${tree.species.picture}.webp`}
            alt={`Illustration de l'arbre ${tree.species.name}`}
            loading="lazy"
          />
        </figure>
      </section>

      {/* Section des informations de l’arbre */}
      <article
        aria-labelledby="Informations de l’arbre"
        className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10"
      >
        <header>
          <h1 className="h1-title text-greenRegular">{tree.species.name}</h1>
          <h2 className="h2-title italic text-gray-500">
            {tree.species.scientific_name}
          </h2>
        </header>

        <p className="text-lg sm:text-xl my-4">{tree.species.description}</p>

        {/* Détails sous forme de liste de définition */}
        <dl className="text-xl sm:text-2xl">
          <div>
            <dt className="font-semibold">CO₂ absorbé</dt>
            <dd className="text-greenRegular">
              {tree.species.co2_compensation} tonnes / an
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Prix</dt>
            <dd className="text-greenRegular">{tree.species.price} €</dd>
          </div>
        </dl>
      </article>

      {/* Section Quantités disponibles et plantées */}
      <section className="flex flex-col gap-4 items-center pb-10 lg:flex-row lg:justify-around">
        <div className="text-center lg:order-1">
          <h3 className="h3-title text-greenRegular">Quantité disponible</h3>
          <p className="text-xl sm:text-2xl">{currentQuantity}</p>
        </div>
        <div className="text-center lg:order-3">
          <h3 className="h3-title text-greenRegular">Quantité plantée</h3>
          <p className="text-xl sm:text-2xl">{treePlanted}</p>
        </div>

        {/* Bouton d'ajout au panier */}
        <Button
          variant="default"
          className="lg:order-2"
          type="button"
          onClick={() => handleAddToCart(tree, projectName, dispatch)}
        >
          Ajouter au panier
        </Button>
      </section>
    </main>
  );
}

export default TreeDetailsPage;
