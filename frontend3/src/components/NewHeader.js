import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import Search from "./Search";

function NewHeader() {
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
      <div className="header--top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header--top__left">
                <span>
                  <i class="fas fa-mobile-alt"></i> Hotline: (+123) 456 789
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header--top__right">
                <ul>
                  <li>
                    <Link to="/signin">Signin</Link>
                  </li>
                  <li>
                    <Link to="/register">Signup</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header--middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header--middle__logo">
                <img src="/assets/img/logo.png" alt="logo" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="header--middle__search">
                <Search />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="header--middle__option">
                <Link to="/cart">
                  <img src="/assets/img/icon/add-to-basket.png" alt="cart" />
                  <span>1</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header--bottom">
        <div className="container">
          <div className="header--bottom__menu">
            <ul>
              <li className="active">
                <Link to="/">
                  <i class="fas fa-home"></i>
                </Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NewHeader;
