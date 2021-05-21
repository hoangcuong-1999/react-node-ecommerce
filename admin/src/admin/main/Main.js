import React from "react";
import hello from "../../assets/hello.svg";
import Chart from "../../admin/charts/Chart";
import { Link } from "react-router-dom";

function Main() {
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
                <span className="font-bold text-title">578</span>
              </div>
            </div>
          </Link>

          <Link to="/admin/dashboard/orders">
            <div className="admin__card">
              <i class="fas fa-file-alt fa-2x"></i>
              <div className="card_inner">
                <p className="text-primary-p">Number of Orders</p>
                <span className="font-bold text-title">2467</span>
              </div>
            </div>
          </Link>

          <Link to="/admin/dashboard/products">
            <div className="admin__card">
              <i class="fas fa-tshirt fa-2x"></i>
              <div className="card_inner">
                <p className="text-primary-p">Number of Products</p>
                <span className="font-bold text-title">340</span>
              </div>
            </div>
          </Link>

          <div className="admin__card">
            <i class="fas fa-funnel-dollar fa-2x"></i>
            <div className="card_inner">
              <p className="text-primary-p">Amount Income</p>
              <span className="font-bold text-title">$ 645</span>
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
                <p>$75,300</p>
              </div>

              <div className="card2">
                <h1>Sales</h1>
                <p>$124,200</p>
              </div>

              <div className="card3">
                <h1>Users</h1>
                <p>3900</p>
              </div>

              <div className="card4">
                <h1>Orders</h1>
                <p>1881</p>
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
