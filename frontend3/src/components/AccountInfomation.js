import React, { useState, useEffect } from "react";
import { RESET_PROFILE_SUCCESS_PROP } from "../constants/userProfileConstants";
import { saveShippingAddress } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { saveUserProfile } from "../actions/userProfileActions";
import Swal from "sweetalert2";

function AccountInfomation(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userProfile = useSelector((state) => state.userProfile);
  const { data, success } = userProfile;
  const { shippingAddress } = useSelector((state) => state.cart);
  const orderNotes = (shippingAddress && shippingAddress.orderNotes) || "";

  const shopName = userInfo ? userInfo.name : "";
  const [name, setName] = useState(data ? data.name : "");
  const [city, setCity] = useState(data ? data.city : "");
  const [province, setProvince] = useState(data ? data.province : "");
  const [address, setAddress] = useState(data ? data.address : "");
  const [phone, setPhone] = useState(data ? data.phone : "");

  useEffect(() => {
    if (!userInfo) {
      return props.history.push("/signin");
    }
  }, [props.history, userInfo]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      Swal.fire("Success!", "Profile updated successfully !", "success");
      dispatch({ type: RESET_PROFILE_SUCCESS_PROP });
    }
  }, [success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveUserProfile({ city, province, name, phone, address }));
    dispatch(
      saveShippingAddress({ city, province, name, phone, address, orderNotes })
    );
  };

  return (
    <>
      <div className="col-lg-9">
        <div className="right-title">Account infomation</div>
        <div className="right-content">
          <form onSubmit={handleSubmit} className="account-info-form">
            <div className="form-group">
              <label>Shop name</label>
              <input
                type="text"
                className="form-control"
                value={shopName}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Login email</label>
              <input
                type="email"
                className="form-control"
                value={userInfo && userInfo.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Province</label>
              <input
                type="text"
                className="form-control"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="number"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="5"
              />
            </div>
            <div className="form-group">
              <label>&nbsp;</label>
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="custom__col__10">
        <div className="profile__rightside">
          <div className="profile__rightside__title">
            <h4>My Profile</h4>
            <p>Managing profile for account security</p>
          </div>
          <div className="d-flex">
            <form onSubmit={handleSubmit}>
              <div className="profile__rightside__left">
                <ul>
                  <li>
                    <span>Login email</span>
                    <span>{userInfo && userInfo.email}</span>
                  </li>
                  <li>
                    <span>Shop name</span>
                    <span>{shopName}</span>
                  </li>
                  <li>
                    <span>Full name</span>
                    <span>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        value={name}
                        required
                      />
                    </span>
                  </li>

                  <li>
                    <span>City</span>
                    <span>
                      <input
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        value={city}
                        required
                      />
                    </span>
                  </li>
                  <li>
                    <span>Province</span>
                    <span>
                      <input
                        onChange={(e) => setProvince(e.target.value)}
                        type="text"
                        value={province}
                        required
                      />
                    </span>
                  </li>
                  <li>
                    <span>Phone</span>
                    <span>
                      <input
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        value={phone}
                        required
                      />
                    </span>
                  </li>
                  <li>
                    <span>Address</span>
                    <span>
                      <textarea
                        onChange={(e) => setAddress(e.target.value)}
                        rows="70"
                        value={address}
                        required
                      />
                    </span>
                  </li>

                  <li>
                    <span></span>
                    <span>
                      <button>Save</button>
                    </span>
                  </li>
                </ul>
              </div>
            </form>

            <div className="profile__rightside__right"></div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default AccountInfomation;
