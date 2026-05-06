import { FETCH_PRODUCTS } from "../actions/productActions";

const initialState = {
  list: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;