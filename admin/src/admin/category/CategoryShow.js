import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import BreadCrum from "../breadcrum/BreadCrum";
import Title from "../title/Title";
import Swal from "sweetalert2";
import { listCategory } from "../../actions/categoryActions";
import { CATEGORY_DELETE_RESET } from "../../constants/categoryConstants";
import CategoryTable from "./CategoryTable";

function CategoryShow() {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const {
    loading: cateListLoading,
    error: cateListError,
    categories,
  } = useSelector((state) => state.categoryList);
  const { deletedCategory } = useSelector((state) => state.categoryDelete);

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  useEffect(() => {
    if (deletedCategory) {
      Swal.fire("Success!", "Your order is placed successfully.", "success");
      dispatch({ type: CATEGORY_DELETE_RESET });
      dispatch(listCategory());
    }
  }, [deletedCategory, dispatch]);

  const search = (categories) => {
    return categories.filter(
      (category) =>
        category.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <>
      <section className="category-show" id="category-show">
        <Title>Categories</Title>
        <BreadCrum link="Categories" />
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
              <Link to="/admin/dashboard/categories/add">
                <button className="create">Create</button>
              </Link>
            </div>
          </div>

          {cateListLoading ? (
            <LoadingBox />
          ) : cateListError ? (
            <ErrorBox />
          ) : (
            <CategoryTable categories={search(categories)} />
          )}
        </div>
      </section>
    </>
  );
}

export default CategoryShow;
