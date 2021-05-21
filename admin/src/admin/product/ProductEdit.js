import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProduct, listType } from "../../actions/productActions";
import { listCategory } from "../../actions/categoryActions";
import { listBrand } from "../../actions/brandActions";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_EDIT_RESET,
} from "../../constants/productConstants";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductEdit(props) {
  const [image, setImage] = useState("");
  const [proDetailsLoading, setProDetailsLoading] = useState(false);
  const [proDetails, setProDetails] = useState({});

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: cateListLoading,
    error: cateListError,
  } = categoryList;
  const brandList = useSelector((state) => state.brandList);
  const {
    brands,
    loading: brandListLoading,
    error: brandListError,
  } = brandList;

  const {
    loading: typeLoading,
    error: typeError,
    types,
  } = useSelector((state) => state.typeList);
  const {
    error: editProductError,
    loading: editProductLoading,
    editedProduct,
  } = useSelector((state) => state.productEdit);

  useEffect(() => {
    if (!categories) {
      dispatch(listCategory());
    }
    if (!brands) {
      dispatch(listBrand());
    }
    if (!types) {
      dispatch(listType());
    }
  }, [categories, brands, types, dispatch]);
  //=== /GET CATEGORY LIST, GET BRAND LIST

  //=== COLOR
  const [colors] = useState([
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

  //=== /COLOR

  //=== SIZE
  const [sizes] = useState([
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

  //=== /SIZE

  const fetchDetailPro = async () => {
    setProDetailsLoading(true);
    const { data } = await axios.get(`/api/products/${slug}`);
    setProDetailsLoading(false);
    setProDetails(data);
  };

  const slug = props.match.params.slug;

  useEffect(() => {
    fetchDetailPro();
    // eslint-disable-next-line
  }, []);

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  //=== HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", proDetails.name);
    formData.append("price", proDetails.price);
    formData.append("countInStock", proDetails.countInStock);
    formData.append("description", proDetails.description);
    formData.append("brand", proDetails.brand);
    formData.append("category", proDetails.category);
    formData.append("color", JSON.stringify(proDetails.color));
    formData.append("size", JSON.stringify(proDetails.size));
    formData.append("type", proDetails.type);
    formData.append("image", image);

    dispatch(editProduct(formData, proDetails._id));
  };
  //=== /HANDLE SUBMIT

  const removeImgHandler = () => {
    document.getElementById("image-field").value = "";
    setImage("");
  };

  //=== RESET productEdit STORE AFTER geting editedProduct
  useEffect(() => {
    if (editedProduct) {
      toast.success("Product edited successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setImage(null);
      document.getElementById("image-field").value = "";
      dispatch({ type: PRODUCT_EDIT_RESET });
    } else if (editProductError) {
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
  }, [dispatch, editProductError, editedProduct]);
  //=== /RESET productEdit STORE AFTER geting editedProduct

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_EDIT_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
    };
  }, [dispatch]);

  const nameHandleChange = (e) => {
    const newName = e.target.value;
    setProDetails({
      ...proDetails,
      name: newName,
    });
  };

  const handleChangeBrand = (e) => {
    const newBrand = e.target.value;
    setProDetails({
      ...proDetails,
      brand: newBrand,
    });
  };

  const handleChangeCate = (e) => {
    const newBrand = e.target.value;
    setProDetails({
      ...proDetails,
      category: newBrand,
    });
  };

  const handleChangeType = (e) => {
    const newType = e.target.value;
    setProDetails({
      ...proDetails,
      type: newType,
    });
  };

  const handleChangePrice = (e) => {
    const newPrice = e.target.value;
    setProDetails({
      ...proDetails,
      price: newPrice,
    });
  };

  const handleChangeCIS = (e) => {
    const newCIS = e.target.value;
    setProDetails({
      ...proDetails,
      countInStock: newCIS,
    });
  };

  const handleChangeDesc = (e) => {
    const newDesc = e.target.value;
    setProDetails({
      ...proDetails,
      description: newDesc,
    });
  };

  const handleChangeSize = (size) => {
    const checked = proDetails.size.includes(size);
    if (checked) {
      setProDetails({
        ...proDetails,
        size: proDetails.size.filter((item) => item !== size),
      });
    } else {
      setProDetails({
        ...proDetails,
        size: [...proDetails.size, size],
      });
    }
  };

  const handleChangeColor = (color) => {
    const checked = proDetails.color.includes(color);
    if (checked) {
      setProDetails({
        ...proDetails,
        color: proDetails.color.filter((item) => item !== color),
      });
    } else {
      setProDetails({
        ...proDetails,
        color: [...proDetails.color, color],
      });
    }
  };

  return (
    <section id="product-edit">
      <ToastContainer />
      <Title>Edit Product</Title>

      {proDetailsLoading ? (
        <LoadingBox />
      ) : (
        <form
          className="product-add__form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="product-add__form__content">
            <div>
              <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-9">
                  {editProductError && (
                    <div className="mt-2">
                      <ErrorBox>{editProductError}</ErrorBox>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                    value={proDetails.name}
                    onChange={nameHandleChange}
                    required
                  />
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
                    value={proDetails.price}
                    onChange={handleChangePrice}
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
                    value={proDetails.countInStock}
                    onChange={handleChangeCIS}
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
                  />
                  {image && image.name && (
                    <span onClick={removeImgHandler}>Cancle</span>
                  )}
                  {!image && (
                    <div className="img__placeholder">
                      <img src={`/uploads/${proDetails.image}`} alt="" />
                    </div>
                  )}
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
                    rows="5"
                    value={proDetails.description}
                    onChange={handleChangeDesc}
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
                  <select value={proDetails.brand} onChange={handleChangeBrand}>
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
                    value={proDetails.category}
                    onChange={handleChangeCate}
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
                  {sizes.map((size) => (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={size.id}
                        checked={
                          proDetails.size &&
                          proDetails.size.includes(size.value)
                        }
                        onChange={() => handleChangeSize(size.value)}
                      />
                      <label className="form-check-label" htmlFor={size.id}>
                        {size.label}
                      </label>
                    </div>
                  ))}
                  {proDetails.size && !proDetails.size.length && (
                    <ErrorBox>Size can not be empty</ErrorBox>
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
                  {colors.map((color) => (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={color.id}
                        checked={
                          proDetails.color &&
                          proDetails.color.includes(color.value)
                        }
                        onChange={() => handleChangeColor(color.value)}
                      />
                      <label className="form-check-label" htmlFor={color.id}>
                        {color.label}
                      </label>
                    </div>
                  ))}
                  {proDetails.color && !proDetails.color.length && (
                    <ErrorBox>Color can not be empty</ErrorBox>
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
                  <select value={proDetails.type} onChange={handleChangeType}>
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
              {editProductLoading ? (
                <LoadingBox />
              ) : (
                <button className="mt-4 ml-3 custom__button blue" type="submit">
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </section>
  );
}

export default ProductEdit;
