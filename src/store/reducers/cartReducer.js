const initialState = {
  items: [], // { product, qty }
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_TO_CART": {
      const product = action.payload;

      const existing = state.items.find(
        (item) => item.product.product_id === product.product_id
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.product_id === product.product_id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product, qty: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.product_id !== action.payload
        ),
      };

    case "DECREASE_QTY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.product.product_id === action.payload
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter((item) => item.qty > 0),
      };

    default:
      return state;
  }
};

export default cartReducer;