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
  PRODUCT_TYPE_LIST_FAIL,
  PRODUCT_TYPE_LIST_REQUEST,
  PRODUCT_TYPE_LIST_SUCCESS,
} from "../constants/productConstants";
import Axios from "axios";

//=== GET PRODUCT LIST
export const listProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//=== GET FILERED PRODUCTS
export const filterProduct = (query) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      `/api/products/search?name=${query.name}&category=${query.category}&brand=${query.brand}&order=${query.order}&type=${query.type}&min=${query.min}&max=${query.max}&rating=${query.rating}&page=${query.page}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//=== GET DETAILS PRODUCT
export const detailProduct = (productSlug) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST });
  try {
    const { data } = await Axios.get(`/api/products/${productSlug}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//=== GET CATEGORY LIST
export const listCategory = () => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/products/categories");
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//=== GET BRAND LIST
export const listBrand = () => async (dispatch) => {
  dispatch({ type: PRODUCT_BRAND_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/products/brands");
    dispatch({ type: PRODUCT_BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_BRAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//=== GET TYPES LIST
export const listType = () => async (dispatch) => {
  dispatch({ type: PRODUCT_TYPE_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/products/types");
    dispatch({ type: PRODUCT_TYPE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_TYPE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//=== GET SEARCH RESULT
// export const getSearchResults =
//   (name, category, brand, min, max, above) => async (dispatch) => {
//     dispatch({ type: PRODUCT_SEARCH_REQUEST });

//     // Route 1: for SearchPage
//     if (name && category && brand) {
//       try {
//         const { data } = await Axios.get(
//           `/api/products/search/name/${name}/category/${category}/brand/${brand}`
//         );
//         dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
//       } catch (error) {
//         dispatch({
//           type: PRODUCT_SEARCH_FAIL,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         });
//       }
//     }

//     // Route 2: for SearchPage
//     if (name && category && !brand) {
//       try {
//         const { data } = await Axios.get(
//           `/api/products/search/name/${name}/category/${category}`
//         );
//         dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
//       } catch (error) {
//         dispatch({
//           type: PRODUCT_SEARCH_FAIL,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         });
//       }
//     }

//     // Route 3: for SearchPage
//     if (name && brand && !category) {
//       try {
//         const { data } = await Axios.get(
//           `/api/products/search/name/${name}/brand/${brand}`
//         );
//         dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
//       } catch (error) {
//         dispatch({
//           type: PRODUCT_SEARCH_FAIL,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         });
//       }
//     }

//     // Route 4: for SearchPage
//     if (name && !category && !brand) {
//       try {
//         const { data } = await Axios.get(`/api/products/search/name/${name}`);
//         dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
//       } catch (error) {
//         dispatch({
//           type: PRODUCT_SEARCH_FAIL,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         });
//       }
//     }

//     // Route 5: for ShopPage
//     if (category && !name && !brand) {
//       try {
//         const { data } = await Axios.get(
//           `/api/products/search/category/${category}`
//         );
//         dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
//       } catch (error) {
//         dispatch({
//           type: PRODUCT_SEARCH_FAIL,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         });
//       }
//     }

//     // Route 6: for ShopPage
//     if (brand && !name && !category) {
//       try {
//         const { data } = await Axios.get(`/api/products/search/brand/${brand}`);
//         dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
//       } catch (error) {
//         dispatch({
//           type: PRODUCT_SEARCH_FAIL,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         });
//       }
//     }

//     // Route 7: for ShopPage
//     if (min && max && !brand && !category && !name) {
//       try {
//         const { data } = await Axios.get(
//           `/api/products/search/price/min/${min}/max/${max}`
//         );
//         dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
//       } catch (error) {
//         dispatch({
//           type: PRODUCT_SEARCH_FAIL,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         });
//       }
//     }

//     // Route 8: for ShopPage
//     if (above && !min && !max && !brand && !category && !name) {
//       try {
//         const { data } = await Axios.get(
//           `/api/products/search/price/above/${above}`
//         );
//         dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
//       } catch (error) {
//         dispatch({
//           type: PRODUCT_SEARCH_FAIL,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         });
//       }
//     }
//   };
