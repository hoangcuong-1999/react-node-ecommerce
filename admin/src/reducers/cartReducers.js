import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  QUANTITY_DECREASE,
  QUANTITY_INCREASE,
} from "../constants/cartConstants";
import { USER_SIGNOUT } from "../constants/userConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // Get item in for
      const item = action.payload;
      // Check if item exist
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        // replace old item with entire new item in cartItems array
        return {
          // Copy tất cả các thuộc tính của state => cartItems:
          ...state,
          // Thay đổi giá trị của thuộc tính cartItems:
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // Add new item to cartItems array
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case QUANTITY_INCREASE:
      const { productId, qty } = action.payload;

      // Find product with productId
      const product = state.cartItems.find((x) => x.product === productId);

      if (Number(qty) < product.countInStock) {
        // Increase quantity on this product
        const newQty = Number(qty) + 1;
        const newProduct = {
          ...product,
          // update quantity
          qty: newQty,
        };

        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === productId ? newProduct : x
          ),
        };
      } else {
        return {
          ...state,
        };
      }

    case QUANTITY_DECREASE:
      const { productId2, qty2 } = action.payload;

      // Find product with productId
      const product2 = state.cartItems.find((x) => x.product === productId2);

      if (Number(qty2) > 1) {
        // Decrease quantity on this product
        const newQty2 = Number(qty2) - 1;
        const newProduct2 = {
          ...product2,
          // update quantity
          qty: newQty2,
        };

        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === productId2 ? newProduct2 : x
          ),
        };
      } else {
        return {
          ...state,
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case USER_SIGNOUT:
      return {
        ...state,
        cartItems: [],
        shippingAddress: null,
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload.name,
      };
    case CART_RESET:
      localStorage.removeItem("cartItems");
      return {
        ...state,
        cartItems: [],
        cartTotal: 0,
        paymentMethod: null,
      };

    default:
      return state;
  }
};
