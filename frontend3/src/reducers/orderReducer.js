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
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  GET_ORDER_DETAILS_RESET,
  ORDER_CANCLE_REQUEST,
  ORDER_CANCLE_SUCCESS,
  ORDER_CANCLE_FAIL,
  ORDER_CANCLE_RESET,
  ORDER_CHANGE_STATUS,
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
    case ORDER_CHANGE_STATUS:
      return {
        ...state,
        data: {
          ...state.data,
          status: "Cancled",
        },
      };
    default:
      return state;
  }
};

export const orderCancleReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CANCLE_REQUEST:
      return { loading: true };
    case ORDER_CANCLE_SUCCESS:
      return { loading: false, cancledOrder: action.payload };
    case ORDER_CANCLE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CANCLE_RESET:
      return {};
    default:
      return state;
  }
};
