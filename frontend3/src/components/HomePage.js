import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";
import Product from "./Product";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import axios from "axios";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [lastestProducts, setLastestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/products")
      .then((res) => {
        setLoading(false);
        setOnSaleProducts(
          res.data.filter((product) => product.type === "On Sale")
        );
        setLastestProducts(
          res.data.filter((product) => product.type === "Lastest Product")
        );
        setFeaturedProducts(
          res.data.filter((product) => product.type === "Featured Product")
        );
      })
      .catch((err) => {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      });
  }, []);

  return (
    <>
      {/* Hero section */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero--slider">
                <Carousel itemsToShow={1}>
                  <div className="hero--slider__img hero--slider__img__text2">
                    <img src="/assets/img/hero/hero-4.jpg" alt="hero" />
                    <div className="hero--slider__img__text hero--slider__img__text2">
                      <h2>
                        Extra
                        <br />
                        25% off <span>On online payments</span>
                      </h2>
                      <div>
                        Get free
                        <br />
                        <span>Transparent bra traps</span>
                      </div>
                      <button>Shop Now</button>
                    </div>
                  </div>

                  <div className="hero--slider__img">
                    <img src="/assets/img/hero/hero-3.jpg" alt="hero" />
                    <div className="hero--slider__img__text hero--slider__img__text1">
                      <h2>
                        Kid smart <span>watches</span>
                      </h2>
                      <p>Enim aliquip incididunt laborum id ad qui.</p>
                      <div>
                        Only price: <span>$59.99</span>
                      </div>
                      <button>Shop Now</button>
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 pr-2">
              <div className="hero--banner">
                <img src="/assets/img/hero/hero-6.jpg" alt="hero" />
              </div>
            </div>
            <div className="col-lg-6 pl-1">
              <div className="hero--banner">
                <img src="/assets/img/hero/hero-7.jpg" alt="hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox>{error}</ErrorBox>
      ) : (
        <>
          {/* On sale section */}
          <section className="onsale" id="onsale">
            <div className="container">
              <div className="onsale--content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="onsale--content__box">
                      <div className="content__box__title">On sale</div>
                    </div>
                  </div>
                </div>
                <div className="onsale--products">
                  <Carousel itemsToShow={5}>
                    {onSaleProducts.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </section>

          {/* Lastest product section */}
          <section classNames="lastest-product" id="lastest-product">
            <div className="container">
              <div className="lastest-product--content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="lastest-product--content__box">
                      <div className="lastest-product--content__title">
                        Lastest Products
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lastest-product__products">
                <Carousel itemsToShow={5}>
                  {lastestProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </Carousel>
              </div>
            </div>
          </section>

          {/* Featured product */}
          <section classNames="featured-product" id="featured-product">
            <div className="container">
              <div className="lastest-product--content">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="featured-product--content__box">
                      <div className="featured-product--content__title">
                        Featured Products
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lastest-product__products">
                <Carousel itemsToShow={5}>
                  {featuredProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </Carousel>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default HomePage;
