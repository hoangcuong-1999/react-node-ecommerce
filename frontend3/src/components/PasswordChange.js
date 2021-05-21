import React, { useState, useEffect } from "react";
import { resetPassword } from "../actions/userActions";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import {
  PASSWORD_CLEAR_MESSAGE,
  PASSWORD_REMOVE_SUCCESS_PROP,
} from "../constants/userConstants";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

function PasswordChange(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error, success } = userSignin;

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");
  const [notMatch, setNotMatch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      return props.history.push("/signin");
    }
  }, [props.history, userInfo]);

  useEffect(() => {
    if (success) {
      Swal.fire("Success!", "Password updated successfully !", "success");
      setCurrentPwd("");
      setNewPwd("");
      setConfirmNewPwd("");
      // Reset success to false to avoid toastify load again when componentDidMount
      dispatch({ type: PASSWORD_REMOVE_SUCCESS_PROP });
    }
  }, [success, dispatch]);

  // ON SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmNewPwd !== newPwd)
      return setNotMatch("Password confirm doesn't match, please try again!");
    else {
      setNotMatch("");
      // No return
    }
    dispatch(resetPassword(currentPwd, newPwd));
  };

  // ComponentWillUnmount
  useEffect(() => {
    return () => {
      dispatch({ type: PASSWORD_CLEAR_MESSAGE });
    };
  }, [dispatch]);

  return (
    <>
      <div className="col-lg-9">
        <div className="right-title">Change password</div>
        <div className="right-content">
          <form onSubmit={handleSubmit} className="account-info-form">
            {(notMatch && <ErrorBox>{notMatch}</ErrorBox>) ||
              (error && <ErrorBox>{error}</ErrorBox>)}

            <div className="form-group">
              <label>Current password</label>
              <input
                type="password"
                className="form-control"
                value={currentPwd}
                required
                onChange={(e) => setCurrentPwd(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>New password</label>
              <input
                type="password"
                className="form-control"
                value={newPwd}
                required
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                className="form-control"
                value={confirmNewPwd}
                required
                onChange={(e) => setConfirmNewPwd(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>&nbsp;</label>
              {loading ? <LoadingBox /> : <button type="submit">Update</button>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordChange;
