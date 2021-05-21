import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { confirmOrder, getOrderDetails } from "../../actions/orderActions";
import {
  GET_ORDER_DETAILS_RESET,
  ORDER_CONFIRM_RESET,
} from "../../constants/orderConstants";

function OrderDetails(props) {
  const [status, setStatus] = useState("");
  const orderDetails = useSelector((state) => state.orderDetails);
  const { data: order, loading, error } = orderDetails;
  const orderConfirm = useSelector((state) => state.orderConfirm);
  const {
    updatedOrder,
    error: orderConfirmError,
    loading: orderConfirmLoading,
  } = orderConfirm;

  const dispatch = useDispatch();

  const orderId = props.match.params.id;
  useEffect(() => {
    if (!order) {
      dispatch(getOrderDetails(orderId));
    } else {
      setStatus(order.status);
    }
  }, [dispatch, orderId, order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(confirmOrder(orderId, status));
  };

  useEffect(() => {
    if (updatedOrder) {
      toast.success("Order confirmed successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: ORDER_CONFIRM_RESET });
    } else if (orderConfirmError) {
      toast.error("Error occurred, please try again !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [dispatch, updatedOrder, orderConfirmError]);

  //=== ComponentWillUnmount
  useEffect(() => {
    return () => {
      dispatch({ type: GET_ORDER_DETAILS_RESET });
    };
  }, [dispatch]);

  return (
    <>
      <section id="product-edit" className="admin-order-details">
        <ToastContainer />
        <Title>Order details</Title>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox>{error}</ErrorBox>
        ) : (
          <form className="product-add__form" onSubmit={handleSubmit}>
            <div className="product-add__form__content">
              <div className="row">
                <div className="col-lg-3">
                  <div className="shipping__info">
                    <h5>Shipping info</h5>
                  </div>
                </div>
              </div>

              <div className="seperator">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="title">Customer name</div>
                  </div>
                  <div className="col-lg-9">
                    <input
                      className="form-control"
                      disabled
                      value={order.shippingAddress.name}
                    />
                  </div>
                </div>
              </div>

              <div className="seperator">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="title">Phone number</div>
                  </div>
                  <div className="col-lg-9">
                    <input
                      className="form-control"
                      disabled
                      value={order.shippingAddress.phone}
                    />
                  </div>
                </div>
              </div>

              <div className="seperator">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="title">City</div>
                  </div>
                  <div className="col-lg-3">
                    <input
                      className="form-control"
                      disabled
                      value={order.shippingAddress.city}
                    />
                  </div>
                  <div className="col-lg-3">
                    <div className="title text-center">Province</div>
                  </div>
                  <div className="col-lg-3">
                    <input
                      className="form-control"
                      disabled
                      value={order.shippingAddress.province}
                    />
                  </div>
                </div>
              </div>

              <div className="seperator">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="title">Address</div>
                  </div>
                  <div className="col-lg-9">
                    <textarea
                      className="form-control order-details-textarea"
                      value={order.shippingAddress.address}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="seperator">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="title">Customer's Message</div>
                  </div>
                  <div className="col-lg-9">
                    <textarea
                      className="form-control order-details-textarea"
                      disabled
                      value={order.shippingAddress.orderNotes || ""}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3">
                  <div className="shipping__info">
                    <h5>Ordered items</h5>
                  </div>
                </div>
              </div>

              <div className="seperator">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="title">Items</div>
                  </div>
                  <div className="col-lg-9">
                    <table>
                      <tr>
                        <th className="order__item__count">#</th>
                        <th className="order__item__name">Product</th>
                        <th className="order__item__image">Image</th>
                        <th className="order__item__size">Size</th>
                        <th className="order__item__color">Color</th>
                        <th className="order__item__quantity">Quantity</th>
                        <th className="order__item__price">Price</th>
                      </tr>

                      {order.cartItems.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <div className="order__item__image__box">
                              <img src={`/uploads/${item.image}`} alt="" />
                            </div>
                          </td>
                          <td>{item.size}</td>
                          <td>{item.color}</td>
                          <td>{item.qty}</td>
                          <td>$ {item.price}</td>
                        </tr>
                      ))}
                    </table>
                    <div className="cart__total">
                      <p>
                        Cart total: <span>$ {order.cartTotal}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3">
                  <div className="shipping__info">
                    <h5>Payment info</h5>
                  </div>
                </div>
              </div>

              <div className="seperator">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="title">Payment method</div>
                  </div>
                  <div className="col-lg-9">
                    <input
                      className="form-control"
                      disabled
                      value={order.paymentMethod}
                    />
                  </div>
                </div>
              </div>

              <div className="seperator">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="title">Is paid</div>
                  </div>
                  <div className="col-lg-9">
                    {order.isPaid ? (
                      <img src="/assets/img/icon/ispaid-true.png" alt="" />
                    ) : (
                      <img src="/assets/img/icon/ispaid-false.png" alt="" />
                    )}
                  </div>
                </div>
              </div>

              <div className="order-details-form">
                <div className="order-details-form__status">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="title">Status</div>
                    </div>
                    <div className="col-lg-9">
                      {order.status !== "Cancled" ? (
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirm">Confirm</option>
                          <option value="Packed">Packed</option>
                          <option value="Transporting">Transporting</option>
                          <option value="Received">Received</option>
                          <option value="CancledByAdmin">Cancled</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          value="Customer already cancle this order"
                          disabled
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="order-details-form__buttons">
                  <div className="text-center">
                    <Link to={"/admin/dashboard/orders"}>
                      <button className="mt-4 mr-3 custom__button green">
                        Go back
                      </button>
                    </Link>
                    {orderConfirmLoading ? (
                      <LoadingBox />
                    ) : order.status !== "Cancled" ? (
                      <button
                        className="mt-4 ml-3 btn btn-primary blue"
                        type="submit"
                      >
                        Save change
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </section>
    </>
  );
}

export default OrderDetails;
