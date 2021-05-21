import React from "react";

function Title(props) {
  return (
    <div className="product-show__title">
      <h2>{props.children}</h2>
    </div>
  );
}

export default Title;
