import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listCategory } from "../actions/categoryActions";
import { listBrand } from "../actions/brandActions";
import data from "../data";
import ErrorBox from "./ErrorBox";
import LoadingBox from "./LoadingBox";
import Product from "./Product";
import { filterPrices } from "../utils";

function ShopPage2() {
  const { name = "all", brand = "all", category = "all" } = useParams();
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
  }, [dispatch]);

  return (
    <section id="shop2">
      <div className="container p-0">
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
                      categories.map((category) => (
                        <li>
                          <Link to={`/search/category/${category.name}`}>
                            {category.name}
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
                      brands.map((brand) => (
                        <li>
                          <Link to={`/search/brand/${brand.name}`}>
                            {brand.name}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="left__content">
                  <div className="title">Filter price</div>
                  <ul className="items">
                    {filterPrices.map((price) => (
                      <li>
                        <Link to="#">{price.text}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9 p-0">
              <div className="options">
                <span>Order by</span>
                <div className="dropdown">
                  <span>
                    Price
                    <img src="/assets/img/icon/down-chevron.png" alt="" />
                  </span>
                  <div className="dropdown__content">
                    <div>Price: Low to High</div>
                    <div>Price: High to Low</div>
                  </div>
                </div>

                <div className="dropdown">
                  <span>
                    View
                    <img src="/assets/img/icon/down-chevron.png" alt="" />
                  </span>
                  <div className="dropdown__content">
                    <div>View: Low to High</div>
                    <div>View: High to Low</div>
                  </div>
                </div>

                <div className="dropdown">
                  <span>
                    Star
                    <img src="/assets/img/icon/down-chevron.png" alt="" />
                  </span>
                  <div className="dropdown__content">
                    <div>Star: Low to High</div>
                    <div>Star: High to Low</div>
                  </div>
                </div>
              </div>
              {/* Products display */}
              <div className="products">
                <div className="row m-0">
                  {data.products.map((product) => (
                    <div className="col-lg-3 p-0">
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopPage2;
