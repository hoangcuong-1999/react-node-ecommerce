import Axios from "axios";
import { CART_RESET } from "../constants/cartConstants";
import {
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_LIST_FAIL,
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  ORDER_BY_PAYPAL_FAIL,
  ORDER_BY_PAYPAL_REQUEST,
  ORDER_BY_PAYPAL_SUCCESS,
  ORDER_CANCLE_FAIL,
  ORDER_CANCLE_REQUEST,
  ORDER_CANCLE_SUCCESS,
  ORDER_CHANGE_STATUS,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const placeOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
    dispatch({ type: CART_RESET });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderByPaypal = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_BY_PAYPAL_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    // tham số thứ 2 trong hàm post() bên dưới "order" đại diện cho data nằm trong body, do đó bên server có thể: req.body.property (sử dụng Postman để demo sẽ rõ hơn)
    const { data } = await Axios.post("/api/orders/order-by-paypal", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_BY_PAYPAL_SUCCESS, payload: data });
    dispatch({ type: CART_RESET });
  } catch (error) {
    dispatch({
      type: ORDER_BY_PAYPAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  dispatch({ type: GET_ORDER_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/orders/mine`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: GET_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  dispatch({ type: GET_ORDER_DETAILS_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancleOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CANCLE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      "/api/orders/cancle",
      { orderId },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: ORDER_CANCLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CANCLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeOrderStatus = (orderId) => (dispatch) => {
  dispatch({ type: ORDER_CHANGE_STATUS, payload: orderId });
};
