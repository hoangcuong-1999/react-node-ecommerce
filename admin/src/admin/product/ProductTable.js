import React from "react";
import Swal from "sweetalert2";
import { deleteProduct } from "../../actions/productActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ProductTable({ products }) {
  const dispatch = useDispatch();

  const removeHandler = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        //  Swal.fire("Success!", "Your order is placed successfully.", "success");
        dispatch(deleteProduct(productId));
      }
    });
  };

  return (
    <>
      {products.length ? (
        <table>
          <tr>
            <th className="product__count">#</th>
            <th className="product__name">Name</th>
            <th className="product__description">Description</th>
            <th className="product__price">Price</th>
            <th className="product__countInStock">Available</th>
            <th className="product__img">Image</th>
            <th className="product__actions">Actions</th>
          </tr>
          {products.map((product, index) => (
            <tr>
              <td>{index + 1}</td>
              <td className="product__name">{product.name}</td>
              <td className="product__description">{product.description}</td>
              <td>{product.price}</td>
              <td>{product.countInStock}</td>
              <td>
                <div className="table__img">
                  <img src={`/uploads/${product.image}`} alt="" />
                </div>
              </td>
              <td>
                <Link to={`/admin/dashboard/products/edit/${product.slug}`}>
                  <i class="fas fa-edit"></i>
                </Link>
                <Link to="#" onClick={() => removeHandler(product._id)}>
                  <i class="far fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <table className="table__no__data">
          <tr>
            <th className="product__count">#</th>
            <th className="product__name">Name</th>
            <th className="product__description">Description</th>
            <th className="product__price">Price</th>
            <th className="product__countInStock">Available</th>
            <th className="product__img">Image</th>
            <th className="product__actions">Actions</th>
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

export default ProductTable;
