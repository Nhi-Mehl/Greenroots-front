import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { IProjectTree } from '../../@types';
import Swal from 'sweetalert2';
import { CartContext } from '../Cart/CartContext/CartContext';

function DetailTreePage() {
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

  const handleAddToCart = (tree: IProjectTree) => {
    if (!projectName) {
      console.error('Project name is not defined');
      return;
    }
    console.log('Adding to cart:', { tree, projectName });

    addToCart(tree, projectName);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ajouter au panier',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <main className="p-20">
      <section className="w-full relative inline-block">
        <img
          className="w-4/5 h-200 object-cover mx-auto"
          src={`/images/species/${tree.species.picture}.webp`}
          alt={tree.species.name}
        />
        <h2 className="absolute inset-0 flex items-center justify-center h1-title text-white">
          {tree?.species.name}
        </h2>
      </section>
      <section className="w-4/5 my-20 mx-auto sectionText">
        <p>Nom de l’arbre: {tree?.species.name}</p>
        <p>Nom scientifique :{tree?.species.scientific_name}</p>
        <p>{tree.species.description}</p>
        <p>
          Co2 : Absobre {tree.species.co2_compensation} tonnes de co2 par an
        </p>
        <p>{}</p>
      </section>
      <section className="flex justify-center gap-x-40 sectionText">
        <div>
          <p>Quantité disponible</p>
          <p>{tree.current_quantity}</p>
        </div>
        <button
          className="btn"
          type="button"
          onClick={() => handleAddToCart(tree)}
        >
          Ajouter au panier
        </button>
        <div>
          <p>Quantité planté</p>
          <p>{treePlanted}</p>
        </div>
      </section>
    </main>
  );
}

export default DetailTreePage;
