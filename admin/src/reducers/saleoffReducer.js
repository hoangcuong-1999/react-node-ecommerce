import {
  SALEOFF_ADD_FAIL,
  SALEOFF_ADD_REQUEST,
  SALEOFF_ADD_RESET,
  SALEOFF_ADD_SUCCESS,
  SALEOFF_LIST_FAIL,
  SALEOFF_LIST_REQUEST,
  SALEOFF_LIST_SUCCESS,
  SALEOFF_REMOVE_FAIL,
  SALEOFF_REMOVE_REQUEST,
  SALEOFF_REMOVE_RESET,
  SALEOFF_REMOVE_SUCCESS,
} from "../constants/saleoffConstants";

// List sale off
export const saleoffListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SALEOFF_LIST_REQUEST:
      return { loading: true };
    case SALEOFF_LIST_SUCCESS:
      return { loading: false, saleoffs: action.payload };
    case SALEOFF_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Add sale off
export const saleoffAddReducer = (state = {}, action) => {
  switch (action.type) {
    case SALEOFF_ADD_REQUEST:
      return { loading: true };
    case SALEOFF_ADD_SUCCESS:
      return { loading: false, saleoff: action.payload };
    case SALEOFF_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SALEOFF_ADD_RESET:
      return {};
    default:
      return state;
  }
};

// Remove saleoff
export const saleoffRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case SALEOFF_REMOVE_REQUEST:
      return { loading: true };
    case SALEOFF_REMOVE_SUCCESS:
      return { loading: false, removedSaleoff: action.payload };
    case SALEOFF_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    case SALEOFF_REMOVE_RESET:
      return {};
    default:
      return state;
  }
};
