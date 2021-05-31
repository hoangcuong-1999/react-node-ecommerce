import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  brandCreateReducer,
  brandDeleteReducer,
  brandDetailsReducer,
  brandEditReducer,
  brandListReducer,
} from "./reducers/brandReducer";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryEditReducer,
  categoryListReducer,
} from "./reducers/categoryReducer";
import {
  contactCreateReducer,
  contactDeleteReducer,
  contactListReducer,
} from "./reducers/contactReducer";
import {
  orderConfirmReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  orderListAllReducer,
  orderListReducer,
} from "./reducers/orderReducer";
import {
  productAddReducer,
  productDeleteReducer,
  productDetailsReducer,
  productEditReducer,
  productListReducer,
  searchListReducer,
  typeListReducer,
} from "./reducers/productReducers";
import {
  saleoffAddReducer,
  saleoffListReducer,
} from "./reducers/saleoffReducer";
import { userProfileReducer } from "./reducers/userProfileReducer";
import {
  userDeleteReducer,
  userListReducer,
  userSigninReducer,
} from "./reducers/userReducer";

const preloadState = {
  userSignin: {
    userInfo: localStorage.getItem("adminInfo")
      ? JSON.parse(localStorage.getItem("adminInfo"))
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
  typeList: typeListReducer,
  productDetails: productDetailsReducer,
  userSignin: userSigninReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  contactCreate: contactCreateReducer,
  contactList: contactListReducer,
  contactDelete: contactDeleteReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderListAll: orderListAllReducer,
  orderConfirm: orderConfirmReducer,
  orderDelete: orderDeleteReducer,
  userProfile: userProfileReducer,
  searchList: searchListReducer,
  productAdd: productAddReducer,
  productDelete: productDeleteReducer,
  productEdit: productEditReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryEdit: categoryEditReducer,
  categoryDetails: categoryDetailsReducer,
  brandCreate: brandCreateReducer,
  brandList: brandListReducer,
  brandDelete: brandDeleteReducer,
  brandEdit: brandEditReducer,
  brandDetails: brandDetailsReducer,
  saleoffList: saleoffListReducer,
  saleoffAdd: saleoffAddReducer,
});

// update compose()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  preloadState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
