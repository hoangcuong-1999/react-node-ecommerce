import React from "react";

function ErrorBox(props) {
  return (
    <div class="alert alert-danger" role="alert">
      {props.children}
    </div>
  );
}

export default ErrorBox;
