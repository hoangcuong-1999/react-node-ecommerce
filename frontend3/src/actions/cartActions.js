import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  QUANTITY_DECREASE,
  QUANTITY_INCREASE,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (productSlug, qty, size, color) => async (
  dispatch,
  getState
) => {
  const { data } = await Axios.get(`/api/products/${productSlug}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      slug: data.slug,
      size,
      color,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const increaseQty = (productId, qty) => (dispatch, getState) => {
  dispatch({ type: QUANTITY_INCREASE, payload: { productId, qty } });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const decreaseQty = (productId2, qty2) => (dispatch, getState) => {
  dispatch({ type: QUANTITY_DECREASE, payload: { productId2, qty2 } });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (shipping) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: shipping });
  localStorage.setItem("shippingAddress", JSON.stringify(shipping));
};

export const savePaymentMethod = (payment) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: payment });
};
