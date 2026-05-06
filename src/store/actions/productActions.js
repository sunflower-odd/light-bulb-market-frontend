export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:8000/products");
    const data = await res.json();

    console.log("FRONT API RESPONSE:", data);

    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });
  };
};

export const fetchProductById = (product_id) => {
  return async (dispatch) => {
    const res = await fetch(`http://localhost:8000/products/${product_id}`);
    const data = await res.json();

    dispatch({
      type: "SET_CURRENT_PRODUCT",
      payload: data,
    });
  };
};

