import React from "react";
import BreadCrum from "./BreadCrum";
import { Link } from "react-router-dom";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

function CartPage(props) {
  // Is component rerender when store changes ==> YES
  // Since the reference of data changes, the useSelector function returns you a new value and re-renders the component.
  // Does dispatching an action cause the selectors to rerun? The action I was dispatching in the example does not modify state whatsoever? => yes, dispatching will trigger selectors who in turn will compare previous selection with current and if different will cause a rerender. probably in your selector you return a new reference all the time - what is your selector look like?
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const handleClick = () => {
    props.history.push("/signin?redirect=shipping");
  };

  const signInHandler = () => {
    props.history.push("/signin");
  };
  const signUpHandler = () => {
    props.history.push("/register");
  };

  const goShoppingHandler = () => {
    props.history.push("/shop");
  };

  /* Cart total calculation */
  const totalPrice = cartItems.reduce(
    (a, item) => a + item.price * item.qty,
    0
  );

  return (
    <>
      <BreadCrum currenLink="Shopping Cart" />
      {/* Shopping cart section */}
      {cartItems.length ? (
        <section className="shopping__cart">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="shopping__cart__table">
                  <table>
                    <thead>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr>
                          <td className="shopping__cart__item">
                            <div className="shopping__cart__item__pic">
                              <Link to={`/product/${item.slug}`}>
                                <img src={`/uploads/${item.image}`} alt="" />
                              </Link>
                            </div>
                            <div className="shopping__cart__item__text">
                              <h6>{item.name}</h6>
                              <h5>${item.price}</h5>
                            </div>
                          </td>
                          <td className="shopping__cart__quantity">
                            <div className="shopping__cart__quantity__inner">
                              <span
                                class="fas fa-angle-left"
                                onClick={() => {
                                  dispatch(decreaseQty(item.product, item.qty));
                                }}
                              ></span>
                              <input type="text" value={item.qty} />
                              <span
                                class="fas fa-angle-right"
                                onClick={() => {
                                  dispatch(increaseQty(item.product, item.qty));
                                }}
                              ></span>
                            </div>
                          </td>
                          <td className="shopping__cart__total">
                            <div>$ {(item.qty * item.price).toFixed(2)}</div>
                          </td>
                          <td className="shopping__cart__remove">
                            <div
                              className="shopping__cart__remove__inner"
                              onClick={() => {
                                dispatch(removeFromCart(item.product));
                              }}
                            >
                              <span className="fas fa-times"></span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="continue__btn">
                      <Link to="/shop">Continue Shopping</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="cart__total">
                  <h6>CART TOTAL</h6>
                  <ul>
                    <li>
                      Item(s)<span>{cartItems.length}</span>
                    </li>
                    <li>
                      Total<span>$ {totalPrice.toFixed(2)}</span>
                    </li>
                  </ul>

                  <button
                    to="#"
                    onClick={handleClick}
                    disabled={cartItems.length === 0}
                    className={
                      cartItems.length === 0 ? "not__allow__cursor" : ""
                    }
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="cart__empty">
          <div className="cart__empty__content">
            <div className="d-flex flex-row">
              <div className="cart__empty__content__icon">
                <img src="/assets/img/icon/empty-cart.png" alt="" />
              </div>
              <div className="cart__empty__content__text">
                <h2>Your cart is empty</h2>
                <div className="buttons">
                  <button onClick={signInHandler}>
                    Signin to your account
                  </button>
                  <button onClick={signUpHandler}>Sign up now</button>
                </div>
                <h2>or</h2>
                <button onClick={goShoppingHandler}>Go shopping now</button>
              </div>
            </div>
          </div>
          <div className="cart__empty__content cart__empty__blank"></div>
        </section>
      )}
    </>
  );
}

export default CartPage;
