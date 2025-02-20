import { IProjectTreeSpecies } from '../../@types/ProjectTree';

// Définition des types d'actions
export type CartAction =
  | {
      type: 'ADD_TO_CART';
      payload: { tree: IProjectTreeSpecies; projectName: string };
    }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } };

// Typage de la fonction dispatch
type Dispatch = (action: CartAction) => void;

/**
 * Action pour ajouter un élément au panier.
 *
 * @param dispatch - La fonction dispatch du reducer.
 * @param tree - L'objet représentant une espèce d'arbre (IProjectTreeSpecies).
 * @param projectName - Le nom du projet associé.
 */
export const addToCart = (
  dispatch: Dispatch,
  tree: IProjectTreeSpecies,
  projectName: string
): void => {
  console.log('[CartActions] ADD_TO_CART action dispatched:', {
    tree,
    projectName,
  });
  dispatch({
    type: 'ADD_TO_CART',
    payload: { tree, projectName },
  });
};

/**
 * Action pour supprimer un élément du panier.
 *
 * @param dispatch - La fonction dispatch du reducer.
 * @param id - L'ID unique de l'élément à supprimer.
 */
export const removeFromCart = (dispatch: Dispatch, id: number): void => {
  console.log('[CartActions] REMOVE_FROM_CART action dispatched with ID:', id);
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: { id },
  });
};

/**
 * Action pour mettre à jour la quantité d'un élément dans le panier.
 *
 * @param dispatch - La fonction dispatch du reducer.
 * @param id - L'ID unique de l'élément.
 * @param quantity - La nouvelle quantité.
 */
export const updateQuantity = (
  dispatch: Dispatch,
  id: number,
  quantity: number
): void => {
  console.log('[CartActions] UPDATE_QUANTITY action dispatched:', {
    id,
    quantity,
  });
  dispatch({
    type: 'UPDATE_QUANTITY',
    payload: { id, quantity },
  });
};
