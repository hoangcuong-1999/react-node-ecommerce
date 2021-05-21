import {
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
