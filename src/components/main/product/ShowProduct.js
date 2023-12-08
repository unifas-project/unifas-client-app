import React from "react";
import { Link } from "react-router-dom";
import "../../../css/search.css";

function ShowProduct({ data }) {

  const uniqueColors = new Set();

  return (
    <div className="col-lg-4 col-md-4 ">
      <div className="adoption-shop-item item-border">
        <div className="adoption-shop-thumb">
          <img src={`${data?.imageProductList[0]?.url}`} alt="" />
          <Link to={`/products/${data.id}`} className="btn">
            View
          </Link>
        </div>
        <div className="adoption-shop-content">
          <h4 className="title name-truncate">
            <Link to={`/products/${data.id}`}>{data?.name}</Link>
          </h4>
          <div className="adoption-meta">
            <ul className="size-color-center item-center">
              <li className="item-center text-small text-uppercase">
                {[
                  ...new Set(
                    data?.variantList?.map(
                      (variant) => variant.sizeResponse?.name
                    )
                  ),
                ].join(",")}
                {/* {sizes?.join(",")} */}
              </li>
              <li className="d-flex item-center">
                {data?.variantList?.map((variant, key) => {
                  const color = variant?.colorResponse?.code;

                  // Chỉ render nếu màu không trùng nhau
                  if (!uniqueColors.has(color)) {
                    uniqueColors.add(color);

                    return (
                      <div
                        key={key}
                        style={{
                          width: "20px",
                          height: "20px",
                          margin: "0 0 0 4px",
                          border: "1px solid black",
                          backgroundColor: `${color}`,
                        }}
                      ></div>
                    );
                  }

                  return null; // Không render nếu màu trùng nhau
                })}{" "}
              </li>
            </ul>
          </div>
          <div className="adoption-rating">
            <ul>
              <li className="rating">
                {Array.from({ length: data?.star }, (_, index) => (
                  <i key={index} className="fas fa-star" />
                ))}
              </li>
              <li className="price">
                Price : <span className="price">{data?.price.toLocaleString()}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowProduct;
