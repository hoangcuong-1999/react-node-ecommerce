import {
  RATING_COMMENTS_FAIL,
  RATING_COMMENTS_REQUEST,
  RATING_COMMENTS_RESET,
  RATING_COMMENTS_SUCCESS,
  RATING_FAIL,
  RATING_LIST_FAIL,
  RATING_LIST_REQUEST,
  RATING_LIST_SUCCESS,
  RATING_REQUEST,
  RATING_RESET,
  RATING_SUCCESS,
} from "../constants/ratingConstants";

//=== Post rating
export const ratingReducer = (state = {}, action) => {
  switch (action.type) {
    case RATING_REQUEST:
      return { loading: true };
    case RATING_SUCCESS:
      return { loading: false, createdRating: action.payload };
    case RATING_FAIL:
      return { loading: false, error: action.payload };
    case RATING_RESET:
      return {};
    default:
      return state;
  }
};

//=== Get ratings list based on orderId
export const ratingListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case RATING_LIST_REQUEST:
      return { loading: true };
    case RATING_LIST_SUCCESS:
      return { loading: false, ratings: action.payload };
    case RATING_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//=== Get comment list
export const ratingCommentsList = (state = {}, action) => {
  switch (action.type) {
    case RATING_COMMENTS_REQUEST:
      return { loading: true };
    case RATING_COMMENTS_SUCCESS:
      return { loading: false, ratings: action.payload };
    case RATING_COMMENTS_FAIL:
      return { loading: false, error: action.payload };
    case RATING_COMMENTS_RESET:
      return {};
    default:
      return state;
  }
};
