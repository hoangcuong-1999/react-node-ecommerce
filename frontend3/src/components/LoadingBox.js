import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function LoadingBox() {
  return (
    <div className="text-center">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default LoadingBox;
