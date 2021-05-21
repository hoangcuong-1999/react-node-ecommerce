import React, { useState } from "react";

function ColorsCheckBox(props) {
  const getCheckedValues = (array) => {
    let finalResult = [];
    array.forEach((item) => {
      if (item.isChecked === true) {
        finalResult.push(item.value);
      }
    });
    return finalResult;
  };

  const colorHandleChange = (id) => {
    setColors(
      colors.filter((color) => {
        if (color.id === id) {
          color.isChecked = !color.isChecked;
        }
        return color;
      })
    );
  };

  return (
    <>
      {colors.map((color) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={color.id}
            onChange={() => colorHandleChange(color.id)}
          />
          <label class="form-check-label" for={color.id}>
            {color.label}
          </label>
        </div>
      ))}
    </>
  );
}

export default ColorsCheckBox;
