import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { listRating, postRating } from "../actions/ratingActions";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import Swal from "sweetalert2";
import { RATING_RESET } from "../constants/ratingConstants";

function RatingModal({ orderId, product }) {
  const ratingLevels = [
    {
      text: "Let us know your rating",
      star: 0,
      placeholder: "Sharing more about product info?",
    },
    {
      text: "Poor",
      star: 1,
      placeholder: "What's your problem you're running into?",
    },
    {
      text: "Fair",
      star: 2,
      placeholder: "What's your problem you're running into?",
    },
    {
      text: "Good",
      star: 3,
      placeholder: "What's your problem you're running into?",
    },
    {
      text: "Very Good",
      star: 4,
      placeholder: "What's your problem you're running into?",
    },
    { text: "Excelent", star: 5, placeholder: "Why do you love this product?" },
  ];
  const [hoverRating, setHoverRating] = useState(ratingLevels[0]);
  const [activeRating, setActiveRating] = useState(ratingLevels[0]);

  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const rating = useSelector((state) => state.rating);
  const { createdRating, loading, error } = rating;
  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      order: orderId,
      product: product.product,
      comment,
      point: activeRating.star,
      createdAt: new Date().toLocaleString(),
    };
    dispatch(postRating(data));
  };

  useEffect(() => {
    if (createdRating) {
      setModalOpen(false);
      Swal.fire(
        "Success!",
        "We are received your rating, thank you so much!",
        "success"
      );
      dispatch({ type: RATING_RESET });
      dispatch(listRating(orderId));
    }
  }, [createdRating, dispatch, orderId]);

  return (
    <>
      {/* <button onClick={onOpenModal}>Open modal</button> */}
      <span onClick={onOpenModal}>Write review</span>
      <Modal open={modalOpen} onClose={onCloseModal} center>
        <div id="rating-modal">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="d-flex">
                  <div className="imgBox">
                    <img src="/assets/img/product/product-1.png" alt="" />
                  </div>
                  <div className="product">
                    <div className="product__name">{product.name}</div>
                    <div className="product__brand">
                      Size: {product.size}, Color: {product.color}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="content__title">
                <div>
                  {activeRating.star === 0
                    ? hoverRating.text
                    : activeRating.text}
                </div>
              </div>
              <div className="content__point">
                <i
                  class={`${
                    activeRating.star >= 1
                      ? "fas fa-star fa-2x"
                      : hoverRating.star >= 1
                      ? "fas fa-star fa-2x"
                      : "far fa-star fa-2x"
                  }`}
                  onClick={() => setActiveRating(ratingLevels[1])}
                  onMouseEnter={() => setHoverRating(ratingLevels[1])}
                  onMouseLeave={() => setHoverRating(ratingLevels[0])}
                ></i>
                <i
                  class={`${
                    activeRating.star >= 2
                      ? "fas fa-star fa-2x"
                      : hoverRating.star >= 2
                      ? "fas fa-star fa-2x"
                      : "far fa-star fa-2x"
                  }`}
                  onClick={() => setActiveRating(ratingLevels[2])}
                  onMouseEnter={() => setHoverRating(ratingLevels[2])}
                  onMouseLeave={() => setHoverRating(ratingLevels[0])}
                ></i>
                <i
                  class={`${
                    activeRating.star >= 3
                      ? "fas fa-star fa-2x"
                      : hoverRating.star >= 3
                      ? "fas fa-star fa-2x"
                      : "far fa-star fa-2x"
                  }`}
                  onClick={() => setActiveRating(ratingLevels[3])}
                  onMouseEnter={() => setHoverRating(ratingLevels[3])}
                  onMouseLeave={() => setHoverRating(ratingLevels[0])}
                ></i>
                <i
                  class={`${
                    activeRating.star >= 4
                      ? "fas fa-star fa-2x"
                      : hoverRating.star >= 4
                      ? "fas fa-star fa-2x"
                      : "far fa-star fa-2x"
                  }`}
                  onClick={() => setActiveRating(ratingLevels[4])}
                  onMouseEnter={() => setHoverRating(ratingLevels[4])}
                  onMouseLeave={() => setHoverRating(ratingLevels[0])}
                ></i>
                <i
                  class={`${
                    activeRating.star >= 5
                      ? "fas fa-star fa-2x"
                      : hoverRating.star >= 5
                      ? "fas fa-star fa-2x"
                      : "far fa-star fa-2x"
                  }`}
                  onClick={() => setActiveRating(ratingLevels[5])}
                  onMouseEnter={() => setHoverRating(ratingLevels[5])}
                  onMouseLeave={() => setHoverRating(ratingLevels[0])}
                ></i>
              </div>
              <div className="content__comment">
                <textarea
                  rows="6"
                  placeholder={
                    activeRating.star === 0
                      ? hoverRating.placeholder
                      : activeRating.placeholder
                  }
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>

            {error && <ErrorBox>{error}</ErrorBox>}
            {loading ? (
              <LoadingBox />
            ) : (
              <div className="btn">
                <button type="submit">Send my rating</button>
              </div>
            )}
          </form>
        </div>
      </Modal>
    </>
  );
}

export default RatingModal;
