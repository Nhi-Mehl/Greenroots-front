// src/context/CartActions.js
export const addToCart = (dispatch, tree, projectName) => {
  console.log('Dispatching ADD_TO_CART action with:', { tree, projectName });
  dispatch({ type: 'ADD_TO_CART', payload: { tree, projectName } });
};

export const removeFromCart = (dispatch, id) => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
};

export const updateQuantity = (dispatch, id, quantity) => {
  dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
};
