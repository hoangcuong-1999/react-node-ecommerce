import React, { useEffect, useState } from "react";
import { detailProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "./LoadingBox";
import Rating from "./Rating";
import Size from "./Size";
import Color from "./Color";
import { addToCart } from "../actions/cartActions";
import { CART_MESSAGE_RESET } from "../constants/cartConstants";
import Swal from "sweetalert2";
import ErrorBox from "./ErrorBox";
import CommentSection from "./CommentSection";

function ProductDetailsPage(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const cart = useSelector((state) => state.cart);
  const { success, warnMsg, informMsg } = cart;

  const parentGetSize = (size) => {
    setSize(size);
  };

  const parentGetColor = (color) => {
    setColor(color);
  };

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: productDetailsLoading,
    error: productDetailsError,
    product,
  } = productDetails;

  const productSlug = props.match.params.slug;
  const productId = props.location.search.split("=")[1];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailProduct(productSlug));
  }, [dispatch, productSlug, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart(productSlug, qty, size, color));
  };

  useEffect(() => {
    if (success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item added to cart successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (warnMsg) {
      Swal.fire({
        title: "No Update Found",
        text: "Operation can not be done! There is no change on this cart's item!",
        icon: "info",
      });
    } else if (informMsg) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cart's item updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // ComponentWillUnmout
    return () => {
      dispatch({ type: CART_MESSAGE_RESET });
    };
  }, [dispatch, success, warnMsg, informMsg]);

  return (
    <>
      {/* <div className="pt-5 min__height"> */}
      {productDetailsLoading ? (
        <LoadingBox />
      ) : productDetailsError ? (
        <div className="shop-details__error">
          <ErrorBox>{productDetailsError}</ErrorBox>
        </div>
      ) : (
        // Details section
        <section className="shop-details">
          <div className="product__details__pic">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="product__details__breadcrumb">
                    <Link to="/">Home</Link>
                    <i className="fas fa-angle-right"></i>
                    <Link to="/shop">Shop</Link>
                    <i className="fas fa-angle-right"></i>
                    <span>Product Details</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-3"></div>
                <div className="col-lg-6 col-md-9">
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="tabs-1"
                      role="tabpanel"
                    >
                      <div className="product__details__pic__item">
                        <img src={`/uploads/${product.image}`} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product__details__content">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8">
                  <div className="product__details__text">
                    <h4>{product.name}</h4>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    />
                    <div className="product__instock__status">
                      <span>Status: </span>
                      {product.countInStock > 0 ? (
                        <span className="success">In Stock</span>
                      ) : (
                        <span className="error">Unavailable</span>
                      )}
                    </div>

                    <div className="product__details__option">
                      <Size size={product.size} parentGetSize={parentGetSize} />
                      <Color
                        color={product.color}
                        parentGetColor={parentGetColor}
                      />
                    </div>
                    <div className="product__details__cart__option">
                      <div className="quantity">
                        <div className="pro-qty">
                          {product.countInStock === 0 ? (
                            <input type="text" value="0" disabled />
                          ) : (
                            <input
                              type="text"
                              value={qty}
                              onChange={(e) => {
                                setQty(e.target.value);
                              }}
                            />
                          )}
                        </div>
                      </div>
                      {qty > 0 && qty <= product.countInStock ? (
                        <button
                          className="primary-btn"
                          onClick={addToCartHandler}
                        >
                          add to cart
                        </button>
                      ) : (
                        <Link className="primary-btn disabled">
                          add to cart
                        </Link>
                      )}
                      {qty > product.countInStock ? (
                        <div className="out__of__stock">
                          Only {product.countInStock} item(s) available.
                        </div>
                      ) : qty <= 0 ? (
                        <div className="out__of__stock">
                          Invalid quantity input.
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="product__details__last__option">
                      <h5>
                        <span>Guaranteed Safe Checkout</span>
                      </h5>
                      <img
                        src="/assets/img/shop-details/details-payment.png"
                        alt=""
                      />
                      <ul>
                        <li>
                          <span>Brand:</span> {product.brand}
                        </li>
                        <li>
                          <span>Categories:</span> {product.category}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="product__details__tab">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          data-toggle="tab"
                          to="#tabs-5"
                          role="tab"
                        >
                          Description
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div
                        className="tab-pane active"
                        id="tabs-5"
                        role="tabpanel"
                      >
                        <div className="product__details__tab__content">
                          <p className="note text-center">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CommentSection productId={productId} />
        </section>
      )}
      {/* </div> */}
    </>
  );
}

export default ProductDetailsPage;
