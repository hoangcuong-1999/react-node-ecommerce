import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import LoadingBox from "./LoadingBox";

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

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: USER_SIGNIN_RESET });
  //   };
  // }, [dispatch]);

  return (
    <>
      <section className="signin">
        <div className="signin__box">
          <form onSubmit={handleSubmit}>
            <div className="signin__box__text">
              <h2>Signin</h2>
              <p>
                Don't have an account?{" "}
                <Link
                  to={
                    props.location.search
                      ? `/register${props.location.search}`
                      : "/register"
                  }
                >
                  Register
                </Link>
              </p>
            </div>
            {error && (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {loading && <LoadingBox />}
            <div className="signin__box__input">
              <div className="input__field">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input__field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="remember__me">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <button type="submit">Sign in</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default SigninPage;
