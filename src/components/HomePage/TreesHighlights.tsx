import axios from 'axios';
import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from 'react';
import api from '../../api/index';
import { CartContext } from '../Cart/CartContext/CartContext';
import { useProject } from '../../context/ProjectContext';

interface TreeHighlightsProps {
  id: number;
  tree_name: string;
  basic_quantity: number;
  current_quantity: number;
  sold_quantity: number;
  description: string;
  price: string;
  picture: string;
  co2_compensation: string;
}

function TreesHighlights() {
  const { addToCart } = useContext(CartContext);
  const [treesHighlights, setTreeHighlighs] = useState<TreeHighlightsProps[]>(
    []
  );

  const { project } = useProject();
  console.log('Project', project);

  const getTreesHighlights = async () => {
    try {
      const response = await api.get('/project_trees/highlights');

      console.log('HighLight trees', response.data);

      if (response.status === 200) {
        setTreeHighlighs(response.data);
      }
    } catch (error: import('axios').AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data.message);
      }
    }
  };

  useEffect(() => {
    console.log('TreesHighlights', TreesHighlights);
    getTreesHighlights();
  }, []);

  const handleAddtoCart = (tree: TreeHighlightsProps) => {
    if (!addToCart) {
      console.error('addtoCart is not defined');
      return;
    }
    addToCart(tree, project.name);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ajouter au panier',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <>
      <h1 className="h1-title text-center mt-10 lg:text-5xl lg:mt-24">
        Nos arbres les plus populaires
      </h1>
      <div className="lg:flex">
        {treesHighlights.map((tree) => (
          <article
            key={tree.id}
            className="max-w-max m-auto my-20 bg-beige shadow-lg sm:max-w-sm lg:max-w-lg lg:mt-24"
          >
            <img
              className="w-full object-cover lg:w-lg lg:max-h-80"
              src={`/images/species/${tree.picture}.webp`}
              alt={tree.tree_name}
            />
            <h2 className="h2-title text-center mt-10">{tree.tree_name}</h2>
            <p className="mt-10 px-10 text-justify">{tree.description}</p>
            <div className="flex justify-between items-center p-10">
              <p className="text-xl md:text-2xl lg:text-3xl">{tree.price}€</p>
              <button
                className="btn lg:text-lg"
                type="button"
                onClick={() => handleAddtoCart(tree, project?.name)}
              >
                Planter
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default TreesHighlights;
