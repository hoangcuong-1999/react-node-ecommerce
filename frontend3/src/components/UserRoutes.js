import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function UserRoutes({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Redirect to="/admin/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default UserRoutes;
