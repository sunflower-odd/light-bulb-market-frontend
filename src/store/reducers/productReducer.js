import { FETCH_PRODUCTS } from "../actions/productActions";

const initialState = {
  list: [],
  current: null,

};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        list: action.payload,
      };
    case "SET_CURRENT_PRODUCT":
      return {
        ...state,
        current: action.payload,
      };  

    default:
      return state;
  }
};

export default productReducer;