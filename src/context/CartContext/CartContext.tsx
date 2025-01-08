import React, { createContext, useReducer, useEffect, useMemo } from 'react';
import { CartReducer, initialState } from './CartReducer';
import { addToCart, removeFromCart, updateQuantity } from './CartAction';
import { IProjectTreeSpecies } from '../../@types';

// Interface pour définir le type du contexte par défaut
interface DefaultCartContextType {
  cartItems: {
    tree: IProjectTreeSpecies;
    projectName: string;
    quantity: number;
  }[];
  addToCart: (
    projectTreeSpecies: IProjectTreeSpecies,
    projectName: string
  ) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

// Contexte par défaut
const defaultCartContext: DefaultCartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
};

// Création du contexte Cart
export const CartContext =
  createContext<DefaultCartContextType>(defaultCartContext);

// Composant CartProvider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Synchronise le panier avec localStorage à chaque changement de `cartItems`
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Mémorise les valeurs du contexte pour éviter les recalculs inutiles
  const cartContextValue = useMemo(
    () => ({
      cartItems: state.cartItems,
      addToCart: (
        projectTreeSpecies: IProjectTreeSpecies,
        projectName: string
      ) => addToCart(dispatch, projectTreeSpecies, projectName),
      removeFromCart: (id: number) => removeFromCart(dispatch, id),
      updateQuantity: (id: number, quantity: number) =>
        updateQuantity(dispatch, id, quantity),
    }),
    [state.cartItems]
  );

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
