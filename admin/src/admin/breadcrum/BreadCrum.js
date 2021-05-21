import React from "react";
import { Link } from "react-router-dom";

function BreadCrum(props) {
  return (
    <div className="admin-breadcrum">
      <Link to="/">Home</Link> / {props.link}
    </div>
  );
}

export default BreadCrum;
