import Axios from "axios";
import {
  SALEOFF_ADD_FAIL,
  SALEOFF_ADD_REQUEST,
  SALEOFF_ADD_SUCCESS,
  SALEOFF_LIST_FAIL,
  SALEOFF_LIST_REQUEST,
  SALEOFF_LIST_SUCCESS,
} from "../constants/saleoffConstants";

// Add sale off
export const addSaleOff = (saleoff) => async (dispatch, getState) => {
  dispatch({ type: SALEOFF_ADD_REQUEST });
  try {
    const { data } = await Axios.post("/api/saleoff", saleoff);
    dispatch({ type: SALEOFF_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALEOFF_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// List sale offs
export const listSaleoff = () => async (dispatch, getState) => {
  dispatch({ type: SALEOFF_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/saleoff");
    dispatch({ type: SALEOFF_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALEOFF_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
