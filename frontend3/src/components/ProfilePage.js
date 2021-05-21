import React from "react";
import { Link, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordChange from "./PasswordChange";
// import BreadCrum from "./BreadCrum";
import AccountInfomation from "./AccountInfomation";
import { useSelector } from "react-redux";

function ProfilePage(props) {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { option } = props.match.params;
  return (
    <>
      <ToastContainer />
      {/* <BreadCrum currenLink="My account" /> */}
      <section className="profile">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="left-title">
                <img src="/assets/img/icon/avatar.png" alt="" />
                <div className="left-title__text">
                  <div className="left-title__text__1">My account</div>
                  <div className="left-title__text__2">
                    {userInfo && userInfo.name}
                  </div>
                </div>
              </div>
              <div className="left-links">
                <ul>
                  <li>
                    <Link
                      to="/user/account"
                      className={option === "account" && "active"}
                    >
                      <span>
                        <i class="fas fa-user-alt"></i> Account infomation
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/change-password"
                      className={option === "change-password" && "active"}
                    >
                      <span>
                        <i class="fas fa-key"></i> Change password
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Route path="/user/account" component={AccountInfomation} />
            <Route path="/user/change-password" component={PasswordChange} />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfilePage;
