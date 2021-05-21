import React from "react";
import LoadingBox from "./LoadingBox";

function Comments({ comments, loading }) {
  if (loading) {
    return <LoadingBox />;
  }

  return (
    <>
      {comments &&
        comments.map((cmt) => (
          <div className="rating__box__comments">
            <div className="rating__box__comment d-flex">
              <div className="box__comment__avatar">
                <img src="/assets/img/icon/profile.png" alt="" />
              </div>
              <div className="box__comment__text">
                <div className="author__info">
                  <h6 className="author__info__name">{cmt.order.user.name}</h6>
                  <div className="author__info__ratingStars">
                    <i
                      class={cmt.point >= 1 ? "fas fa-star" : "far fa-star"}
                    ></i>
                    <i
                      class={cmt.point >= 2 ? "fas fa-star" : "far fa-star"}
                    ></i>
                    <i
                      class={cmt.point >= 3 ? "fas fa-star" : "far fa-star"}
                    ></i>
                    <i
                      class={cmt.point >= 4 ? "fas fa-star" : "far fa-star"}
                    ></i>
                    <i
                      class={cmt.point >= 5 ? "fas fa-star" : "far fa-star"}
                    ></i>
                  </div>
                </div>
                <div className="author__comment">{cmt.comment}</div>
                <div className="author__time">{cmt.createdAt}</div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Comments;
