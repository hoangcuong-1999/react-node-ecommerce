import {
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
} from "../constants/brandConstants";
import Axios from "axios";

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
