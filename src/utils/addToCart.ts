import Swal from 'sweetalert2';

import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/features/cart/cartSlice';
import { IProjectTreeSpecies } from '../@types/ProjectTree';
import { IProject } from '../@types/Project';

// Fonction pour ajouter un arbre au panier

const handleAddToCart = (
  tree: IProjectTreeSpecies,
  projectName: IProject['name'],
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  // Vérifie si l'arbre est déjà dans le panier
  if (!addToCart) return;

  // Ajoute l'arbre au panier
  dispatch(addToCart({ tree, projectName }));

  // Affiche une notification de succès
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Ajouter au panier',
    showConfirmButton: false,
    timer: 2000,
  });
};

export default handleAddToCart;
