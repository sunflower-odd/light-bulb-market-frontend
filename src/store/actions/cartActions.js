export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeFromCart = (id) => ({
  type: "REMOVE_FROM_CART",
  payload: id,
});

export const decreaseQty = (id) => ({
  type: "DECREASE_QTY",
  payload: id,
});

export const clearCart = () => ({
  type: "CLEAR_CART"
});

export const increaseQty = (id) => ({
  type: "INCREASE_QTY",
  payload: id,
});