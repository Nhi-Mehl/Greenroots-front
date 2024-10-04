// src/context/CartContext.js
import React, { createContext, useReducer, useEffect, useMemo } from 'react';
import { CartReducer, initialState } from './CartReducer';
import { addToCart, removeFromCart, updateQuantity } from './CartAction';

const defaultCartContext = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
};
export const CartContext = createContext(defaultCartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Synchroniser le panier avec localStorage à chaque changement du panier
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);
  const contextValue = useMemo(
    () => ({
      cartItems: state.cartItems,
      addToCart: (tree, projectName) => addToCart(dispatch, tree, projectName),
      removeFromCart: (id) => removeFromCart(dispatch, id),
      updateQuantity: (id, quantity) => updateQuantity(dispatch, id, quantity),
    }),
    [state.cartItems]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
