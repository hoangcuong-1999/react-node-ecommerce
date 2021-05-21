import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listCategory } from "../actions/categoryActions";
import { listBrand } from "../actions/brandActions";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";
import Product from "./Product";
import { filterPrices, filterRatings, filterByOrder } from "../utils";
import { filterProduct } from "../actions/productActions";
// import Pagination from "./Pagination";

function ShopPage2(props) {
  const {
    name = "all",
    category = "all",
    brand = "all",
    order = "price",
    type = "lowest",
    min = 0,
    max = 1000000,
    rating = 0,
    page = 1,
  } = useParams();

  const productList = useSelector((state) => state.productList);
  const {
    products,
    totalPages,
    loading: productListLoading,
    error: productListError,
  } = productList;
  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = categoryList;
  const brandList = useSelector((state) => state.brandList);
  const { brands, loading: brandLoading, error: brandError } = brandList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategory());
    dispatch(listBrand());
    dispatch(
      filterProduct({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        brand: brand !== "all" ? brand : "",
        order,
        type,
        min,
        max,
        rating,
        page,
      })
    );
  }, [dispatch, name, category, brand, order, type, min, max, rating, page]);

  const urlGenerator = (filterObj) => {
    const filterName = filterObj.name || name;
    const filterCategory = filterObj.category || category;
    const filterBrand = filterObj.brand || brand;
    const filterOrder = filterObj.order || order;
    const filterType = filterObj.type || type;
    const filterMin = filterObj.min
      ? filterObj.min
      : filterObj.min === 0
      ? 0
      : min;
    const filterMax = filterObj.max || max;
    const filterRating = filterObj.rating || rating;
    const filterPage = filterObj.page || page;
    return `/search/name/${filterName}/category/${filterCategory}/brand/${filterBrand}/order/${filterOrder}/type/${filterType}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/page/${filterPage}`;
  };

  const handleRedirect = () => {
    const url = `/search/name/all`;
    props.history.push(url);
  };

  return (
    <section id="shop2">
      <div className="container">
        <div className="shop2--content">
          <div className="row m-0">
            <div className="col-lg-3 p-0">
              <div className="shop2--content__left">
                <div className="left__content">
                  <div className="title">Categories</div>
                  <ul className="items">
                    {categoryLoading ? (
                      <LoadingBox />
                    ) : categoryError ? (
                      <ErrorBox>{categoryError}</ErrorBox>
                    ) : (
                      categories.map((item) => (
                        <li>
                          <Link
                            className={item.name === category ? "active" : ""}
                            to={urlGenerator({ category: item.name })}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
                <div className="left__content">
                  <div className="title">Brands</div>
                  <ul className="items">
                    {brandLoading ? (
                      <LoadingBox />
                    ) : brandError ? (
                      <ErrorBox>{brandError}</ErrorBox>
                    ) : (
                      brands.map((item) => (
                        <li>
                          <Link
                            className={item.name === brand ? "active" : ""}
                            to={urlGenerator({ brand: item.name })}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="left__content">
                  <div className="title">Filter price</div>
                  <ul className="items filterPrice">
                    {filterPrices.map((item) => (
                      <li>
                        <Link
                          className={
                            item.min === Number(min) && item.max === Number(max)
                              ? "active"
                              : ""
                          }
                          to={urlGenerator({ min: item.min, max: item.max })}
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="left__content">
                  <div className="title">Rating</div>
                  <ul className="items">
                    {filterRatings.map((item) => (
                      <li>
                        <Link to={urlGenerator({ rating: item.point })}>
                          <i
                            className={
                              item.point >= 1
                                ? "fa fa-star"
                                : item.point >= 0.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                          <i
                            className={
                              item.point >= 2
                                ? "fa fa-star"
                                : item.point >= 1.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                          <i
                            className={
                              item.point >= 3
                                ? "fa fa-star"
                                : item.point >= 2.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                          <i
                            className={
                              item.point >= 4
                                ? "fa fa-star"
                                : item.point >= 3.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                          <i
                            className={
                              item.point >= 5
                                ? "fa fa-star"
                                : item.point >= 4.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                          <span
                            className={
                              item.point === Number(rating) ? "active" : ""
                            }
                          >
                            {item.text && item.text}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="left__content">
                  <button onClick={handleRedirect}>Clear all</button>
                </div>
              </div>
            </div>
            <div className="col-lg-9 p-0">
              <div className="options">
                <span>Order by</span>
                {filterByOrder.map((item) => (
                  <div className="dropdown">
                    <span>
                      {item.text}
                      <img src="/assets/img/icon/download.png" alt="" />
                    </span>
                    <div className="dropdown__content">
                      {item.ddOptions.map((option) => (
                        <div
                          onClick={() =>
                            props.history.push(
                              urlGenerator({
                                order: option.order,
                                type: option.type,
                              })
                            )
                          }
                        >
                          {option.optionText}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="top__paginations">
                  <div className="top__paginations__number">
                    <span>{products && !products.length ? 0 : page}</span>
                    <span>/{totalPages && totalPages.length}</span>
                  </div>
                  <Link
                    className={Number(page) === 1 && "grey__bg"}
                    to={urlGenerator({ page: Number(page) - 1 })}
                  >
                    <i class="fas fa-chevron-left"></i>
                  </Link>
                  <Link
                    className={
                      Number(page) === (totalPages && totalPages.length) ||
                      (products && !products.length)
                        ? "grey__bg"
                        : ""
                    }
                    to={urlGenerator({
                      page:
                        Number(page) < (totalPages && totalPages.length)
                          ? Number(page) + 1
                          : Number(page),
                    })}
                  >
                    <i class="fas fa-chevron-right"></i>
                  </Link>
                </div>
              </div>

              {/* Products display */}
              {productListLoading ? (
                <LoadingBox />
              ) : productListError ? (
                <ErrorBox>{productListError}</ErrorBox>
              ) : products.length ? (
                <div className="products">
                  <div className="row m-0">
                    {products.map((product) => (
                      <div className="col-lg-3 p-0">
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="not-found">
                  <div className="not-found__icon">
                    <img src="/assets/img/icon/text-search.png" alt="" />
                  </div>
                  <div className="not-found__text">
                    Product not found
                    {/* <span>Please using more general keyword</span> */}
                  </div>
                </div>
              )}

              {/* Pagination */}
              {products && products.length ? (
                <div className="paginations">
                  <ul>
                    <li>
                      <Link to={urlGenerator({ page: Number(page) - 1 })}>
                        <i class="fas fa-chevron-left"></i>
                      </Link>
                    </li>
                    {totalPages &&
                      totalPages.map((item) => (
                        <li className={item === Number(page) && "active"}>
                          <Link to={urlGenerator({ page: item })}>{item}</Link>
                        </li>
                      ))}
                    <li>
                      <Link
                        to={urlGenerator({
                          page:
                            Number(page) < (totalPages && totalPages.length)
                              ? Number(page) + 1
                              : Number(page),
                        })}
                      >
                        <i class="fas fa-chevron-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopPage2;
