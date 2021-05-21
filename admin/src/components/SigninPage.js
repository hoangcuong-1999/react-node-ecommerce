import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import LoadingBox from "./LoadingBox";
import { Link } from "react-router-dom";

function SigninPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      props.history.push("/admin/dashboard");
    }
  }, [props.history, userInfo]);

  return (
    <>
      <section className="signin">
        <div className="signin-wrapper">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className="signin-left">
                <div className="signin-left__content">
                  <div className="signin-left__image">
                    <img src="/assets/img/icon/manager.png" alt="" />
                  </div>
                  <h2>Admin Signin</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="signin-right">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div class="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <label>
                    E-mail
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Admin e-mail"
                    />
                    <span>
                      <i class="far fa-envelope"></i>
                    </span>
                  </label>
                  <label>
                    Password
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Admin password"
                    />
                    <span>
                      <i class="fas fa-lock"></i>
                    </span>
                  </label>
                  <div className="forget-password">
                    <Link to="#">Forget your password?</Link>
                  </div>
                  <div className="submit-btn">
                    {loading ? (
                      <LoadingBox />
                    ) : (
                      <input type="submit" value="Submit" />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SigninPage;
