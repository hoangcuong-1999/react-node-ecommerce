import React from "react";
import { Link } from "react-router-dom";

function SaleoffTable({ saleoffs }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="saleoff__name">Name</th>
            <th className="saleoff__method">Method</th>
            <th className="saleoff__discount">Discount</th>
            <th className="saleoff__applyFor">Apply for</th>
            <th className="saleoff__value">Value</th>
            <th className="saleoff__appliedProduct">Applied products</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {saleoffs &&
            saleoffs.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.method}</td>
                <td>{item.discount}</td>
                <td>{item.applyFor}</td>
                <td>{item.applyForValue}</td>
                <td>
                  <Link to="#">Applied products</Link>
                </td>
                <td>
                  <Link to="#">
                    <i class="far fa-trash-alt"></i>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default SaleoffTable;
