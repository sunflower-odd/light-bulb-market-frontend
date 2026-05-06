import { combineReducers } from "redux";

import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

export default rootReducer;