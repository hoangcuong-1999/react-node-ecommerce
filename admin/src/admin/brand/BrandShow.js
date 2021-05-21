import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import BreadCrum from "../breadcrum/BreadCrum";
import Title from "../title/Title";
import Swal from "sweetalert2";
import { listBrand } from "../../actions/brandActions";
import { BRAND_DELETE_RESET } from "../../constants/brandConstants";
import BrandTable from "./BrandTable";

function BrandShow() {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const {
    loading: brandListLoading,
    error: brandListError,
    brands,
  } = useSelector((state) => state.brandList);
  const { deletedBrand } = useSelector((state) => state.brandDelete);

  useEffect(() => {
    dispatch(listBrand());
  }, [dispatch]);

  useEffect(() => {
    if (deletedBrand) {
      Swal.fire("Success!", "Your brand is deleted successfully.", "success");
      dispatch({ type: BRAND_DELETE_RESET });
      dispatch(listBrand());
    }
  }, [deletedBrand, dispatch]);

  const search = (brands) => {
    return brands.filter(
      (brand) => brand.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <>
      <section className="brand-show" id="brand-show">
        <Title>Brands</Title>
        <BreadCrum link="Brands" />
        <div className="product-table">
          <div className="product-table__options">
            <div className="options options__search">
              <form>
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
              <Link to="/admin/dashboard/brands/add">
                <button className="create">Create</button>
              </Link>
            </div>
          </div>

          {brandListLoading ? (
            <LoadingBox />
          ) : brandListError ? (
            <ErrorBox />
          ) : (
            <BrandTable brands={search(brands)} />
          )}
        </div>
      </section>
    </>
  );
}

export default BrandShow;
