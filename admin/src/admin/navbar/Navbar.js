import React from "react";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ sidebarOpen, openSidebar }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        {/* <Link to="#">Subscribers</Link>
        <Link to="#">Video Management</Link> */}
        <Link className="active_link" to="#">
          Admin
        </Link>
      </div>
      <div className="navbar__right d-flex align-items-center">
        <div className="admin__name">{userInfo.name}</div>
        <Link to="#">
          <img width="30" src={avatar} alt="avatar" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
