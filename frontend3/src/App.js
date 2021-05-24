import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ShopPage from "./components/ShopPage";
import CartPage from "./components/CartPage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import SigninPage from "./components/SigninPage";
import RegisterPage from "./components/RegisterPage";
import Shipping from "./components/ShippingPage";
import CheckoutPage from "./components/CheckoutPage";
import ThankYouPage from "./components/ThankYouPage";
import ContactPage from "./components/ContactPage";
import OrderHistoryPage from "./components/OrderHistoryPage";
import OrderHistoryDetailsPage from "./components/OrderHistoryDetailsPage";
import ProfilePage from "./components/ProfilePage";
import Header from "./components/Header";
import NotFoundComponent from "./components/NotFoundComponent";
import Demo from "./components/Demo";
import MailConfirmPage from "./components/MailConfirmPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/product/:slug?" component={ProductDetailsPage} />
        <Route
          exact
          path="/cart/:slug/qty/:qty/size/:size/color/:color"
          component={CartPage}
        />
        <Route exact path="/cart" component={CartPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/thankyou" component={ThankYouPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/order-history/:id" component={OrderHistoryDetailsPage} />
        <Route exact path="/order-history" component={OrderHistoryPage} />
        <Route exact path="/user/:option" component={ProfilePage} />
        {/* Search Routes */}
        <Route exact path="/search/name/:name" component={ShopPage} />
        <Route path="/search/brand/:brand" component={ShopPage} />
        <Route path="/search/category/:category" component={ShopPage} />
        <Route
          path="/search/name/:name/category/:category/brand/:brand/order/:order/type/:type/min/:min/max/:max/rating/:rating/page/:page"
          component={ShopPage}
        />
        <Route path="/confirm/:confirmationCode" component={MailConfirmPage} />
        <Route path="*" exact={true} component={NotFoundComponent} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
