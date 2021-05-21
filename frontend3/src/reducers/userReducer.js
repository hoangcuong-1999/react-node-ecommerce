import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_REMOVE_SUCCESS_PROP,
  PASSWORD_CLEAR_MESSAGE,
} from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        success: true,
        error: null,
      };
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PASSWORD_REMOVE_SUCCESS_PROP:
      return {
        ...state,
        success: false,
      };
    case PASSWORD_CLEAR_MESSAGE:
      return {
        userInfo: state.userInfo,
      };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
