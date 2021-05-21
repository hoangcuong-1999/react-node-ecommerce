import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { detailsBrand, editBrand } from "../../actions/brandActions";
import { BRAND_EDIT_RESET } from "../../constants/brandConstants";

function BrandEdit(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const brandDetails = useSelector((state) => state.brandDetails);
  const { brand, loading, error } = brandDetails;
  const brandEdit = useSelector((state) => state.brandEdit);
  const {
    loading: brandEditLoading,
    error: brandEditError,
    editedBrand,
  } = brandEdit;

  const dispatch = useDispatch();
  const brandId = props.match.params.id;
  useEffect(() => {
    if (!brand || brand._id !== brandId) {
      dispatch(detailsBrand(brandId));
    } else {
      setName(brand.name);
      setDescription(brand.description);
    }
  }, [brand, dispatch, brandId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editBrand(brandId, { name, description }));
  };

  // ComponentDidUpdate / ComponentDidMount
  useEffect(() => {
    if (brandEdit && editedBrand) {
      toast.success("Brand edited successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: BRAND_EDIT_RESET });
    } else if (brandEditError) {
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
  }, [brandEdit, editedBrand, dispatch, brandEditError]);

  //=== ComponentWillUnmount
  useEffect(() => {
    return () => {
      dispatch({ type: BRAND_EDIT_RESET });
    };
  }, [dispatch]);
  return (
    <>
      <section id="product-add">
        <ToastContainer />
        <Title>Edit brand</Title>

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox>{error}</ErrorBox>
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
                    {brandEditError && <ErrorBox>{brandEditError}</ErrorBox>}
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      className="form-control"
                      placeholder="Product description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link to="/admin/dashboard/brands">
                  <button className="mt-4 mr-3 custom__button green">
                    Go back
                  </button>
                </Link>
                {brandEditLoading ? (
                  <LoadingBox />
                ) : (
                  <button
                    className="mt-4 ml-3 custom__button blue"
                    type="submit"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </section>
    </>
  );
}

export default BrandEdit;
