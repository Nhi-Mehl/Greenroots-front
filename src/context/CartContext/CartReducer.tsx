// src/context/CartReducer.ts
import { CartAction } from './CartAction';
import { IProjectTreeSpecies } from '../../@types';

// Définition de l'état initial
export const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
};

// Typage des articles dans le panier
export interface CartItem {
  tree: IProjectTreeSpecies;
  projectName: string;
  quantity: number;
}

// Typage de l'état du panier
export interface CartState {
  cartItems: CartItem[];
}

/**
 * Réducteur pour la gestion du panier.
 *
 * @param state - L'état actuel du panier.
 * @param action - L'action à traiter.
 * @returns Le nouvel état du panier.
 */
export const CartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { tree, projectName } = action.payload;

      // Vérifiez si l'article existe déjà dans le panier
      const existingItem = state.cartItems.find(
        (item) =>
          item.tree.id === tree.id && item.tree.species.id === tree.species.id
      );

      let updatedCartItems: CartItem[];

      if (existingItem) {
        // Si l'article existe, mettez à jour la quantité
        updatedCartItems = state.cartItems.map((item) =>
          item.tree.id === tree.id && item.tree.species.id === tree.species.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Sinon, ajoutez le nouvel article
        updatedCartItems = [
          ...state.cartItems,
          { tree, projectName, quantity: 1 },
        ];
      }

      // Synchronisez avec localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));

      return { ...state, cartItems: updatedCartItems };
    }

    case 'REMOVE_FROM_CART': {
      // Supprimez l'article correspondant à l'ID
      const updatedCartItems = state.cartItems.filter(
        (item) => item.tree.id !== action.payload.id
      );

      // Synchronisez avec localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));

      return { ...state, cartItems: updatedCartItems };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;

      // Mettez à jour la quantité pour l'article correspondant
      const updatedCartItems = state.cartItems.map((item) =>
        item.tree.id === id ? { ...item, quantity } : item
      );

      // Synchronisez avec localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));

      return { ...state, cartItems: updatedCartItems };
    }

    default:
      // Retournez l'état actuel si l'action n'est pas reconnue
      return state;
  }
};
