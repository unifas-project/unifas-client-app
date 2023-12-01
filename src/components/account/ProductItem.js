import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/search.css";

function ProductItem({ data }) {
  const [sizes, setSizes] = useState(null);
  const [colors,setColors] = useState(null);
  useEffect(() => {
    if (sizes === null) {
        let arrSize = []
      for (let i = 0; i < data?.variantResponseList?.length; i++) {
        let item = data?.variantResponseList[i];
        arrSize.push(item?.sizeResponse?.name);
    }
    setSizes([...new Set(arrSize)]);
    }
    if (colors === null) {
      let arrColor = [];
      for (let i = 0; i < data?.variantResponseList?.length; i++) {
        let item = data?.variantResponseList[i];
        arrColor.push(item?.colorResponse?.code);
      }
      setColors([...new Set(arrColor)]);
    }
  });
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
          <h4 className="title">
            <Link to="/shop-details">{data?.name}</Link>
          </h4>
          <div className="adoption-meta">
            <ul>
              <li>
                <h4 className="text-small text-uppercase">
                  {sizes?.join(",")}
                </h4>
              </li>
              <li className="d-flex">
                {colors?.map((color, key) => (
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
                ))}
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
                Total Price : <span>{data?.price}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
