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
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_SUCCESS,
  ORDER_CONFIRM_FAIL,
  ORDER_CONFIRM_RESET,
  GET_ORDER_DETAILS_RESET,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return { loading: true };
    case PLACE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload.order };
    case PLACE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_BY_PAYPAL_REQUEST:
      return { loading: true };
    case ORDER_BY_PAYPAL_SUCCESS:
      return { loading: false, order: action.payload.order };
    case ORDER_BY_PAYPAL_FAIL:
      return { loading: false, order: action.payload };
    default:
      return state;
  }
};

export const orderListReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDER_LIST_REQUEST:
      return { loading: true };
    case GET_ORDER_LIST_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST:
      return { loading: true };
    case GET_ORDER_DETAILS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ORDER_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const orderListAllReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CONFIRM_REQUEST:
      return { loading: true };
    case ORDER_CONFIRM_SUCCESS:
      return { loading: false, updatedOrder: action.payload };
    case ORDER_CONFIRM_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CONFIRM_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, deletedOrder: action.payload };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
