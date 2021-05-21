import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteOrder } from "../../actions/orderActions";
import { useDispatch } from "react-redux";

function OrderTable({ orders }) {
  const dispatch = useDispatch();

  const orderDeleteHandler = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteOrder(orderId));
      }
    });
  };

  return (
    <>
      {orders.length ? (
        <table>
          <tr>
            <th className="order__count">#</th>
            <th className="order__name">Full name</th>
            <th className="order__phone">Phone number</th>
            <th className="order__status">Order status</th>
            <th className="order__paid">Paid</th>
            <th className="order__total">Cart total</th>
            <th className="order__date">Create at</th>
            <th className="order__actions">Actions</th>
          </tr>

          {orders.map((order, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{order.shippingAddress.name}</td>
              <td>{order.shippingAddress.phone}</td>
              <td>
                {order.status === "CancledByAdmin" ? "Cancled" : order.status}
              </td>
              <td className="status__icon">
                {order.isPaid ? (
                  <img src="/assets/img/icon/ispaid-true.png" alt="" />
                ) : (
                  <img src="/assets/img/icon/ispaid-false.png" alt="" />
                )}
              </td>
              <td>$ {order.cartTotal}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>
                <Link to={`/admin/dashboard/orders/${order._id}`}>
                  <i class="fas fa-edit"></i>
                </Link>
                <Link to="#" onClick={() => orderDeleteHandler(order._id)}>
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <table className="table__no__data">
          <tr>
            <th className="order__count">#</th>
            <th className="order__name">Full name</th>
            <th className="order__phone">Phone number</th>
            <th className="order__status">Order status</th>
            <th className="order__paid">Paid</th>
            <th className="order__total">Cart total</th>
            <th className="order__date">Create at</th>
            <th className="order__actions">Actions</th>
          </tr>
          <div className="table__no__data__img">
            <div className="table__no__data__img__wrapper">
              <img src="/assets/img/icon/not-found.png" alt="" />
            </div>
          </div>
          <div className="table__no__data__title">
            <h4>No Data</h4>
          </div>
        </table>
      )}
    </>
  );
}

export default OrderTable;
