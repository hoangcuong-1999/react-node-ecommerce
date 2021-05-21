import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import LoadingBox from "./LoadingBox";

function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notMatch, setNotMatch] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = userSignin;

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password)
      return setNotMatch("Password confirm doesn't match, please try again !");
    dispatch(register(name, email, password));
  };

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <>
      <section className="signin">
        <div className="signin__box">
          <form onSubmit={handleSubmit}>
            <div className="signin__box__text">
              <h2>Create account</h2>
              <p>
                Already have an account?{" "}
                <Link
                  to={
                    props.location.search
                      ? `/signin${props.location.search}`
                      : "/signin"
                  }
                >
                  Signin
                </Link>
              </p>
            </div>
            {(error && (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            )) ||
              (notMatch && (
                <div class="alert alert-danger" role="alert">
                  {notMatch}
                </div>
              ))}
            {loading && <LoadingBox />}
            <div className="signin__box__input">
              <div className="input__field">
                <input
                  type="text"
                  placeholder="Shop name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="input__field">
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="remember__me">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
