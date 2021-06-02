import React, { useEffect } from "react";
import BreadCrum from "./BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import {
  cancleOrder,
  changeOrderStatus,
  getOrderDetails,
} from "../actions/orderActions";
import LoadingBox from "./LoadingBox";
import { Link } from "react-router-dom";
import BigAlertBox from "./BigAlertBox";
import Swal from "sweetalert2";
import { ORDER_CANCLE_RESET } from "../constants/orderConstants";
import RatingModal from "./RatingModal";
import { listRating } from "../actions/ratingActions";

function OrderHistoryDetailsPage(props) {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { data: order, loading, error } = orderDetails;
  const { userInfo } = useSelector((state) => state.userSignin);
  const orderCancle = useSelector((state) => state.orderCancle);
  const { cancledOrder } = orderCancle;
  const ratingList = useSelector((state) => state.ratingList);
  const { ratings } = ratingList;

  console.log(order);

  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  useEffect(() => {
    if (!userInfo) return props.history.push("/signin");
    dispatch(getOrderDetails(orderId));
    dispatch(listRating(orderId));
  }, [dispatch, orderId, props, userInfo]);

  // Check if product already rating
  // For every order will have its own rating products
  const ratingExist = (ratingsArr, productId) => {
    return (
      ratingsArr && ratingsArr.find((rating) => rating.product === productId)
    );
  };

  const cancelOrderHandler = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancle this order ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dispatch(cancleOrder(orderId));
        // Do cancle button được check là order.status khác "Cancled" thì render button này,
        // khi dispatch(cancleOrder(orderId)) thì store state: orderDetails chưa cập nhật lại status thành "Cancled" nên button vẫn còn đó, trừ khi refresh mới mất.
        dispatch(changeOrderStatus(orderId));
      }
    });
  };

  useEffect(() => {
    if (cancledOrder) {
      Swal.fire("Success!", "Your order has been cancled!", "success");
    }
  }, [cancledOrder]);

  useEffect(() => {
    return () => {
      dispatch({ type: ORDER_CANCLE_RESET });
    };
  }, [dispatch]);

  const cancleButton =
    (order && order.status === "Pending") ||
    (order && order.status === "Confirm") ? (
      <div className="cancle__btn">
        <button onClick={() => cancelOrderHandler(props.match.params.id)}>
          Cancel order
        </button>
      </div>
    ) : (order && order.status === "Cancled") ||
      (order && order.status === "CancledByAdmin") ? (
      <div className="cancle__btn none__cursor">
        <button>Order has been cancled</button>
      </div>
    ) : order && order.status === "Received" ? (
      <div className="cancle__btn none__cursor">
        <button>Successful delivery</button>
      </div>
    ) : (
      <div className="cancle__btn not__allow__cursor">
        <button>Cancel order</button>
      </div>
    );

  return (
    <>
      <BreadCrum currenLink="Order Details" />
      <section id="order-details">
        <div className="container">
          <div className="order-details__heading">
            <span>Order details #{order && order._id}</span>
          </div>
          <div className="order-details__created text-right">
            <span>Order date: {order && order.createdAt}</span>
          </div>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <BigAlertBox variant="danger">{error}</BigAlertBox>
          ) : (
            // <ErrorBox>{error}</ErrorBox>
            <>
              <div className="order-details__shippingInfo">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="title">Receiver Address</div>
                    <div className="content">
                      <p className="name">{order.shippingAddress.name}</p>
                      <p className="adress">{order.shippingAddress.address}</p>
                      <p className="phone">{order.shippingAddress.phone}</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="title">Shipping Method</div>
                    <div className="content">Free shipping</div>
                  </div>
                  <div className="col-lg-4">
                    <div className="title">Payment Method</div>
                    <div className="content">
                      <p>{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-details__items">
                <table>
                  <thead>
                    <tr>
                      <th className="items__pro">Product</th>
                      <th className="items__price">Price</th>
                      <th className="items__qty">quantity</th>
                      <th className="items__size">size</th>
                      <th className="items__color">color</th>
                      <th className="items__sub">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item) => (
                      <tr>
                        <td>
                          <div className="pro-item">
                            <div className="pro-item__img">
                              <img src={`/uploads/${item.image}`} alt="" />
                            </div>
                            <div className="pro-item__info">
                              <Link
                                to={`/product/gildan-crew-t-shirt/${item.slug}`}
                                className="info__name"
                              >
                                {item.name}
                              </Link>
                              <div className="pro-review">
                                {order.status === "Received" &&
                                  !ratingExist(ratings, item.product) && (
                                    <RatingModal
                                      product={item}
                                      orderId={props.match.params.id}
                                    />
                                  )}
                                <Link to={`/product/${item.slug}`}>
                                  Buy again
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>$ {item.price}</td>
                        <td>{item.qty}</td>
                        <td>{item.size}</td>
                        <td>{item.color}</td>
                        <td>$ {item.price * item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="text-right" colSpan="5">
                        Total items
                      </td>
                      <td className="text-right" colSpan="1s">
                        {order.cartItems.length}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right" colSpan="5">
                        Shipping fee
                      </td>
                      <td className="text-right" colSpan="1">
                        0
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right" colSpan="5">
                        Cart Total
                      </td>
                      <td className="text-right" colSpan="1">
                        <span>$ {order.cartTotal}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {cancleButton}

              <div class="order-details__links">
                <Link to="/order-history">
                  <i class="fas fa-angle-double-left"></i> Return to my orders
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default OrderHistoryDetailsPage;
