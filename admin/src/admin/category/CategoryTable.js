import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteCategory } from "../../actions/categoryActions";
import { useDispatch } from "react-redux";

function CategoryTable({ categories }) {
  const dispatch = useDispatch();

  const cateDeleteHandle = (cateId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteCategory(cateId));
      }
    });
  };
  return (
    <>
      {categories.length ? (
        <table>
          <tr>
            <th className="category__count">#</th>
            <th className="category__name">Name</th>
            <th className="category__description">Description</th>
            <th className="category__actions">Actions</th>
          </tr>
          {categories.map((category, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td className="category__description ">{category.description}</td>
              <td>
                <Link to={`/admin/dashboard/categories/edit/${category._id}`}>
                  <i class="fas fa-edit"></i>
                </Link>
                <Link to="#" onClick={() => cateDeleteHandle(category._id)}>
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <table className="table__no__data">
          <tr>
            <th className="category__count">#</th>
            <th className="category__name">Name</th>
            <th className="category__description">Description</th>
            <th className="category__actions">Actions</th>
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

export default CategoryTable;
