import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addSaleOff, listSaleoff } from "../../actions/saleoffActions";
import Swal from "sweetalert2";
import { SALEOFF_ADD_RESET } from "../../constants/saleoffConstants";

function SaleoffAdd() {
  const [name, setName] = useState("");
  const [method] = useState("%");
  const [discount, setDiscount] = useState(0);
  const [applyFor, setApplyFor] = useState("product");
  const [applyForValue, setApplyForValue] = useState("");
  const [applyNumber, setApplyNumber] = useState(0);
  //--------------------------
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  //---------------------------
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  //---------------------------

  const dispatch = useDispatch();

  const fetchData = async (name) => {
    const url = name === "products" ? `/api/products` : `/api/products/${name}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (name === "products") {
      setProducts(data);
    } else if (name === "brands") {
      setBrands(data);
    } else if (name === "categories") {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchData("products");
    fetchData("brands");
    fetchData("categories");
    // eslint-disable-next-line
  }, []);

  const valueToRender =
    applyFor === "product" ? (
      <select
        value={applyForValue}
        className="form-control"
        onChange={(e) => setApplyForValue(e.target.value)}
      >
        <option value=""></option>
        {products.map((product) => (
          <option value={product._id}>{product.name}</option>
        ))}
      </select>
    ) : applyFor === "brand" ? (
      <select
        value={applyForValue}
        className="form-control"
        onChange={(e) => setApplyForValue(e.target.value)}
      >
        <option value=""></option>
        {brands.map((brand) => (
          <option value={brand}>{brand}</option>
        ))}
      </select>
    ) : applyFor === "category" ? (
      <select
        value={applyForValue}
        className="form-control"
        onChange={(e) => setApplyForValue(e.target.value)}
      >
        <option value=""></option>
        {categories.map((category) => (
          <option value={category}>{category}</option>
        ))}
      </select>
    ) : (
      ""
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    const saleoff = {
      name,
      method,
      discount,
      applyFor,
      applyForValue,
      applyNumber,
    };
    Swal.fire({
      title: "Add saleoff",
      text: "Do you want to add this saleoff ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dispatch(addSaleOff(saleoff));
      }
    });
  };

  const saleoffAdd = useSelector((state) => state.saleoffAdd);
  const { saleoff, error, loading } = saleoffAdd;

  useEffect(() => {
    if (saleoff) {
      Swal.fire("Success!", "Your order is placed successfully.", "success");
      dispatch({ type: SALEOFF_ADD_RESET });
      dispatch(listSaleoff());
    }
  }, [dispatch, saleoff]);

  return (
    <>
      <section id="saleoff-add">
        <Title>Create Sale Off</Title>

        <form className="saleoff-add__form" onSubmit={handleSubmit}>
          <div className="saleoff-add__form__content">
            <div className="seperator">
              <div className="row">
                <div className="col-lg-12">
                  <label>
                    Name:
                    <input
                      className="form-control"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="seperator">
              <div className="row">
                <div className="col-lg-6">
                  <label>
                    Method:
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={method}
                      disabled
                    />
                  </label>
                </div>
                <div className="col-lg-6">
                  <label>
                    Discount:
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="seperator">
              <div className="row">
                <div className="col-lg-6">
                  <label>
                    Apply for:
                    <select
                      value={applyFor}
                      className="form-control"
                      onChange={(e) => setApplyFor(e.target.value)}
                    >
                      <option value="product">Single product</option>
                      <option value="brand">Brand</option>
                      <option value="category">Category</option>
                    </select>
                  </label>
                </div>
                <div className="col-lg-6">
                  <label>
                    Value:
                    {valueToRender}
                  </label>
                </div>
              </div>
            </div>

            <div className="seperator">
              <div className="row">
                <div className="col-lg-12">
                  <label>
                    Number of products to apply for:
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      value={applyNumber}
                      onChange={(e) => setApplyNumber(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/admin/dashboard/saleoff">
                <button className="mt-4 mr-3 custom__button green">
                  Go back
                </button>
              </Link>
              <button className="mt-4 ml-3 custom__button blue" type="submit">
                Create
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default SaleoffAdd;
