import axios from "axios";
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

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });
    const { data } = await axios.get(`/api/products`);

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload: error.respose && error.response.data.detail,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: PRODUCTS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload: error.respose && error.response.data.detail,
    });
  }
};

export const getSearchResults = async (query) => {
  try {
    const { data } = await axios.get(`/api/products/search/?query=${query}`);
    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
export const getOrderHistory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCTS_HISTORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders/history/", config);

    dispatch({
      type: PRODUCTS_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_HISTORY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
