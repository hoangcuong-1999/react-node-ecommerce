import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../actions/userActions";
// import logo from "../../assets/logo.png";

function Sidebar({ sidebarOpen, closeSidebar }) {
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          {/* <img src="/assets/img/logo.png" alt="logo" /> */}
          <h1>
            Male Fashion<span>.</span>
          </h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <Link to="/admin/dashboard">Dashboard</Link>
        </div>
        <h2>MAIN</h2>
        <div className="sidebar__link">
          <i class="fas fa-file-alt fa-2x text-white"></i>
          <Link to="/admin/dashboard/orders">Orders</Link>
        </div>
        <div className="sidebar__link">
          <i class="fas fa-book"></i>
          <Link to="/admin/dashboard/categories">Categories</Link>
        </div>
        <div className="sidebar__link">
          <i class="fas fa-book"></i>
          <Link to="/admin/dashboard/brands">Brands</Link>
        </div>
        <div className="sidebar__link">
          <i class="fas fa-tshirt text-white"></i>
          <Link to="/admin/dashboard/products">Products</Link>
        </div>
        <div className="sidebar__link">
          <i class="fas fa-user text-white"></i>
          <Link to="/admin/dashboard/users">Users</Link>
        </div>
        <div className="sidebar__link">
          <i class="fas fa-envelope"></i>
          <Link to="/admin/dashboard/contacts">Contacts</Link>
        </div>
        <div className="sidebar__link">
          <i class="fas fa-sign-out-alt"></i>
          <Link to="#" onClick={signoutHandler}>
            Signout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
