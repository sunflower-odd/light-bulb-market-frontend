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