import React, { useState, useEffect } from "react";

function Size(props) {
  const [activeSize, setActiveSize] = useState(
    (props.size && props.size[0]) || ""
  );

  const handleClick = (item) => {
    setActiveSize(item);
  };

  useEffect(() => {
    props.parentGetSize(activeSize);
  }, [activeSize, props]);

  return (
    <div className="product__details__option__size">
      <span>Size:</span>
      {props.size &&
        props.size.map((item, index) => (
          <label
            htmlFor={item}
            className={item === activeSize && "active"}
            onClick={() => handleClick(item)}
          >
            {item}
            <input type="radio" id={item} />
          </label>
        ))}
    </div>
  );
}

export default Size;
