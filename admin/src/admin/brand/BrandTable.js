import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteBrand } from "../../actions/brandActions";
import { useDispatch } from "react-redux";

function BrandTable({ brands }) {
  const dispatch = useDispatch();

  const brandDeleteHandle = (brandId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this brand ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteBrand(brandId));
      }
    });
  };
  return (
    <>
      {brands.length ? (
        <table>
          <tr>
            <th className="brand__count">#</th>
            <th className="brand__name">Name</th>
            <th className="brand__description">Description</th>
            <th className="brand__actions">Actions</th>
          </tr>
          {brands &&
            brands.map((brand, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{brand.name}</td>
                <td>{brand.description}</td>
                <td>
                  <Link to={`/admin/dashboard/brands/edit/${brand._id}`}>
                    <i class="fas fa-edit"></i>
                  </Link>
                  <Link to="#" onClick={() => brandDeleteHandle(brand._id)}>
                    <i class="far fa-trash-alt"></i>
                  </Link>
                </td>
              </tr>
            ))}
        </table>
      ) : (
        <table className="table__no__data">
          <tr>
            <th className="brand__count">#</th>
            <th className="brand__name">Name</th>
            <th className="brand__description">Description</th>
            <th className="brand__actions">Actions</th>
          </tr>
          <div className="table__no__data__img">
            <div className="table__no__data__img__wrapper">
              <img src="/assets/img/icon/not-found.png" alt="" />
            </div>
          </div>
          <div className="table__no__data__title">
            <h4>No Data</h4>
          </div>
        </table>
      )}
    </>
  );
}

export default BrandTable;
