import {
  SAVE_USER_PROFILE_REQUEST,
  SAVE_USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  // RESET_SUCCESS,
} from "../constants/userProfileConstants";
import Axios from "axios";

export const saveUserProfile = (userProfile) => async (dispatch, getState) => {
  dispatch({ type: SAVE_USER_PROFILE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/profiles", userProfile, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: SAVE_USER_PROFILE_SUCCESS, payload: data });
    localStorage.setItem("userProfile", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: SAVE_USER_PROFILE_FAIL, payload: error.message });
  }
};

// Get user profile info
export const getProfileInfo = () => async (dispatch, getState) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    const { data } = await Axios.get(`/api/profiles/mine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
