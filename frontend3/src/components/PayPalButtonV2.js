import { PayPalButton } from "react-paypal-button-v2";

import React from "react";

function PayPalButtonV2(props) {
  return (
    <PayPalButton
      amount={props.amount}
      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={props.onSuccess}
    />
  );
}

export default PayPalButtonV2;
