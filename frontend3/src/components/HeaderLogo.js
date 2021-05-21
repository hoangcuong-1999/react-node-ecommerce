import React from "react";
import Search from "./Search";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HeaderLogo() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-3">
          <div className="header__logo">
            <Link to="/">
              <img src="/assets/img/logo.png" alt="" />
            </Link>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="header__menu">
            <ul>
              <li>
                <NavLink
                  exact
                  to="/"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shipping"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Shipping
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/checkout"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Checkout
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  activeStyle={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-3">
          <div className="header__option">
            <div className="header__option__icon">
              <span>
                <Link to="/cart">
                  <img src="/assets/img/icon/carts.png" alt="cart-icon" />
                </Link>
                <span className="header__option__icon__qty">
                  {cartItems.length}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <row>
        <div className="col-lg-2 col-md-2"></div>
        <div className="col-lg-8 col-md-8 m-auto">
          <Search />
        </div>
        <div className="col-lg-2 col-md-2"></div>
      </row>
    </div>
  );
}

export default HeaderLogo;
