import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { detailsCategory, editCategory } from "../../actions/categoryActions";
import { CATEGORY_EDIT_RESET } from "../../constants/categoryConstants";

function CategoryEdit(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { category, loading, error } = categoryDetails;
  const categoryEdit = useSelector((state) => state.categoryEdit);
  const {
    loading: cateEditLoading,
    error: cateEditError,
    editedCategory,
  } = categoryEdit;

  const dispatch = useDispatch();
  const CateId = props.match.params.id;
  useEffect(() => {
    if (!category || category._id !== CateId) {
      dispatch(detailsCategory(CateId));
    } else {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category, dispatch, CateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCategory(CateId, { name, description }));
  };

  // ComponentDidUpdate / ComponentDidMount
  useEffect(() => {
    if (categoryEdit && editedCategory) {
      toast.success("Category edited successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: CATEGORY_EDIT_RESET });
    } else if (cateEditError) {
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
  }, [categoryEdit, editedCategory, dispatch, cateEditError]);

  //=== ComponentWillUnmount
  useEffect(() => {
    return () => {
      dispatch({ type: CATEGORY_EDIT_RESET });
    };
  }, [dispatch]);

  return (
    <>
      <section id="product-add">
        <ToastContainer />
        <Title>Create category</Title>

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
                    {cateEditError && <ErrorBox>{cateEditError}</ErrorBox>}
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
                <Link to="/admin/dashboard/categories">
                  <button className="mt-4 mr-3 custom__button green">
                    Go back
                  </button>
                </Link>
                {cateEditLoading ? (
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

export default CategoryEdit;
