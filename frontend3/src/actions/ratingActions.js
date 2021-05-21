import {
  RATING_COMMENTS_FAIL,
  RATING_COMMENTS_REQUEST,
  RATING_COMMENTS_SUCCESS,
  RATING_FAIL,
  RATING_LIST_FAIL,
  RATING_LIST_REQUEST,
  RATING_LIST_SUCCESS,
  RATING_REQUEST,
  RATING_SUCCESS,
} from "../constants/ratingConstants";
import Axios from "axios";

//=== Post rating
export const postRating = (ratingInfo) => async (dispatch, getState) => {
  dispatch({ type: RATING_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/ratings", ratingInfo, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RATING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get list of rating based on orderId
export const listRating = (orderId) => async (dispatch, getState) => {
  dispatch({ type: RATING_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/ratings/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: RATING_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RATING_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//=== Get rating comments
export const listRatingComments = (productId) => async (dispatch) => {
  dispatch({ type: RATING_COMMENTS_REQUEST });
  try {
    const { data } = await Axios.get(`/api/ratings/comments/${productId}`);
    dispatch({ type: RATING_COMMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RATING_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
