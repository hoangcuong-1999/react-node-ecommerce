import {
  RESET_SEND_CONTACT_SUCCESS,
  SEND_CONTACT_MESSAGE_FAIL,
  SEND_CONTACT_MESSAGE_REQUEST,
  SEND_CONTACT_MESSAGE_SUCCESS,
} from "../constants/contactConstants";

export const contactCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_CONTACT_MESSAGE_REQUEST:
      return { loading: true };
    case SEND_CONTACT_MESSAGE_SUCCESS:
      return { loading: false, success: true, createdcontact: action.payload };
    case SEND_CONTACT_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    case RESET_SEND_CONTACT_SUCCESS:
      return {};
    default:
      return state;
  }
};
