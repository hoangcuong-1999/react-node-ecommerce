import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { createBrand, listBrand } from "../../actions/brandActions";
import { BRAND_CREATE_RESET } from "../../constants/brandConstants";

function BrandAdd() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createBrand({ name, description }));
  };

  const brandCreate = useSelector((state) => state.brandCreate);
  const { loading, error, brand } = brandCreate;

  // ComponentDidUpdate / ComponentDidMount
  useEffect(() => {
    if (brandCreate && brand) {
      toast.success("Brand created successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setName("");
      setDescription("");
      dispatch({ type: BRAND_CREATE_RESET });
      dispatch(listBrand());
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
  }, [brandCreate, brand, dispatch, error]);

  // ComponentWillUnmount
  useEffect(() => {
    return () => {
      dispatch({ type: BRAND_CREATE_RESET });
    };
  }, [dispatch]);

  return (
    <>
      <section id="product-add">
        <ToastContainer />
        <Title>Create brand</Title>

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
                  {error && <ErrorBox>{error}</ErrorBox>}
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
                    placeholder="Brand name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {/* {error && (
                    <div className="mt-2">
                      <ErrorBox>{error}</ErrorBox>
                    </div>
                  )} */}
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
                    placeholder="Brand description"
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
    </>
  );
}

export default BrandAdd;
