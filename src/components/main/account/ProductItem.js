import React from "react";
import { Link } from "react-router-dom";
import "../../../css/search.css";

function ProductItem({ data }) {

  const uniqueColors = new Set();

  return (
    <div className="col-lg-4 col-md-4 ">
      <div className="adoption-shop-item item-border">
        <div className="adoption-shop-thumb">
          <img src={`${data?.imgResponseList[0]?.url}`} alt="" />
          <Link to="/shop-details" className="btn">
            Adoption <img src="img/icon/w_pawprint.png" alt="" />
          </Link>
        </div>
        <div className="adoption-shop-content">
          <h4 className="title name-truncate">
            <Link to="/shop-details line-clamp-2 ">{data?.name}</Link>
          </h4>
          <div className="adoption-meta">
            <ul className="size-color-center item-center">
              <li className="item-center text-small text-uppercase">
                {[
                  ...new Set(
                    data?.variantResponseList?.map(
                      (variant) => variant.sizeResponse?.name
                    )
                  ),
                ].join(",")}
                {/* {sizes?.join(",")} */}
              </li>
              <li className="d-flex item-center">
                {data?.variantResponseList?.map((variant, key) => {
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
                Price : <span className="price">{data?.price}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
