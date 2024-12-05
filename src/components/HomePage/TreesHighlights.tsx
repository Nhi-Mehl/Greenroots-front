import axios from 'axios';
// import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/index';
// import { CartContext } from '../Cart/CartContext/CartContext';
// import { useProject } from '../../context/ProjectContext';

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}; // Renommé en IProject

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
  name: string;
  project_id: number;
}

function TreesHighlights() {
  // const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();
  const [treesHighlights, setTreeHighlighs] = useState<TreeHighlightsProps[]>(
    []
  );

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

  // const handleAddtoCart = (tree: TreeHighlightsProps) => {
  //   if (!addToCart) {
  //     console.error('addtoCart is not defined');
  //     return;
  //   }
  //   addToCart(tree, project.name);

  //   Swal.fire({
  //     position: 'center',
  //     icon: 'success',
  //     title: 'Ajouter au panier',
  //     showConfirmButton: false,
  //     timer: 2000,
  //   });
  // };

  const handleDetailTree = (tree: TreeHighlightsProps) => {
    const projectName = tree.name;
    // const treeName = tree.tree_name;
    const slug = createSlug(projectName);
    navigate(`/projects/${tree.project_id}/${slug}`, {
      state: { tree, projectName },
    });
  };

  return (
    <>
      <h1 className="h1-title text-center mt-10 lg:text-5xl lg:mt-24">
        Nos arbres les plus populaires
      </h1>
      <div className="lg:flex md:gap-4">
        {treesHighlights.map((tree) => (
          <article
            key={tree.id}
            className="w-5/6 m-auto my-20 bg-beige shadow-lg sm:max-w-sm md:max-w-1/3 lg:mt-24"
          >
            <img
              className="w-full h-[200px] lg:h-[250px] object-cover"
              src={`/images/species/${tree.picture}.webp`}
              alt={tree.tree_name}
            />
            <h2 className="h2-title text-center mt-10">{tree.tree_name}</h2>
            <p className="mt-10 px-10 text-justify">{tree.description}</p>
            <div className="flex justify-between items-center p-10">
              {/* <p className="text-xl md:text-2xl lg:text-3xl">{tree.price}€</p> */}
              <button
                className="btn lg:text-lg block mx-auto"
                type="button"
                onClick={() => handleDetailTree(tree, tree.name)}
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
