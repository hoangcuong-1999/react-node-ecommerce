import React from "react";

function BigAlertBox(props) {
  return (
    <div class={`big__alert__box ${props.variant || ""}`}>{props.children}</div>
  );
}

export default BigAlertBox;
