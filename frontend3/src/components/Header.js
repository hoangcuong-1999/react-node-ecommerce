import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Search from "./Search";
import { signout } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";

function Header(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    const headerBottom = document.querySelector(".header--bottom");
    const sticky = headerBottom.offsetTop;
    // event scroll
    const scrollHandler = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        headerBottom.classList.add("sticky");
      } else {
        headerBottom.classList.remove("sticky");
      }
    });
    // Cleaning up event
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header id="header">
      <div className="header--middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className="header--middle__logo">
                <Link to="/">
                  Fashion<i class="fas fa-square-full"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="header--middle__search">
                <Search />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="header--middle__option">
                <div className="login">
                  <div className="login__content d-flex align-items-center">
                    <img src="/assets/img/icon/person.png" alt="" />
                    <div className="text">
                      <div>{userInfo ? "Account" : "Sigin/Signup"} </div>
                      <div>
                        {userInfo ? userInfo.name : "Account"}{" "}
                        <i class="fas fa-caret-down"></i>
                      </div>
                    </div>

                    {userInfo ? (
                      <div className="login__content__dropdown signedin">
                        <Link to="/user/account">My account</Link>
                        <Link to="/order-history">Order history</Link>
                        <Link to="#" onClick={signoutHandler}>
                          Sign out
                        </Link>
                      </div>
                    ) : (
                      <div className="login__content__dropdown">
                        <Link to="/signin">Signin</Link>
                        <Link to="/register">Signup</Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="cart d-flex">
                  <Link to="/cart">
                    <img src="/assets/img/icon/white-cart.png" alt="" />
                  </Link>
                  <span className="cart__number">{cartItems.length}</span>
                  <span className="align-self-end">Cart</span>

                  {cartItems.length ? (
                    <div className="dropdown">
                      <div className="dropdown__title">Added products</div>
                      <div className="items">
                        {cartItems.map((product) => (
                          <Link to="/cart">
                            <div className="item">
                              <div className="item__img">
                                <img src={`/uploads/${product.image}`} alt="" />
                              </div>
                              <div className="item__name">{product.name}</div>
                              <div className="item__price">
                                ${product.price}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="dropdown__btn">
                        <Link to="/cart">Go to cart</Link>
                      </div>
                    </div>
                  ) : (
                    <div className="dropdown empty">
                      <img src="/assets/img/icon/no-rating.png" alt="" />
                      Empty cart
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header--bottom">
        <div className="container">
          <div className="header--bottom__menu">
            <ul>
              <li className={props.location.pathname === "/" && "active"}>
                <Link to="/">
                  <i class="fas fa-home"></i>
                </Link>
              </li>
              <li className={props.location.pathname === "/shop" && "active"}>
                <Link to="/shop">Shop</Link>
              </li>
              <li className={props.location.pathname === "/cart" && "active"}>
                <Link to="/cart">Cart</Link>
              </li>
              <li
                className={props.location.pathname === "/shipping" && "active"}
              >
                <Link to="/checkout">Checkout</Link>
              </li>
              <li
                className={props.location.pathname === "/contact" && "active"}
              >
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
