import React, { useEffect } from "react";

function SizesCheckBox(props) {
  const setCheckValues = (bigArr, smArr) => [
    bigArr.forEach((item1) => {
      smArr.forEach((item2) => {
        if (item1.value === item2) {
          item1.isChecked = true;
        }
      });
    }),
  ];

  useEffect(() => {
    props.setSize(
      props.sizes.filter((size) => {
        if (props.product.size.includes(size.value)) {
          size.isChecked = true;
        } else {
          size.isChecked = false;
        }
        return size;
      })
    );
    console.log(props.sizes);
  }, []);

  return (
    <>
      {props.sizes.map((size) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={size.id}
            checked={size.isChecked}
            onChange={() => props.sizeHandleChange(size.id)}
          />
          <label class="form-check-label" for={size.id}>
            {size.label}
          </label>
        </div>
      ))}
    </>
  );
}

export default SizesCheckBox;
