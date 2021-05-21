import {
  CONTACT_LIST_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  RESET_SEND_CONTACT_SUCCESS,
  SEND_CONTACT_MESSAGE_FAIL,
  SEND_CONTACT_MESSAGE_REQUEST,
  SEND_CONTACT_MESSAGE_SUCCESS,
  CONTACT_DELETE_RESET,
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

export const contactListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return { loading: true };
    case CONTACT_LIST_SUCCESS:
      return { loading: false, contacts: action.payload };
    case CONTACT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_DELETE_REQUEST:
      return { loading: true };
    case CONTACT_DELETE_SUCCESS:
      return { loading: false, deletedContact: action.payload };
    case CONTACT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
