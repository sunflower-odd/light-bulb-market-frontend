export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:8000/products");
    const data = await res.json();

    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });
  };
};