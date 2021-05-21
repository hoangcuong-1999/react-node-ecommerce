import React, { useState, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { saveUserProfile } from "../actions/userProfileActions";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import Swal from "sweetalert2";

function ShippingPage(props) {
  // Get userProfile
  const { data, loading, error } = useSelector((state) => state.userProfile);
  const { shippingAddress } = useSelector((state) => state.cart);

  const [city, setCity] = useState((data && data.city) || "");
  const [province, setProvince] = useState((data && data.province) || "");
  const [name, setName] = useState((data && data.name) || "");
  const [phone, setPhone] = useState((data && data.phone) || "");
  const [address, setAddress] = useState((data && data.address) || "");
  const [orderNotes, setOrderNotes] = useState(
    (shippingAddress && shippingAddress.orderNotes) || ""
  );
  const { cartItems } = useSelector((state) => state.cart);

  // Get shopName
  const { userInfo } = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // If there is no item in cart
    if (!cartItems.length) {
      return Swal.fire({
        title: "You cart is empty",
        text: "Your cart must have at least 1 item before moving on to the next step",
        icon: "info",
      });
    }

    // save shipping address to cart store ino order to have enough info to send to Order collection
    dispatch(
      saveShippingAddress({ city, province, name, phone, address, orderNotes })
    );
    // save user profile userProfile store
    dispatch(saveUserProfile({ city, province, name, phone, address }));
    props.history.push("/checkout");
  };

  useEffect(() => {
    if (!userInfo) return props.history.push("/signin");
  }, [userInfo, props, dispatch, data]);

  // useEffect(() => {
  //   dispatch(getProfileInfo());
  // })

  return (
    <>
      <CheckoutSteps step1Success step2InProgress step3Next step4Next />;
      <section className="shipping">
        <div className="container">
          <h2 className="shipping__title">SHIPPING ADDRESS</h2>

          <form className="shipping__content" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <label>
                  City<span>*</span>
                  <input
                    className="form-control"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <label>
                  Province<span>*</span>
                  <input
                    className="form-control"
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <label>
                  Name<span>*</span>
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                <label>
                  Phone<span>*</span>
                  <input
                    className="form-control"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <label>
                  Address<span>*</span>
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <label>
                  Order Notes
                  <textarea
                    className="form-control"
                    cols="200"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="shipping__content__button">
                <button type="submit" className="btn btn-primary">
                  {loading && <LoadingBox />}
                  {error && <ErrorBox>{error}</ErrorBox>}
                  Next step
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ShippingPage;
