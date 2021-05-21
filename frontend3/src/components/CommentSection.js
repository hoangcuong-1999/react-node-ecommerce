import axios from "axios";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import Pagination from "./Pagination";
import { filterCmtBtn } from "../utils";

function CommentSection({ productId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);
  const [cmtPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [activePageNumber, setActivePageNumber] = useState(1);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const { data } = await axios.get(`/api/ratings/comments/${productId}`);
      setLoading(false);
      setComments(data);
    };
    fetchComments();
  }, [productId]);

  const getBtnClass = (n) => {
    if (activeBtn === n) return "active";
    return "";
  };

  const indexOfLastCmt = currentPage * cmtPerPage;
  const indexOfFirstCmt = indexOfLastCmt - cmtPerPage;
  const tempCmts =
    activeBtn === 0
      ? comments
      : comments.filter((item) => item.point === activeBtn);
  const currentCmts = tempCmts.slice(indexOfFirstCmt, indexOfLastCmt);

  const totalPages = [];
  for (let i = 1; i <= Math.ceil(tempCmts.length / cmtPerPage); i++)
    totalPages.push(i);

  const setPageHandler = (number) => {
    setCurrentPage(number);
    setActivePageNumber(number);
  };

  const calculateStars = (cmts) => {
    const avg =
      cmts && cmts.reduce((a, item) => a + item.point, 0) / cmts.length;
    return avg.toFixed(1);
  };

  return (
    <>
      <div className="product__details__rating">
        <div className="container">
          <div className="rating__box">
            <div className="rating__box__title">
              <div>Rating Product</div>
            </div>
            {!comments.length ? (
              <div className="rating__box__empty">
                <div className="box__empty__icon">
                  <img src="/assets/img/icon/no-rating.png" alt="" />
                </div>
                <div className="box_empty_text">There is no rating yet</div>
              </div>
            ) : (
              <div className="rating__box__options d-flex">
                <div className="box__options__point">
                  <div className="point__number">
                    <span>{calculateStars(comments)}</span> per 5
                  </div>
                  <div className="point__stars">
                    <i
                      className={
                        calculateStars(comments) >= 1
                          ? "fa fa-star"
                          : calculateStars(comments) >= 0.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                      }
                    ></i>
                    <i
                      className={
                        calculateStars(comments) >= 2
                          ? "fa fa-star"
                          : calculateStars(comments) >= 1.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                      }
                    ></i>
                    <i
                      className={
                        calculateStars(comments) >= 3
                          ? "fa fa-star"
                          : calculateStars(comments) >= 2.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                      }
                    ></i>
                    <i
                      className={
                        calculateStars(comments) >= 4
                          ? "fa fa-star"
                          : calculateStars(comments) >= 3.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                      }
                    ></i>
                    <i
                      className={
                        calculateStars(comments) >= 5
                          ? "fa fa-star"
                          : calculateStars(comments) >= 4.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                      }
                    ></i>
                  </div>
                </div>
                <div className="box__options__filter">
                  {filterCmtBtn.map((item) => (
                    <button
                      className={getBtnClass(item.index)}
                      onClick={() => {
                        setActiveBtn(item.index);
                        setCurrentPage(1);
                        setActivePageNumber(1);
                      }}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tempCmts.length ? (
              <>
                {" "}
                <Comments comments={currentCmts} loading={loading} />
                <Pagination
                  setPageHandler={setPageHandler}
                  totalPages={totalPages}
                  activePageNumber={activePageNumber}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setActivePageNumber={setActivePageNumber}
                />
              </>
            ) : comments.length ? (
              <div className="rating__box__empty">
                <div className="box__empty__icon">
                  <img src="/assets/img/icon/no-rating.png" alt="" />
                </div>
                <div className="box_empty_text">There is no rating.</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentSection;
