import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProduct } from "../../actions/productActions";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import BreadCrum from "../breadcrum/BreadCrum";
import Title from "../title/Title";
import Swal from "sweetalert2";
import { PRODUCT_DELETE_RESET } from "../../constants/productConstants";
import ProductTable from "./ProductTable";

function ProductShow() {
  const [query, setQuery] = useState("");
  const [searchColumns, setSearchColumns] = useState(["name"]);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { deletedProduct } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (deletedProduct) {
      Swal.fire("Success!", "Your order is placed successfully.", "success");
      dispatch({ type: PRODUCT_DELETE_RESET });
      dispatch(listProduct());
    }
  }, [deletedProduct, dispatch]);

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const search = (products) => {
    return products.filter((product) =>
      searchColumns.some(
        (col) =>
          product[col].toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
      )
    );
  };

  const columns = ["name", "price", "countInStock"];
  return (
    <>
      <section className="product-show" id="product-show">
        <Title>Products</Title>
        <BreadCrum link="Products" />
        <div className="product-table">
          <div className="product-table__options">
            <div className="options options__search">
              <form>
                {columns.map((col) => (
                  <label>
                    <input
                      type="checkbox"
                      checked={searchColumns.includes(col)}
                      onChange={(e) => {
                        const checked = searchColumns.includes(col);
                        setSearchColumns((prev) =>
                          checked
                            ? prev.filter((sc) => sc !== col)
                            : [...prev, col]
                        );
                      }}
                    />
                    {col}
                  </label>
                ))}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </form>
            </div>
            <div className="options options__create">
              <Link to="/admin/dashboard/products/add">
                <button className="create">Create</button>
              </Link>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorBox>{error}</ErrorBox>
          ) : (
            <ProductTable products={search(products)} />
          )}
        </div>
      </section>
    </>
  );
}

export default ProductShow;
