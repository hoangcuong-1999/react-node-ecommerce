import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// When use click on any product card, that product will pass into this component. Then we use that info to process this component
function Product(props) {
  return (
    <div className="product__card">
      <ToastContainer />
      <div className="product__card__pic">
        <Link to={`/product/${props.product.slug}?pid=${props.product._id}`}>
          <img src={`/uploads/${props.product.image}`} alt="" />
        </Link>
      </div>
      <div className="product__card__text">
        <h6>{props.product.name}</h6>
        <Rating
          rating={props.product.rating}
          numReviews={props.product.numReviews}
        />
        <h5>$ {props.product.price}</h5>
      </div>
    </div>
  );
}

export default Product;
