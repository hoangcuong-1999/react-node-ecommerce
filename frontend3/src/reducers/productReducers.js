import {
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_BRAND_LIST_REQUEST,
  PRODUCT_BRAND_LIST_SUCCESS,
  PRODUCT_BRAND_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TYPE_LIST_SUCCESS,
  PRODUCT_TYPE_LIST_REQUEST,
  PRODUCT_TYPE_LIST_FAIL,
  PRODUCT_DETAILS_RESET,
} from "../constants/productConstants";

export const productListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};

export const categorytListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const brandListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_BRAND_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_BRAND_LIST_SUCCESS:
      return { loading: false, brands: action.payload };
    case PRODUCT_BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const typeListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_TYPE_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_TYPE_LIST_SUCCESS:
      return { loading: false, types: action.payload };
    case PRODUCT_TYPE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
