import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  orderHistoryReducer,
  productsDetailsReducers,
  productsListReducers,
} from "./reducers/productsReducers";
import { userLoginReducers, userSignupReducers } from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducers = combineReducers({
  productsList: productsListReducers,
  productsDetails: productsDetailsReducers,
  userLogin: userLoginReducers,
  userSignup: userSignupReducers,
  cart: cartReducer,
  orderHistory: orderHistoryReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartItemFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
