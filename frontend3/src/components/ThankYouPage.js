import React from "react";
import CheckoutSteps from "./CheckoutSteps";

function ThankYouPage() {
  return (
    <>
      <CheckoutSteps step1Success step2Success step3Success step4Success />;
      <section className="thankyou">
        <div className="container">
          <div className="d-flex flex-column align-items-center">
            <div className="thankyou__icon">
              <img src="/assets/img/icon/checked.png" alt="" />
            </div>
            <div className="thankyou__message">Thank you for your order.</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ThankYouPage;
