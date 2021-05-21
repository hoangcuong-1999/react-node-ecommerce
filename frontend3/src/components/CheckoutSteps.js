import React from "react";

function CheckoutSteps(props) {
  return (
    <div className="checkout__steps">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 p-0">
            <div className="checkout">
              <div className="checkout__img">
                <img src="/assets/img/icon/login.png" alt="" />
              </div>
              <div className="checkout__status">
                {props.step1Success ? (
                  <i class="fas fa-check"></i>
                ) : props.step1InProgress ? (
                  <i class="fas fa-sync-alt"></i>
                ) : (
                  <i class="fas fa-times"></i>
                )}
              </div>
              <div className="check__text">
                <span>Sign-in</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 p-0">
            <div className="checkout">
              <div className="checkout__img">
                <img src="/assets/img/icon/delivery-truck.png" alt="" />
              </div>
              <div className="checkout__status">
                {props.step2Success ? (
                  <i class="fas fa-check"></i>
                ) : props.step2InProgress ? (
                  <i class="fas fa-sync-alt"></i>
                ) : (
                  <i class="fas fa-times"></i>
                )}
              </div>
              <div className="check__text">
                <span>Shipping</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 p-0">
            <div className="checkout">
              <div className="checkout__img">
                <img src="/assets/img/icon/credit-card.png" alt="" />
              </div>
              <div className="checkout__status">
                {props.step3Success ? (
                  <i class="fas fa-check"></i>
                ) : props.step3InProgress ? (
                  <i class="fas fa-sync-alt"></i>
                ) : (
                  <i class="fas fa-times"></i>
                )}
              </div>
              <div className="check__text">
                <span>Checkout</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 p-0">
            <div className="checkout">
              <div className="checkout__img">
                <img src="/assets/img/icon/order.png" alt="" />
              </div>
              <div className="checkout__status">
                {props.step4Success ? (
                  <i class="fas fa-check"></i>
                ) : props.step4InProgress ? (
                  <i class="fas fa-sync-alt"></i>
                ) : (
                  <i class="fas fa-times"></i>
                )}
              </div>
              <div className="check__text">
                <span>Result</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSteps;
