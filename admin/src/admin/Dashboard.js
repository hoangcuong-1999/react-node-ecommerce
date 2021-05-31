import React, { useState } from "react";
import Navbar from "../admin/navbar/Navbar";
import Sidebar from "../admin/sidebar/Sidebar";
import Main from "../admin/main/Main";
import { Route } from "react-router";
import ProductShow from "./product/ProductShow";
import ProductAdd from "./product/ProductAdd";
import ProductEdit from "./product/ProductEdit";
import CategoryShow from "./category/CategoryShow";
import CategoryAdd from "./category/CategoryAdd";
import CategoryEdit from "./category/CategoryEdit";
import BrandShow from "./brand/BrandShow";
import BrandAdd from "./brand/BrandAdd";
import BrandEdit from "./brand/BrandEdit";
import ContactShow from "./contact/ContactShow";
import UserShow from "./user/UserShow";
import OrderShow from "./order/OrderShow";
import OrderDetails from "./order/OrderDetails";
import SaleoffShow from "./saleoff/SaleoffShow";
import SaleoffAdd from "./saleoff/SaleoffAdd";

function Dashboard(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard__container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />

      <Route exact path="/admin/dashboard" component={Main} />

      <Route exact path="/admin/dashboard/products" component={ProductShow} />
      <Route
        exact
        path="/admin/dashboard/products/add"
        component={ProductAdd}
      />
      <Route
        exact
        path="/admin/dashboard/products/edit/:slug"
        component={ProductEdit}
      />
      <Route
        exact
        path="/admin/dashboard/categories"
        component={CategoryShow}
      />
      <Route path="/admin/dashboard/categories/add" component={CategoryAdd} />
      <Route
        exact
        path="/admin/dashboard/categories/edit/:id"
        component={CategoryEdit}
      />
      {/* ============ */}
      <Route exact path="/admin/dashboard/brands" component={BrandShow} />
      <Route path="/admin/dashboard/brands/add" component={BrandAdd} />
      <Route
        exact
        path="/admin/dashboard/brands/edit/:id"
        component={BrandEdit}
      />
      <Route path="/admin/dashboard/contacts" component={ContactShow} />
      <Route path="/admin/dashboard/users" component={UserShow} />
      <Route exact path="/admin/dashboard/orders" component={OrderShow} />
      <Route path="/admin/dashboard/orders/:id" component={OrderDetails} />
      <Route exact path="/admin/dashboard/saleoff" component={SaleoffShow} />
      <Route path="/admin/dashboard/saleoff/add" component={SaleoffAdd} />

      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
}

export default Dashboard;
