import React from "react";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";

function Navbar({ sidebarOpen, openSidebar }) {
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
      <div className="navbar__right">
        <Link to="#">
          <i className="fa fa-search"></i>
        </Link>
        <Link to="#">
          <i className="fa fa-clock-o"></i>
        </Link>
        <Link to="#">
          <img width="30" src={avatar} alt="avatar" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
