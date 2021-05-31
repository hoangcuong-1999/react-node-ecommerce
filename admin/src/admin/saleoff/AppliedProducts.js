import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import BreadCrum from "../breadcrum/BreadCrum";
import ProductTable from "../product/ProductTable";
import Title from "../title/Title";

function AppliedProducts(props) {
  const [query, setQuery] = useState("");
  const [searchColumns, setSearchColumns] = useState(["name"]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //----------------------------------------
  const userSignin = useSelector((state) => state.userSignin);
  const { useInfo } = userSignin;

  const dispatch = useDispatch();

  const saleoffId = props.match.params.saleoffId;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(`/api/saleoff/${saleoffId}`);
      setLoading(false);
      setProducts(data.products);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const productArr = (products) => {
    const arr = products.map((item) => item.product);
    return arr;
  };

  const search = (products) => {
    return products.filter((product) =>
      searchColumns.some(
        (col) =>
          product[col].toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
      )
    );
  };

  const columns = ["name"];

  return (
    <section className="product-show" id="product-show">
      <Title>Applied Products</Title>
      <BreadCrum link="Applied Products" />
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
        ) : (
          <ProductTable products={search(productArr(products))} />
        )}
      </div>
    </section>
  );
}

export default AppliedProducts;
