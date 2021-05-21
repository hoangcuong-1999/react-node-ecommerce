// FOR REFERENCE, NOT USE YET
import React, { useRef, useEffect } from "react";

function PayPalBtn(props) {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Cool T Shirt",
                amount: {
                  value: props.amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          // const order = await actions.order.capture();
          props.onApprove();
          //  console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [[props]]);

  return <div ref={paypal}></div>;
}

export default PayPalBtn;
