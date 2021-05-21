import React, { useEffect } from "react";
import BreadCrum from "./BreadCrum";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "../actions/orderActions";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import BigAlertBox from "./BigAlertBox";

function OrderHistoryPage() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { loading, data: orders, error } = useSelector(
    (state) => state.orderList
  );

  // useHistory
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) return history.push("/signin");
    dispatch(getOrderList());
  }, [history, userInfo, dispatch]);

  return (
    <>
      <BreadCrum currenLink="Order History" />
      <section id="order-history">
        <div className="container">
          <div className="order-history__title">My orders</div>

          <div className="order-history__table">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <ErrorBox>{error}</ErrorBox>
            ) : orders && orders.length ? (
              <table>
                <thead>
                  <tr>
                    <th className="order__code">Order code</th>
                    <th className="order__date">Order date</th>
                    <th className="order__product">Product</th>
                    <th className="order__total">Total</th>
                    <th className="order__status">Order status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr>
                      <td>
                        <Link to={`/order-history/${order._id}`}>
                          {order._id}
                        </Link>
                      </td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.cartItems[0].name}</td>
                      <td>$ {order.cartTotal}</td>
                      <td>
                        {order.status === "CancledByAdmin"
                          ? "Cancled"
                          : order.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <BigAlertBox variant="danger">
                There is no order in your history recently.{" "}
                <Link to="/shop">Go shopping now.</Link>
              </BigAlertBox>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderHistoryPage;
