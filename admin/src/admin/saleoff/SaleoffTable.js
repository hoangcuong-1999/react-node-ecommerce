import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSaleoff, removeSaleoff } from "../../actions/saleoffActions";
import Swal from "sweetalert2";
import { SALEOFF_REMOVE_RESET } from "../../constants/saleoffConstants";

function SaleoffTable({ saleoffs }) {
  const saleoffRemove = useSelector((state) => state.saleoffRemove);
  const { removedSaleoff, loading, error } = saleoffRemove;
  //----------------------------
  const dispatch = useDispatch();

  const handleRemove = (saleoffId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this saleoff ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dispatch(removeSaleoff(saleoffId));
      }
    });
  };

  useEffect(() => {
    if (removedSaleoff) {
      Swal.fire("Success!", "Saleoff removed successfully!", "success");
      dispatch({ type: SALEOFF_REMOVE_RESET });
      dispatch(listSaleoff());
    }
  }, [removedSaleoff, dispatch]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="saleoff__name">Name</th>
            <th className="saleoff__method">Method</th>
            <th className="saleoff__discount">Discount</th>
            <th className="saleoff__applyFor">Apply for</th>
            <th className="saleoff__value">Value</th>
            <th className="saleoff__appliedProduct">Applied product(s)</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {saleoffs &&
            saleoffs.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.method}</td>
                <td>{item.discount}</td>
                <td>{item.applyFor}</td>
                <td>{item.applyForValue}</td>
                <td>
                  <Link to={`/admin/dashboard/saleoff/show/${item._id}`}>
                    Show
                  </Link>
                </td>
                <td>
                  <Link to="#" onClick={() => handleRemove(item._id)}>
                    <i class="far fa-trash-alt"></i>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default SaleoffTable;
