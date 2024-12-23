// src/context/CartReducer.js
export const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { tree, projectName } = action.payload;

      const existingItem = state.cartItems.find(
        (item) =>
          item.tree.id === tree.id && item.tree.species.id === tree.species.id
      );

      let updatedCartItems;

      if (existingItem) {
        // Article existant : mettre à jour la quantité
        updatedCartItems = state.cartItems.map((item) =>
          item.tree.id === tree.id && item.tree.species.id === tree.species.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nouvel article : ajouter au panier
        updatedCartItems = [
          ...state.cartItems,
          { tree, projectName, quantity: 1 },
        ];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));

      return { ...state, cartItems: updatedCartItems };
    }

    case 'REMOVE_FROM_CART': {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.tree.id !== action.payload.id
      );

      // Mise à jour du localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));

      return { ...state, cartItems: updatedCartItems };
    }
    case 'UPDATE_QUANTITY': {
      // Mettez à jour la quantité d'un article spécifié
      const updatedItems = state.cartItems.map((item) =>
        item.tree.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      // Mise à jour du localStorage
      localStorage.setItem('cart', JSON.stringify(updatedItems));

      return { ...state, cartItems: updatedItems };
    }
    default:
      return state;
  }
};
