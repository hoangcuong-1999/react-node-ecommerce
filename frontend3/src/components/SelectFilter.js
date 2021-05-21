import React, { useEffect, useState } from "react";

function SelectFilter(props) {
  const [criteria, setCriteria] = useState("price-low-to-high");

  useEffect(() => {
    props.getSortCriteria(criteria);
  }, [criteria, props]);

  return (
    <label>
      Sort by:
      <select value={criteria} onChange={(e) => setCriteria(e.target.value)}>
        <option value="price-low-to-high">Price Low To High</option>
        <option value="price-high-to-low">Price High To Low</option>
        <option value="view-low-to-high">View Low to High</option>
        <option value="view-high-to-low">View High to Low</option>
        <option value="star-low-to-high">Star Low to High</option>
        <option value="star-high-to-low">Star Hight to Low</option>
      </select>
    </label>
  );
}

export default SelectFilter;
