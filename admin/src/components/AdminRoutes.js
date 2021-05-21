import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function AdminRoutes({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Route
      {...rest}
      // Render props allows conditional rendering
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default AdminRoutes;
