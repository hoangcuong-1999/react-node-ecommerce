import React, { useEffect } from "react";
import BreadCrum from "../breadcrum/BreadCrum";
import Title from "../title/Title";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSaleoff } from "../../actions/saleoffActions";
import SaleoffTable from "./SaleoffTable";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";

function SaleoffShow() {
  const saleoffList = useSelector((state) => state.saleoffList);
  const { saleoffs, loading, error } = saleoffList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSaleoff());
  }, [dispatch]);

  return (
    <section className="saleoff-show" id="saleoff-show">
      <Title>Sale offs</Title>
      <BreadCrum link="Saleoffs" />
      <div className="product-table">
        <div className="product-table__options">
          <div className="options options__search">
            <form>
              <input type="text" />
              <button type="submit">
                <i class="fas fa-search"></i>
              </button>
            </form>
          </div>
          <div className="options options__create">
            <Link to="/admin/dashboard/saleoff/add">
              <button className="create">Create</button>
            </Link>
          </div>
        </div>

        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorBox>{error}</ErrorBox>
        ) : (
          <SaleoffTable saleoffs={saleoffs} />
        )}
      </div>
    </section>
  );
}

export default SaleoffShow;
