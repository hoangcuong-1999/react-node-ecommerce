import React from "react";
import { Link } from "react-router-dom";

function BreadCrum({ currenLink }) {
  return (
    <section className="breadcrum">
      <div className="container">
        <h4>{currenLink}</h4>
        <div className="breadcrum__links">
          <Link to="/">Home</Link>

          <i className="fas fa-angle-right"></i>

          <span>{currenLink}</span>
        </div>
      </div>
    </section>
  );
}

export default BreadCrum;
