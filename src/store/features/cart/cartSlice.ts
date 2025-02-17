import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { IProjectTreeSpecies } from '../../../@types/index';

// Définition du type pour un élément du panier
interface CartItem {
  tree: IProjectTreeSpecies;
  projectName: string;
  quantity: number;
}

// Définition de l'état initial du panier
export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Ajoute un élément au panier.
     * Si l'élément existe déjà, sa quantité est incrémentée.
     */
    addToCart: (
      state,
      action: PayloadAction<{ tree: IProjectTreeSpecies; projectName: string }>
    ) => {
      const { tree, projectName } = action.payload;
      // Vérifiez si l'article existe déjà dans le panier
      const existingItem = state.cartItems.find(
        (item) =>
          item.tree.id === tree.id && item.tree.species.id === tree.species.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // state.cartItems = [
        //   ...state.cartItems,
        //   { tree, projectName, quantity: 1 },
        // ];
        state.cartItems.push({ tree, projectName, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    /**
     * Supprime un élément du panier par son ID.
     */
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.tree.id !== action.payload
      );
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    /**
     * Met à jour la quantité d'un élément spécifique du panier.
     */
    updateQuantityCartItem: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const cartItem = state.cartItems.find((item) => item.tree.id === id);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
  },
});

// Export des actions
export const { addToCart, removeFromCart, updateQuantityCartItem } =
  cartSlice.actions;

// Sélecteur pour récupérer le panier depuis le state global
export const selectCart = (state: RootState) => state.cart.cartItems;

// Export du reducer
export default cartSlice.reducer;
