const initialState = {
  loading: false,
  order: null,
  error: null
};

const orderReducer = (state = initialState, action) => {

  switch (action.type) {

    case "CHECKOUT_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "CHECKOUT_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload
      };

    case "CHECKOUT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default orderReducer;