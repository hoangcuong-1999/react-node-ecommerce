import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOrder } from "../../actions/orderActions";
import Swal from "sweetalert2";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import { ORDER_DELETE_RESET } from "../../constants/orderConstants";
import OrderTable from "./OrderTable";

function OrderShow() {
  const [query, setQuery] = useState("");
  const [searchCols, setSearchCols] = useState(["name"]);
  const orderListAll = useSelector((state) => state.orderListAll);
  const {
    orders,
    loading: orderListLoading,
    error: orderListError,
  } = orderListAll;
  const orderDelete = useSelector((state) => state.orderDelete);
  const { deletedOrder } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrder());
  }, [dispatch]);

  useEffect(() => {
    if (deletedOrder) {
      Swal.fire("Success!", "Order deleted successfully.", "success");
      dispatch({ type: ORDER_DELETE_RESET });
      dispatch(listOrder());
    }
  }, [deletedOrder, dispatch]);

  const search = (orders) => {
    return orders.filter((order) =>
      searchCols.some(
        (col) =>
          (col === "name" || col === "phone"
            ? order["shippingAddress"][col]
            : order[col]
          )
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
      )
    );
  };

  const cols = ["name", "phone", "status", "cartTotal", "createAt"];
  return (
    <>
      <section id="order-show">
        <Title>Orders</Title>
        <div className="_breadcrumb">
          <Link to="/">Home</Link> / Orders
        </div>
        <div className="product-table">
          <div className="product-table__options">
            <div className="options options__search">
              <form>
                {cols.map((col) => (
                  <label>
                    <input
                      type="checkbox"
                      checked={searchCols.includes(col)}
                      onChange={(e) => {
                        const checked = searchCols.includes(col);
                        setSearchCols((prev) =>
                          checked
                            ? prev.filter((sc) => sc !== col)
                            : [...prev, col]
                        );
                      }}
                    />
                    {col}
                  </label>
                ))}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>

          {orderListLoading ? (
            <LoadingBox />
          ) : orderListError ? (
            <ErrorBox>{orderListError}</ErrorBox>
          ) : (
            <OrderTable orders={search(orders)} />
          )}
        </div>
      </section>
    </>
  );
}

export default OrderShow;
