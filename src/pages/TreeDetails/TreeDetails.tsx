import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IProjectTree } from '../../@types';
import { CartContext } from '../../context/CartContext/CartContext';

function TreeDetailsPage() {
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  console.log('Location state:', location.state);
  const tree = location.state?.tree;
  const projectName = location.state?.projectName;
  console.log('Tree:', tree);
  console.log('ProjectName:', projectName);

  const baseQuantity = tree.basic_quantity;
  const currentQuantity = tree.current_quantity;
  const treePlanted = baseQuantity - currentQuantity;

  const handleAddToCart = (treeProject: IProjectTree) => {
    if (!projectName) {
      console.error('Project name is not defined');
      return;
    }
    console.log('Adding to cart:', { treeProject, projectName });

    addToCart(treeProject, projectName);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ajouter au panier',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <main className="flex flex-col gap-10">
      <section className="w-full lg:mt-12 relative inline-block">
        <img
          className="w-full lg:w-9/12 h-64 lg:h-128 object-cover mx-auto"
          src={`/images/species/${tree.species.picture}.webp`}
          alt={tree.species.name}
        />
        <h2 className="absolute inset-0 flex items-center justify-center h1-title text-white">
          {tree?.species.name}
        </h2>
      </section>
      <section className="text-lg lg:text-2xl w-10/12 xl:w-3/4 2xl:w-2/3 mx-auto p-4 lg:p-10 sectionText bg-white shadow-lg">
        <p className="mb-4 font-semibold">
          Nom de l’arbre :{' '}
          <span className="font-normal text-greenRegular">
            {tree?.species.name}
          </span>
        </p>
        <p className="mb-4 font-semibold">
          Nom scientifique :{' '}
          <span className="text-greenRegular font-normal">
            {tree?.species.scientific_name}
          </span>
        </p>
        <p className="mb-4">{tree.species.description}</p>
        <p className="mb-4 font-semibold">
          Co2 :{' '}
          <span className="text-greenRegular font-normal">
            {' '}
            Absobre {tree.species.co2_compensation} tonnes de co2 par an{' '}
          </span>
        </p>
        <p className="mb-4 font-semibold">
          Prix :{' '}
          <span className="text-greenRegular font-normal">
            {tree.species.price} €
          </span>
        </p>
      </section>
      <section className="flex flex-col gap-8 sectionText">
        <div className="flex justify-center gap-4 sm:gap-36 md:gap-52">
          <div className="text-center">
            <p className="text-sm md:text-xl lg:text-2xl font-bold text-greenRegular">
              Quantité disponible
            </p>
            <p className="text-lg md:text-2xl">{tree.current_quantity}</p>
          </div>

          <div className="text-center">
            <p className="text-sm md:text-xl lg:text-2xl font-bold text-greenRegular">
              Quantité planté
            </p>
            <p className="text-lg md:text-2xl">{treePlanted}</p>
          </div>
        </div>
        <button
          className="btn block mx-auto mb-8"
          type="button"
          onClick={() => handleAddToCart(tree)}
        >
          Ajouter au panier
        </button>
      </section>
    </main>
  );
}

export default TreeDetailsPage;
