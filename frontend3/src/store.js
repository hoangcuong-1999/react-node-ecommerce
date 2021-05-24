import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { brandListReducer } from "./reducers/brandReducer";
import { cartReducer } from "./reducers/cartReducers";
import { categoryListReducer } from "./reducers/categoryReducer";
import { contactCreateReducer } from "./reducers/contactReducer";
import {
  orderCancleReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./reducers/orderReducer";
import {
  productDetailsReducer,
  productListReducer,
  typeListReducer,
} from "./reducers/productReducers";
import {
  ratingListReducer,
  // ratingCommentsList,
  // ratingListReducer,
  ratingReducer,
} from "./reducers/ratingReducer";
import { userProfileReducer } from "./reducers/userProfileReducer";
import { userRegisterReducer, userSigninReducer } from "./reducers/userReducer";

const preloadState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : null,
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  userProfile: {
    data: localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : {},
  },
};

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  contactCreate: contactCreateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderCreate: orderCreateReducer,
  orderCancle: orderCancleReducer,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  userProfile: userProfileReducer,
  categoryList: categoryListReducer,
  brandList: brandListReducer,
  typeList: typeListReducer,
  rating: ratingReducer,
  ratingList: ratingListReducer,
  // ratingComments: ratingCommentsList,
});

// update compose()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  preloadState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
