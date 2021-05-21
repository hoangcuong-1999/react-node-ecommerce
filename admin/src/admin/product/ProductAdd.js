import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createProduct,
  // listBrand,
  // listCategory,
  listType,
} from "../../actions/productActions";
import { listCategory } from "../../actions/categoryActions";
import { listBrand } from "../../actions/brandActions";
import { PRODUCT_ADD_RESET } from "../../constants/productConstants";
import { Link } from "react-router-dom";

function ProductAdd() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [errMsg, setErrorMsg] = useState({ type: "", actualMsg: "" });

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: cateListLoading,
    error: cateListError,
  } = categoryList;
  // const brandList = useSelector((state) => state.brandList);
  // const { loading: brandLoading, error: brandError, brands } = brandList;
  const brandList = useSelector((state) => state.brandList);
  const {
    loading: brandListLoading,
    error: brandListError,
    brands,
  } = brandList;
  const typeList = useSelector((state) => state.typeList);
  const { loading: typeLoading, error: typeError, types } = typeList;

  useEffect(() => {
    if (!categories) {
      dispatch(listCategory());
    } else {
      setCategory(categories[0].name);
    }

    if (!brands) {
      dispatch(listBrand());
    } else {
      setBrand(brands[0]);
    }

    if (!types) {
      dispatch(listType());
    } else {
      setType(types[0]);
    }
  }, [categories, brands, types, dispatch]);
  //=== /GET CATEGORY LIST, GET BRAND LIST

  //=== COLOR
  const [color, setColor] = useState([
    {
      id: "black",
      label: "Black",
      value: "black",
      isChecked: false,
    },
    {
      id: "blue",
      label: "Blue",
      value: "blue",
      isChecked: false,
    },
    {
      id: "yellow",
      label: "Yellow",
      value: "yellow",
      isChecked: false,
    },
    {
      id: "red",
      label: "Red",
      value: "red",
      isChecked: false,
    },
    {
      id: "white",
      label: "White",
      value: "white",
      isChecked: false,
    },
  ]);

  const colorHandleChange = (id) => {
    setColor(
      color.filter((color) => {
        if (color.id === id) {
          color.isChecked = !color.isChecked;
        }
        return color;
      })
    );
  };

  //=== SIZE
  const [size, setSize] = useState([
    {
      id: "size-l",
      label: "Size L",
      value: "l",
      isChecked: false,
    },
    {
      id: "size-s",
      label: "Size S",
      value: "s",
      isChecked: false,
    },
    {
      id: "size-xl",
      label: "Size XL",
      value: "xl",
      isChecked: false,
    },
    {
      id: "size-xxl",
      label: "Size XXL",
      value: "xxl",
      isChecked: false,
    },
  ]);

  const sizeHandleChange = (id) => {
    setSize(
      size.filter((size) => {
        if (size.id === id) {
          size.isChecked = !size.isChecked;
        }
        return size;
      })
    );
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const getCheckedValues = (array) => {
    const rs = array
      .filter((item) => item.isChecked === true)
      .map((item) => item.value);
    return rs;
  };

  const productAdd = useSelector((state) => state.productAdd);
  const { loading, error, createdProduct } = productAdd;

  useEffect(() => {
    if (productAdd && createdProduct) {
      toast.success("Product created successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Reset fields
      setName("");
      setPrice("");
      setCountInStock("");
      setDescription("");
      color.filter((item) => {
        item.isChecked = false;
        return item;
      });
      size.filter((item) => {
        item.isChecked = false;
        return item;
      });
      setImage(null);
      document.getElementById("image-field").value = "";
      setCategory(categories[0].name);
      setBrand(brands[0].name);
      setType(types[0]);
      // Reset store
      dispatch({ type: PRODUCT_ADD_RESET });
    } else if (error) {
      toast.error("Error occurred, please try again !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [
    error,
    productAdd,
    createdProduct,
    color,
    dispatch,
    size,
    brands,
    categories,
    types,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!getCheckedValues(size).length) {
      return setErrorMsg({
        type: "size",
        actualMsg: "Size can not be empty",
      });
    } else {
      setErrorMsg({
        type: "",
        actualMsg: "",
      });
    }

    if (!getCheckedValues(color).length) {
      return setErrorMsg({
        type: "color",
        actualMsg: "Color can not be empty",
      });
    } else {
      setErrorMsg({
        type: "",
        actualMsg: "",
      });
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("color", JSON.stringify(getCheckedValues(color)));
    formData.append("size", JSON.stringify(getCheckedValues(size)));
    formData.append("type", type);
    formData.append("image", image);

    dispatch(createProduct(formData));
  };

  return (
    <section id="product-add">
      <ToastContainer />
      <Title>Create Product</Title>

      <form
        className="product-add__form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="product-add__form__content">
          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Name</div>
              </div>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  placeholder="Product name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {error && (
                  <div className="mt-2">
                    <ErrorBox>{error}</ErrorBox>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Price</div>
              </div>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  placeholder="Product price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Count in Stock</div>
              </div>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  placeholder="Product count in stock"
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Image</div>
              </div>
              <div className="col-lg-9">
                <input
                  id="image-field"
                  type="file"
                  onChange={onChangeImage}
                  required
                />
              </div>
            </div>
          </div>

          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Description</div>
              </div>
              <div className="col-lg-9">
                <textarea
                  className="form-control product__edit__textarea"
                  placeholder="Product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Brand</div>
              </div>
              <div className="col-lg-9">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {brandListLoading ? (
                    <LoadingBox />
                  ) : brandListError ? (
                    <ErrorBox>{brandListError}</ErrorBox>
                  ) : (
                    brands.map((brand) => (
                      <option value={brand.name}>{brand.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Category</div>
              </div>
              <div className="col-lg-9">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {cateListLoading ? (
                    <LoadingBox />
                  ) : cateListError ? (
                    <ErrorBox>{cateListError}</ErrorBox>
                  ) : (
                    categories.map((category) => (
                      <option value={category.name}>{category.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Size</div>
              </div>
              <div className="col-lg-9">
                {size.map((size) => (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={size.id}
                      checked={size.isChecked}
                      onChange={() => sizeHandleChange(size.id)}
                    />
                    <label className="form-check-label" htmlFor={size.id}>
                      {size.label}
                    </label>
                  </div>
                ))}
                {errMsg.type === "size" && (
                  <div className="mt-2">
                    <ErrorBox>{errMsg.actualMsg}</ErrorBox>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Color</div>
              </div>
              <div className="col-lg-9">
                {color.map((color) => (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={color.id}
                      checked={color.isChecked}
                      onChange={() => colorHandleChange(color.id)}
                    />
                    <label className="form-check-label" htmlFor={color.id}>
                      {color.label}
                    </label>
                  </div>
                ))}
                {errMsg.type === "color" && (
                  <div className="mt-2">
                    <ErrorBox>{errMsg.actualMsg}</ErrorBox>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="seperator">
            <div className="row">
              <div className="col-lg-3">
                <div className="title">Type</div>
              </div>
              <div className="col-lg-9">
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  {typeLoading ? (
                    <LoadingBox />
                  ) : typeError ? (
                    <ErrorBox>{typeError}</ErrorBox>
                  ) : (
                    types.map((type) => <option value={type}>{type}</option>)
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/admin/dashboard/products">
              <button className="mt-4 mr-3 custom__button green">
                Go back
              </button>
            </Link>
            {loading ? (
              <LoadingBox />
            ) : (
              <button className="mt-4 ml-3 custom__button blue" type="submit">
                Create
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

export default ProductAdd;
