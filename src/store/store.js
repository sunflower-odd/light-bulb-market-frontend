import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orderState: orderReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;