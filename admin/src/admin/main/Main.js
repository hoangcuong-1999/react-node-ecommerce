import React, { useEffect, useState } from "react";
import hello from "../../assets/hello.svg";
import Chart from "../../admin/charts/Chart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../actions/userActions";
import { listOrder } from "../../actions/orderActions";
import { listProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";

function Main() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const userList = useSelector((state) => state.userList);
  const { users, loading: userListLoading } = userList;
  const orderListAll = useSelector((state) => state.orderListAll);
  const { orders, loading: orderListLoading } = orderListAll;
  const productList = useSelector((state) => state.productList);
  const { products, loading: productListLoading } = productList;

  const amoutIncome =
    orders &&
    orders.reduce(
      (a, order) => a + (order.status === "Received" ? order.cartTotal : 0),
      0
    );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(listUser());
    } else {
      setTotalUsers(users.length);
    }

    if (!orders) {
      dispatch(listOrder());
    } else {
      setTotalOrders(orders.length);
    }

    if (!products) {
      dispatch(listProduct());
    } else {
      setTotalProducts(products.length);
    }
  }, [users, orders, products, dispatch]);

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello Codersbite</h1>
            <p>Welcome to your admin dashboard</p>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div className="main__cards">
          <Link to="/admin/dashboard/users">
            <div className="admin__card">
              <i class="fas fa-user fa-2x"></i>
              <div className="card_inner">
                <p className="text-primary-p">Number of Users</p>
                <span className="font-bold text-title">
                  {userListLoading ? <LoadingBox /> : totalUsers}
                </span>
              </div>
            </div>
          </Link>

          <Link to="/admin/dashboard/orders">
            <div className="admin__card">
              <i class="fas fa-file-alt fa-2x"></i>
              <div className="card_inner">
                <p className="text-primary-p">Number of Orders</p>
                <span className="font-bold text-title">
                  {orderListLoading ? <LoadingBox /> : totalOrders}
                </span>
              </div>
            </div>
          </Link>

          <Link to="/admin/dashboard/products">
            <div className="admin__card">
              <i class="fas fa-tshirt fa-2x"></i>
              <div className="card_inner">
                <p className="text-primary-p">Number of Products</p>
                <span className="font-bold text-title">
                  {productListLoading ? <LoadingBox /> : totalProducts}
                </span>
              </div>
            </div>
          </Link>

          <div className="admin__card">
            <i class="fas fa-funnel-dollar fa-2x"></i>
            <div className="card_inner">
              <p className="text-primary-p">Amount Income</p>
              <span className="font-bold text-title">$ {amoutIncome}</span>
            </div>
          </div>
        </div>
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <Chart />
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>Income</h1>
                <p>${amoutIncome}</p>
              </div>

              <div className="card2">
                <h1>Products</h1>
                <p>{productListLoading ? <LoadingBox /> : totalProducts}</p>
              </div>

              <div className="card3">
                <h1>Users</h1>
                <p>{userListLoading ? <LoadingBox /> : totalUsers}</p>
              </div>

              <div className="card4">
                <h1>Orders</h1>
                <p>{orderListLoading ? <LoadingBox /> : totalOrders}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- CHARTS ENDS HERE --> */}
      </div>
    </main>
  );
}

export default Main;
