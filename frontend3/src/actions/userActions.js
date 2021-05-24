import Axios from "axios";
import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";
import { getProfileInfo } from "../actions/userProfileActions";

export const signin = (email, password) => async (dispatch, getState) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    // Get Profile info after successfully signin
    dispatch(getProfileInfo());
    localStorage.setItem(
      "userInfo",
      JSON.stringify(getState().userSignin.userInfo)
    );
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("userProfile");
  dispatch({ type: USER_SIGNOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// getState() trả về Object => có thể constructuring properties
export const resetPassword =
  (currentPwd, newPwd) => async (dispatch, getState) => {
    dispatch({ type: PASSWORD_RESET_REQUEST });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(
        "/api/users/change-password",
        { currentPwd, newPwd },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PASSWORD_RESET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
