import {
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
} from "../constants/brandConstants";

export const brandListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return { loading: true };
    case BRAND_LIST_SUCCESS:
      return { loading: false, brands: action.payload };
    case BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
