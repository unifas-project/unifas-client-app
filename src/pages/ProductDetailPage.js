import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import React, { useEffect, useState, useCallback } from "react";
import {
  getAllProduct,
  selectProductSuccess,
  selectProductList,
  selectProductDetail,
  getProduct,
} from "../../src/feature/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Star from "../components/common/Star";
import { addToCart } from "../feature/cart/cartSlice";
import axios from 'axios';
import {toast} from "react-toastify";

function ProductDetailPage() {
  const dispatch = useDispatch();
  // Get List Product
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const { productId } = useParams();

  const usernameLocal = localStorage.getItem("username");

  const [username, setUsername] = useState(usernameLocal);


  
   const navigate = useNavigate("");


  const location = useLocation();

  const productDetail = useSelector(selectProductDetail);
  const ProductList = useSelector(selectProductList);
  const successProduct = useSelector(selectProductSuccess);

  useEffect(() => {
    if (productDetail != null) {
      dispatch(getProduct(location.pathname.slice(10)));
      window.scrollTo(0, 0);
    }
  }, [location.pathname.slice(10)]);

  const getProductList = useCallback(async () => {
    if (!successProduct) {
      dispatch(getAllProduct());
    } else {
      setProducts(ProductList);
    }
  }, [successProduct, dispatch, ProductList]);

  const getProductDetail = useCallback(async () => {
    if (productDetail == null) {
      dispatch(getProduct(productId));
    } else {
      setProduct(productDetail);
    }
  }, [productId, dispatch, productDetail]);

  useEffect(() => {
    getProductDetail();
    getProductList();
  }, [productId, getProductDetail, getProductList]);

 
  const [cartItem, setCartItem] = useState({
    productId: productId,
    size : "",
    color : "",
    quantity : 1
  })


  const handleAddToCart = async () => {
    if (username !== null) {
      const alert = toast.loading("Please wait for a second");
      const userId = localStorage.getItem("id");
      try {
        const response = await axios.post(
          `http://localhost:8080/api/user/${userId}/cart`,
          cartItem,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          dispatch(addToCart(cartItem));
          toast.update(alert, {
            render: "Added item successfully",
            type: "success",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            isLoading: false,
          });
          console.log(response.data);
        } else {
          toast.update(alert, {
            render: "Failed to add item to cart",
            type: "error",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
        toast.update(alert, {
          render: "Some error happened",
          type: "error",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          isLoading: false,
        });
      }
    } else {
      navigate("/register");
    }
  };
  


  const imdb = product.star;

  const [val, setVal] = useState(1);
  const increase = () => {
    if (val < product.stock) {
      setVal(val + 1);
    }
  };
  const decrease = () => {
    if (val > 1) {
      setVal(val - 1);
    }
  };

  useEffect(() => {
    setCartItem({...cartItem,quantity: val})
  },[val])

  const handleActive = (e) => {
    e.preventDefault();

    document.querySelectorAll(".shop-details-dimension ul li").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.parentNode.classList = "active";


  };

  const colorActive = (e) => {
    e.preventDefault();

    document.querySelectorAll(".shop-details-color ul li").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList += " active";


  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 1000,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          speed: 1000,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          speed: 1000,
        },
      },
    ],
  };

  return (
    <section className="shop-details-area pt-30 pb-50">
      <div className="container">
        <div className="shop-details-wrap">
          <div className="row">
            <div className="col-7">
              <div className="shop-details-img-wrap">
                <div className="tab-content" id="myTabContent">
                  {product.imageProductList &&
                    product.imageProductList.map((image, index) => (
                      <div
                        className={`tab-pane ${
                          index === 0 ? "show active" : ""
                        }`}
                        id={`item-${index}`}
                        role="tabpanel"
                        aria-labelledby={`item-${index}-tab`}
                        key={index}
                      >
                        <div className="shop-details-img">
                          <img src={image.url} alt="" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="shop-details-nav-wrap">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  {product.imageProductList &&
                    product.imageProductList.map((image, index) => (
                      <li className="nav-item" role="presentation" key={index}>
                        <a
                          className={`nav-link ${index === 0 ? "active" : ""}`}
                          id={`item-${index}-tab`}
                          data-toggle="tab"
                          href={`/#item-${index}`}
                          role="tab"
                          aria-controls={`item-${index}`}
                          aria-selected={index === 0}
                        >
                          <img src={image.url} alt="" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="col-5">
              <div className="shop-details-content">
                <span>
                  {product && product.subCategory
                    ? product.subCategory.name
                    : "Updating..."}
                </span>
                <h2 className="title">{product.name}</h2>
                <div className="shop-details-review">
                  <span>
                    <h3>Rating: </h3>
                    <Star imdb={imdb} />
                  </span>
                </div>
                <div className="shop-details-price">
                  <h2 className="price">
                    Price:{" "}
                    {product && product.price
                      ? product.price.toLocaleString("vi-VN")
                      : "Updating..."}{" "}
                    VND
                  </h2>
                  <h5 className="stock-status">
                    In Stock:{" "}
                    {product && product.stock ? product.stock : "Updating..."}
                  </h5>
                </div>

                <div className="shop-details-dimension">
                  <span>Dimension :</span>
                  <ul>
                    {product.variantList &&
                      (() => {
                        const uniqueSizes = {};
                        return product.variantList
                          .filter((variant) => {
                            if (!uniqueSizes[variant.sizeResponse.name]) {
                              uniqueSizes[variant.sizeResponse.name] = true;
                              return true;
                            }
                            return false;
                          })
                          .map((variant, index) => (
                            <li
                              key={index}
                              className={index === 0 ? "active" : ""}
                              value={variant.sizeResponse.name}
                              onClick={(e) => {handleActive(e, variant.sizeResponse.name)
                                setCartItem({...cartItem,size: e.target.innerText})
                              }}
                            >
                              <a href="/#">
                                {variant.sizeResponse.name}
                              </a>
                            </li>
                          ));
                      })()}
                  </ul>
                </div>
                <div className="shop-details-color">
                  <span>Color :</span>
                  <ul>
                    {product.variantList &&
                      (() => {
                        const uniqueColors = {};
                        return product.variantList
                          .filter((variant) => {
                            if (!uniqueColors[variant.colorResponse.name]) {
                              uniqueColors[variant.colorResponse.name] = true;
                              return true;
                            }
                            return false;
                          })
                          .map((variant, index) => (
                            <li
                              key={index}
                              value={variant.colorResponse.name}
                              className={`${index === 0 ? "  active" : ""} ${
                                variant.colorResponse.name
                              }`}
                              onClick={(e) => {colorActive(e, variant.colorResponse.name)
                                setCartItem({...cartItem,color: e.target.classList.value})
                              }}
                            ></li>
                          ));
                      })()}
                  </ul>
                </div>
                <div className="shop-details-quantity">
                  <span>Quantity :</span>
                  <div className="cart-plus-minus">
                    <input value={val} readOnly
                     type="number"
                    />
                    <div className="dec qtybutton" onClick={() => decrease()}>
                      -
                    </div>
                    <div className="inc qtybutton" onClick={() => {
                      increase()
                    }}>
                      +
                    </div>
                  </div>

                </div>
                <div>
                  <button
                      className="btn mt-3"
                      value={JSON.stringify(product)}
                      onClick={() => {
                        // handleAddToCart(JSON.parse(this.value))
                        handleAddToCart().then()

                      }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-12">
            <div className="product-desc-wrap">
              <ul className="nav nav-tabs" id="myTabTwo" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="details-tab"
                    data-toggle="tab"
                    href="/#details"
                    role="tab"
                    aria-controls="details"
                    aria-selected="true"
                  >
                    Details More
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="val-tab"
                    data-toggle="tab"
                    href="/#val"
                    role="tab"
                    aria-controls="val"
                    aria-selected="false"
                  >
                    Information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="review-tab"
                    data-toggle="tab"
                    href="/#review"
                    role="tab"
                    aria-controls="review"
                    aria-selected="false"
                  >
                    Reviews
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContentTwo">
                <div
                  className="tab-pane fade show active"
                  id="details"
                  role="tabpanel"
                  aria-labelledby="details-tab"
                >
                  <div className="product-desc-content">
                    <p>
                      The domestic dog is a doiated dendant of the wolf. The dog
                    </p>
                    <p>
                      These will include the core vaccines, which are
                    </p>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="val"
                  role="tabpanel"
                  aria-labelledby="val-tab"
                >
                  <div className="product-desc-info">
                    <div className="row">
                      <div className="col-xl-3 col-md-5">
                        <div className="product-desc-img">
                          <img src="img/product/desc_img.jpg" alt="" />
                        </div>
                      </div>
                      <div className="col-xl-9 col-md-7">
                        <h5 className="small-title">100% Knit Knacks</h5>
                        <p>
                          Cramond Leopard &amp; Pythong Print Anorak Jacket In
                        </p>
                        <ul className="product-desc-list">
                          <li>65% poly, 35% rayon</li>
                          <li>Partially lined</li>
                          <li>
                            Hidden front button closure with keyhole accents
                          </li>
                          <li>Button cuff sleeves</li>
                          <li>Lightweight semi-sheer fabrication</li>
                          <li>Made in USA</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                >
                  <div className="product-desc-review">
                    <div className="review-title mb-20">
                      <h4 className="title">Customer Reviews (0)</h4>
                    </div>
                    <div className="left-rc">
                      <p>No reviews yet</p>
                    </div>
                    <div className="right-rc">
                      <a href="/#">Write a review</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="related-products-wrap">
          <h2 className="title">Related Products</h2>
          <Slider className="row related-product-active" {...settings}>
            {products?.data?.map((product, index) => (
              <div className="col-lg">
                <div className="shop-item mb-55" key={index}>
                  <div className="shop-thumb">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.imageProductList[0].url} alt="" />
                    </Link>
                  </div>
                  <div className="shop-content">
                    <span>
                      {" "}
                      {product && product.subCategory
                        ? product.subCategory.name
                        : "Updating..."}
                    </span>
                    <h4 className="title">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </h4>
                    <div className="shop-content-bottom">
                      <span className="price">
                        Price:{" "}
                        {product && product.price
                          ? product.price.toLocaleString("vi-VN")
                          : "Updating..."}{" "}
                        VND
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
export default ProductDetailPage;
