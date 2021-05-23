import React, { useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { orderByPaypal, placeOrder } from "../actions/orderActions";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import Swal from "sweetalert2";
import PayPalButtonV2 from "./PayPalButtonV2";
import { RESET_PROFILE_SUCCESS_PROP } from "../constants/userProfileConstants";
import { Link } from "react-router-dom";

function CheckoutPage(props) {
  // const [paidFor, setPaidFor] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    activePayment: { id: 1, name: "payment In Cash" },
    payments: [
      { id: 1, name: "payment In Cash" },
      { id: 2, name: "Paypal" },
    ],
  });

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success, order } = orderCreate;

  const dispatch = useDispatch();

  // START Change userProfile's success=false when success=true to reset toastify when enter profile page
  const { success: userProfileSuccess } = useSelector(
    (state) => state.userProfile
  );
  useEffect(() => {
    if (userProfileSuccess) dispatch({ type: RESET_PROFILE_SUCCESS_PROP });
  }, [userProfileSuccess, dispatch]);
  // END Change userProfile's success=false when success=true to reset toastify when enter profile page

  useEffect(() => {
    if (shippingAddress === null) return props.history.push("/shipping");
    if (!cart.cartItems.length) return props.history.push("/shipping");
    dispatch(savePaymentMethod(paymentMethod.activePayment));
  }, [
    shippingAddress,
    paymentMethod.activePayment,
    dispatch,
    props.history,
    success,
    order,
    cart.cartItems.length,
  ]);

  const changeActivePaymentHandler = (payment) => {
    setPaymentMethod({
      ...paymentMethod,
      activePayment: payment,
    });
    dispatch(savePaymentMethod(payment));
  };

  cart.cartTotal = cart.cartItems.reduce(
    (a, item) => a + item.price * item.qty,
    0
  );

  const onSuccess = (details, data) => {
    dispatch(orderByPaypal({ ...cart }));
    props.history.push(`/thankyou`);
  };

  const placeOrderHandler = () => {
    // If user click on this button means payment in cash, so change active method:
    paymentMethod.activePayment = paymentMethod.payments[0];
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to place order now ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Not yet",
    }).then((result) => {
      if (result.value) {
        // Swal.fire("Success!", "Your order is placed successfully.", "success");
        dispatch(placeOrder({ ...cart }));
        // props.history.push(`/thankyou`);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your order has been canclled.", "error");
      }
    });
  };

  return (
    <>
      <CheckoutSteps step1Success step2Success step3InProgress step4Next />;
      {loading && <LoadingBox />}
      {error && <ErrorBox>{error}</ErrorBox>}
      <section className="shipping__info">
        <div className="container">
          <div className="shipping__info__content">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="shipping__info__title">
                  <h2>Shipping Info</h2>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="shipping__info__first">
                    <p>{shippingAddress && shippingAddress.name} (+84)</p>
                    <p>{shippingAddress && shippingAddress.phone}</p>
                  </div>
                  <div className="shipping__info__second">
                    <span>{shippingAddress && shippingAddress.city}</span>,{" "}
                    <span>{shippingAddress && shippingAddress.province}</span>,{" "}
                    <span>{shippingAddress && shippingAddress.address}</span>
                  </div>
                  <div className="shipping__info__third">
                    <Link to="/shipping">Change</Link>
                    {/* <button onClick={handleClick}>Change</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="checkout">
        <div className="container">
          <div className="checkout__content">
            <h2 className="checkout__title__1">YOUR ORDER</h2>
            {/* cart items start */}
            <div className="checkout__cart__items">
              <table>
                <tr>
                  <th className="number">#</th>
                  <th className="name">Name</th>
                  <th className="quantity">Quantity</th>
                  <th className="size">Size</th>
                  <th className="color">Color</th>
                  <th className="subtotal">Subtotal</th>
                </tr>
                {cart.cartItems.map((item, index) => (
                  <tr>
                    <td>{index + 1}.</td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.size}</td>
                    <td>{item.color}</td>
                    <td>${item.price * item.qty}</td>
                  </tr>
                ))}
              </table>
            </div>
            {/* cart items end */}
            <div className="checkout__payment__method">
              <div className="checkout__payment__method__title">
                Payment method
              </div>
              {paymentMethod.payments.map((payment) => (
                <button
                  className={
                    JSON.stringify(payment) ===
                      JSON.stringify(paymentMethod.activePayment) && "active"
                  }
                  key={payment.id}
                  onClick={() => changeActivePaymentHandler(payment)}
                >
                  {payment.name}
                </button>
              ))}
            </div>
            {paymentMethod.activePayment.id === 2 && (
              <div className="paypal__payment__method">
                <PayPalButtonV2 amount={0.01} onSuccess={onSuccess} />
              </div>
            )}

            <ul className="checkout__total__all">
              <li>
                Item(s)<span>{cart.cartItems.length}</span>
              </li>
              <li>
                Total<span>$ {cart.cartTotal.toFixed(2)}</span>
              </li>
            </ul>
            <button onClick={placeOrderHandler}>Place Order</button>
            {loading && <LoadingBox />}
            {error && <ErrorBox>{error}</ErrorBox>}
          </div>
        </div>
      </section>
    </>
  );
}

export default CheckoutPage;
