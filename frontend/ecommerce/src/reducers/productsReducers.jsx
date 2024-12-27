import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_HISTORY_FAIL,
  PRODUCTS_HISTORY_REQUEST,
  PRODUCTS_HISTORY_SUCCESS,
} from "../constants/productsConstants";

export const productsListReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCTS_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productsDetailsReducers = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCTS_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCTS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderHistoryReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_HISTORY_REQUEST:
      return { loading: true, orders: [] };
    case PRODUCTS_HISTORY_SUCCESS:
      return { loading: false, orders: action.payload };
    case PRODUCTS_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
