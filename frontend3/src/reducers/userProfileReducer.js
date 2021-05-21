import { USER_SIGNOUT } from "../constants/userConstants";
import {
  SAVE_USER_PROFILE_REQUEST,
  SAVE_USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  RESET_PROFILE_SUCCESS_PROP,
} from "../constants/userProfileConstants";

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SAVE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case SAVE_USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RESET_PROFILE_SUCCESS_PROP:
      return {
        ...state,
        success: false,
      };
    case GET_USER_PROFILE_REQUEST:
      return { loading: true };
    case GET_USER_PROFILE_SUCCESS:
      localStorage.setItem("userProfile", JSON.stringify(action.payload));
      return { loading: false, data: action.payload };
    case GET_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
