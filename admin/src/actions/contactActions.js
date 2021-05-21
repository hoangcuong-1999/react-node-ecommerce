import {
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_DELETE_FAIL,
  SEND_CONTACT_MESSAGE_FAIL,
  SEND_CONTACT_MESSAGE_REQUEST,
  SEND_CONTACT_MESSAGE_SUCCESS,
} from "../constants/contactConstants";
import Axios from "axios";

export const createContact = (contactObj) => async (dispatch) => {
  dispatch({ type: SEND_CONTACT_MESSAGE_REQUEST });
  try {
    const { data } = await Axios.post("/api/contacts", contactObj);
    dispatch({ type: SEND_CONTACT_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEND_CONTACT_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listContact = () => async (dispatch, getState) => {
  dispatch({ type: CONTACT_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/contacts", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteContact = (contactId) => async (dispatch, getState) => {
  dispatch({ type: CONTACT_DELETE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: CONTACT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
