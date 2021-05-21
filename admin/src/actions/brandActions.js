import {
  BRAND_CREATE_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_EDIT_REQUEST,
  BRAND_EDIT_SUCCESS,
  BRAND_EDIT_FAIL,
  BRAND_DETAILS_REQUEST,
  BRAND_DETAILS_SUCCESS,
  BRAND_DETAILS_FAIL,
} from "../constants/brandConstants";
import Axios from "axios";

//=== Create brand
export const createBrand = (brandInfo) => async (dispatch, getState) => {
  dispatch({ type: BRAND_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/brands", brandInfo, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BRAND_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BRAND_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//=== /Create brand

// //=== List brand
export const listBrand = () => async (dispatch) => {
  dispatch({ type: BRAND_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/brands");
    dispatch({ type: BRAND_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BRAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// //=== /List brand

// //=== Details brand
export const detailsBrand = (brandId) => async (dispatch) => {
  dispatch({ type: BRAND_DETAILS_REQUEST });
  try {
    const { data } = await Axios.get(`/api/brands/${brandId}`);
    dispatch({ type: BRAND_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BRAND_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// //=== /Details brand

// //=== /Delete brand
export const deleteBrand = (brandId) => async (dispatch, getState) => {
  dispatch({ type: BRAND_DELETE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/brands/delete/${brandId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BRAND_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BRAND_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// //=== /Delete brand

// //=== /Edit brand
export const editBrand = (brandId, brandInfo) => async (dispatch, getState) => {
  dispatch({ type: BRAND_EDIT_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/brands/edit/${brandId}`, brandInfo, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BRAND_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BRAND_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// //=== /Edit brand
