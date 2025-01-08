// src/context/CartContext.js
import React, { createContext, useReducer, useEffect, useMemo } from 'react';
import { CartReducer, initialState } from './CartReducer';
import { addToCart, removeFromCart, updateQuantity } from './CartAction';
import { IProjectTreeSpecies } from '../../@types';

interface DefautCartContextType {
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

const defaultCartContext = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
};
export const CartContext =
  createContext<DefautCartContextType>(defaultCartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Synchroniser le panier avec localStorage à chaque changement du panier
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);
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
