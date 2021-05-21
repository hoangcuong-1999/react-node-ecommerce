import React, { useState, useEffect } from "react";

function Color(props) {
  const [activeColor, setActiveColor] = useState(
    (props.color && props.color[0]) || ""
  );

  const getClassName = (item) => {
    switch (item) {
      case "black":
        return "c-1";
      case "blue":
        return "c-2";
      case "yellow":
        return "c-3";
      case "red":
        return "c-4";
      case "white":
        return "c-5";
      default:
        return "c-1";
    }
  };

  const handleClick = (item) => {
    setActiveColor(item);
  };

  useEffect(() => {
    props.parentGetColor(activeColor);
  }, [props, activeColor]);

  return (
    <div className="product__details__option__color">
      <span>Color:</span>
      {props.color &&
        props.color.map((item) => (
          <label
            className={getClassName(item)}
            htmlFor={item}
            onClick={() => handleClick(item)}
          >
            <input type="radio" id={item} />
          </label>
        ))}
      <span>{activeColor}</span>
    </div>
  );
}

export default Color;
