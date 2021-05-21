import React, { useEffect, useState } from "react";
import BreadCrum from "./BreadCrum";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import Product from "./Product";
import { Link } from "react-router-dom";
import {
  // listCategory,
  // listBrand,
  getSearchResults,
} from "../actions/productActions";
import { listCategory } from "../actions/categoryActions";
import { listBrand } from "../actions/brandActions";
import { useDispatch, useSelector } from "react-redux";
import SelectFilter from "./SelectFilter";

function SearchPage(props) {
  const [sortCriteria, setSortCriteria] = useState("");

  const getSortCriteria = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortArray = (condition, productArray) => {
    // let data = [];
    // if (condition === "price-low-to-high") {
    //   data = []
    //     .concat(productArray)
    //     .sort((a, b) => (a.price > b.price ? 1 : -1));
    // } else if (condition === "price-high-to-low") {
    //   data = []
    //     .concat(productArray)
    //     .sort((a, b) => (a.price > b.price ? -1 : 1));
    // }
    // return data;
    switch (condition) {
      case "price-low-to-high":
        return []
          .concat(productArray)
          .sort((a, b) => (a.price > b.price ? 1 : -1));
      case "price-high-to-low":
        return []
          .concat(productArray)
          .sort((a, b) => (a.price > b.price ? -1 : 1));
      case "view-low-to-high":
        return []
          .concat(productArray)
          .sort((a, b) => (a.numReviews > b.numReviews ? 1 : -1));
      case "view-high-to-low":
        return []
          .concat(productArray)
          .sort((a, b) => (a.numReviews > b.numReviews ? -1 : 1));
      case "star-low-to-high":
        return []
          .concat(productArray)
          .sort((a, b) => (a.rating > b.rating ? 1 : -1));
      case "star-high-to-low":
        return []
          .concat(productArray)
          .sort((a, b) => (a.rating > b.rating ? -1 : 1));
      default:
        return [];
    }
  };

  const searchList = useSelector((state) => state.searchList);
  const { loading: searchLoading, error: searchError } = searchList;
  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = categoryList;
  const brandList = useSelector((state) => state.brandList);
  const { brands, loading: loadingBrands, error: errorBrands } = brandList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getSearchResults(
        props.match.params.name,
        props.match.params.category,
        props.match.params.brand
      )
    );
    dispatch(listCategory());
    dispatch(listBrand());
  }, [dispatch, props]);

  const getSearchList = () => {
    return {
      data: sortArray(sortCriteria, searchList.searchResults),
      loading: searchList.loading,
      error: searchList.error,
    };
  };

  return (
    <>
      <BreadCrum currenLink="Search Results" />
      {/* Shop Section */}
      <div className="container">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9">
            <div className="search__title">
              <h4 className="d-flex align-items-center">
                <img src="/assets/img/icon/research.png" alt="" /> Results for
                keyword <span>{props.match.params.name}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>

      <section class="shop spad">
        <div class="container">
          {searchLoading ? (
            <LoadingBox />
          ) : (
            <div class="row">
              <div class="col-lg-3">
                <div class="shop__sidebar">
                  {/* <div class="shop__sidebar__search">
                    <form action="#">
                      <input type="text" placeholder="Search..." />
                      <button type="submit">
                        <span class="icon_search">
                          <i className="fas fa-search"></i>
                        </span>
                      </button>
                    </form>
                  </div> */}
                  <div class="shop__sidebar__accordion">
                    <div class="accordion" id="accordionExample">
                      <div class="card">
                        <div class="card-heading">
                          <Link
                            data-toggle="collapse"
                            data-target="#collapseOne"
                          >
                            Categories
                          </Link>
                        </div>
                        <div
                          id="collapseOne"
                          class="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <div class="shop__sidebar__categories">
                              <ul class="nice-scroll">
                                {loadingCategories ? (
                                  <LoadingBox></LoadingBox>
                                ) : errorCategories ? (
                                  <ErrorBox>{errorCategories}</ErrorBox>
                                ) : (
                                  categories.map((cate) => (
                                    <li>
                                      <Link
                                        to={
                                          props.match.params.name &&
                                          props.match.params.brand
                                            ? `/search/name/${props.match.params.name}/category/${cate.name}/brand/${props.match.params.brand}`
                                            : `/search/name/${props.match.params.name}/category/${cate.name}`
                                        }
                                        className={
                                          props.match.params.category ===
                                          cate.name
                                            ? "active"
                                            : ""
                                        }
                                      >
                                        {cate.name}
                                      </Link>
                                    </li>
                                  ))
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="card">
                        <div class="card-heading">
                          <Link
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                          >
                            Branding
                          </Link>
                        </div>
                        <div
                          id="collapseTwo"
                          class="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <div class="shop__sidebar__brand">
                              <ul>
                                {loadingBrands ? (
                                  <LoadingBox />
                                ) : errorBrands ? (
                                  <ErrorBox>{errorBrands}</ErrorBox>
                                ) : (
                                  brands.map((brand) => (
                                    <li>
                                      <Link
                                        className={
                                          props.match.params.brand ===
                                          brand.name
                                            ? "active"
                                            : ""
                                        }
                                        to={
                                          props.match.params.name &&
                                          props.match.params.category
                                            ? `/search/name/${props.match.params.name}/category/${props.match.params.category}/brand/${brand.name}`
                                            : `/search/name/${props.match.params.name}/brand/${brand.name}`
                                        }
                                      >
                                        {brand.name}
                                      </Link>
                                    </li>
                                  ))
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div class="card">
                        <div class="card-heading">
                          <Link
                            data-toggle="collapse"
                            data-target="#collapseThree"
                          >
                            Filter Price
                          </Link>
                        </div>
                        <div
                          id="collapseThree"
                          class="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <div class="shop__sidebar__price">
                              <ul>
                                <li>
                                  <Link to="#">$0.00 - $50.00</Link>
                                </li>
                                <li>
                                  <Link to="#">$50.00 - $100.00</Link>
                                </li>
                                <li>
                                  <Link to="#">$100.00 - $150.00</Link>
                                </li>
                                <li>
                                  <Link to="#">$150.00 - $200.00</Link>
                                </li>
                                <li>
                                  <Link to="#">$200.00 - $250.00</Link>
                                </li>
                                <li>
                                  <Link to="#">250.00+</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-9">
                <div class="shop__product__option">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                      {/* <div class="shop__product__option__left">
                        <p>Showing 1–12 of 126 results</p>
                      </div> */}
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                      <div class="shop__product__option__right">
                        <SelectFilter getSortCriteria={getSortCriteria} />
                      </div>
                    </div>
                  </div>
                </div>
                {searchError ? (
                  <div className="row">
                    <div className="col-lg-12">
                      <ErrorBox>{searchError}</ErrorBox>
                    </div>
                  </div>
                ) : (
                  <div class="row">
                    {getSearchList().data.map((product) => (
                      <div class="col-lg-4 col-md-6 col-sm-6">
                        <Product key={product._id} product={product} />
                      </div>
                    ))}
                  </div>
                )}
                {/* <div class="row">
                  {searchResults.map((product) => (
                    <div class="col-lg-4 col-md-6 col-sm-6">
                      <Product key={product._id} product={product} />
                    </div>
                  ))}
                </div> */}
                {/* <div class="row">
                  <div class="col-lg-12">
                    <div class="product__pagination">
                      <Link class="active" to="#">
                        1
                      </Link>
                      <Link to="#">2</Link>
                      <Link to="#">3</Link>
                      <span>...</span>
                      <Link to="#">21</Link>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchPage;
