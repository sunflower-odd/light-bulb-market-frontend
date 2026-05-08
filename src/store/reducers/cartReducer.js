const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

const saveToStorage = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_TO_CART": {
      const product = action.payload;

      const existing = state.items.find(
        (item) => item.product.product_id === product.product_id
      );

      let newItems;

      if (existing) {
        newItems = state.items.map((item) =>
          item.product.product_id === product.product_id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product, qty: 1 }];
      }

      saveToStorage(newItems);

      return {
        ...state,
        items: newItems,
      };
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter(
        (item) => item.product.product_id !== action.payload
      );

      saveToStorage(newItems);

      return {
        ...state,
        items: newItems,
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: []
      };

    case "DECREASE_QTY": {
      const newItems = state.items
        .map((item) =>
          item.product.product_id === action.payload
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);

      saveToStorage(newItems);

      return {
        ...state,
        items: newItems,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;