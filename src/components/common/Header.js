import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubCategories,
  selectSubCategories,
  selectSubCategorySuccess,
  setSubCategorySuccess,
} from "../../feature/objects/subCategorySlice";
import {
  getCategories,
  selectCategories,
  selectCategorySuccess,
  setCategorySuccess,
} from "../../feature/objects/categorySlice";

function Header() {
  // Get List Category
  const [categories, setCategories] = useState([]);
  const dispatchCategory = useDispatch();
  const CategoryList = useSelector(selectCategories);
  const successCategory = useSelector(selectCategorySuccess);

  const getCategoryList = useCallback(async () => {
    if (!successCategory) {
      dispatchCategory(getCategories());
    } else {
      setCategories(CategoryList);
      dispatchCategory(setCategorySuccess(true));
    }
  }, [successCategory, dispatchCategory, CategoryList]);

  // Get List SubCategory
  const [subCategories, setSubCategories] = useState([]);
  const dispatchSubCategory = useDispatch();
  const SubCategoryList = useSelector(selectSubCategories);
  const successSubCategory = useSelector(selectSubCategorySuccess);

  const getSubCategoryList = useCallback(async () => {
    if (!successSubCategory) {
      dispatchSubCategory(getSubCategories());
    } else {
      setSubCategories(SubCategoryList);
      dispatchSubCategory(setSubCategorySuccess(true));
    }
  }, [successSubCategory, dispatchSubCategory, SubCategoryList]);

  const handleActive = (e) => {
    document.querySelectorAll(".main-menu ul li").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.parentNode.classList += " active";
  };
  const subActive = (e) => {
    document.querySelectorAll(".main-menu ul li").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.parentNode.classList += " active";
  };

  useEffect(() => {
    // SubMenu Dropdown Toggle
    if ($(".menu-area li.menu-item-has-children ul").length) {
      $(".menu-area .navigation li.menu-item-has-children").append(
        '<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>'
      );
    }
    if ($(".mobile-menu").length) {
      var mobileMenuContent = $(".menu-area .main-menu").html();
      $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);

      //Dropdown Button
      $(".mobile-menu li.menu-item-has-children .dropdown-btn").on(
        "click",
        function () {
          $(this).toggleClass("open");
          $(this).prev("ul").slideToggle(500);
        }
      );
      //Menu Toggle Btn
      $(".mobile-nav-toggler").on("click", function () {
        $("body").addClass("mobile-menu-visible");
      });

      //Menu Toggle Btn
      $(".menu-backdrop, .mobile-menu .close-btn").on("click", function () {
        $("body").removeClass("mobile-menu-visible");
      });
    }

    $(".navbar-toggle").on("click", function () {
      $(".navbar-nav").addClass("mobile_menu");
    });
    $(".navbar-nav li a").on("click", function () {
      $(".navbar-collapse").removeClass("show");
    });

    $(".header-search > a").on("click", function () {
      $(".search-popup-wrap").slideDown();
      return false;
    });

    $(".search-close").on("click", function () {
      $(".search-popup-wrap").slideUp(500);
    });
    getCategoryList();
    getSubCategoryList();
  }, [getSubCategoryList, getCategoryList]);

  return (
    <header>
      <div className="header-top-area">
        <div className="container custom-container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="header-top-left">
                <ul>
                  <li>Call us: 747-800-9880</li>
                  <li>
                    <i className="far fa-clock" />
                    Opening Hours: 7:00 am - 9:00 pm (Mon - Sun)
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-5">
              <div className="header-top-right">
                <ul className="header-top-social">
                  <li className="follow">Follow :</li>
                  <li>
                    <a href="/#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="/#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="sticky-header" className="menu-area">
        <div className="container custom-container">
          <div className="row">
            <div className="col-12">
              <div className="menu-wrap">
                <nav className="menu-nav show">
                  <div className="logo">
                    <Link to="/">
                      <img src="img/logo/logo.png" alt="" />
                    </Link>
                  </div>

                  <div className="navbar-wrap main-menu d-none d-lg-flex">
                    <ul className="navigation">
                      {[
                        ...new Set(
                          categories.map((category) => category.gender)
                        ),
                      ].map((gender) => (
                        <li
                          className="menu-item-has-children"
                          onClick={(e) => handleActive(e)}
                        >
                          <Link to="/">{gender}</Link>
                          <ul className="submenu">
                            {categories
                              .filter((category) => category.gender === gender)
                              .map((category) => (
                                <li onClick={(e) => subActive(e)}>
                                  <Link to="/">{category.name}</Link>
                                  <ul className="sub-submenu">
                                    {subCategories
                                      .filter(
                                        (subCategory) =>
                                          subCategory.categoryId === category.id
                                      )
                                      .map((subCategory) => (
                                        <li onClick={(e) => subActive(e)}>
                                          <Link to="/">{subCategory.name}</Link>
                                        </li>
                                      ))}
                                  </ul>
                                </li>
                              ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="header-action d-none d-md-block">
                    <ul>
                      <li className="header-search">
                        <Link to="/">
                          <i className="flaticon-search" />
                        </Link>
                      </li>
                      <li className="">
                        <a href="/#">
                          <BiUser style={{ fontSize: "30px" }}></BiUser>
                        </a>
                      </li>
                      <li className="header-shop-cart">
                        <a href="/#">
                          <i className="flaticon-shopping-bag" />
                          <span>2</span>
                        </a>
                        <ul className="minicart">
                          <li className="d-flex align-items-start">
                            <div className="cart-img">
                              <a href="/#">
                                <img src="img/product/cart_p01.jpg" alt="" />
                              </a>
                            </div>
                            <div className="cart-content">
                              <h4>
                                <a href="/#">The King Charles Spaniel</a>
                              </h4>
                              <div className="cart-price">
                                <span className="new">$229.9</span>
                                <span>
                                  <del>$229.9</del>
                                </span>
                              </div>
                            </div>
                            <div className="del-icon">
                              <a href="/#">
                                <i className="far fa-trash-alt" />
                              </a>
                            </div>
                          </li>
                          <li className="d-flex align-items-start">
                            <div className="cart-img">
                              <a href="/#">
                                <img src="img/product/cart_p02.jpg" alt="" />
                              </a>
                            </div>
                            <div className="cart-content">
                              <h4>
                                <a href="/#">The Labrador Retriever</a>
                              </h4>
                              <div className="cart-price">
                                <span className="new">$229.9</span>
                                <span>
                                  <del>$229.9</del>
                                </span>
                              </div>
                            </div>
                            <div className="del-icon">
                              <a href="/#">
                                <i className="far fa-trash-alt" />
                              </a>
                            </div>
                          </li>
                          <li>
                            <div className="total-price">
                              <span className="f-left">Total:</span>
                              <span className="f-right">$239.9</span>
                            </div>
                          </li>
                          <li>
                            <div className="checkout-link">
                              <a href="/#">Shopping Cart</a>
                              <a className="black-color" href="/#">
                                Checkout
                              </a>
                            </div>
                          </li>
                        </ul>
                      </li>
                      {/*<li className="header-btn"><Link to="/adoption" className="btn">Adopt Here <img src="img/icon/w_pawprint.png" alt="" /></Link></li>*/}
                    </ul>
                  </div>
                </nav>
              </div>
              
              <div className="menu-backdrop" />
            </div>
          </div>

      </div>

      
      </div>
      <div
        className="search-popup-wrap"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="search-close">
          <span>
            <i className="fas fa-times" />
          </span>
        </div>
        <div className="search-wrap text-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="title">... Search Here ...</h2>
                <div className="search-form">
                  <form>
                    <input
                      type="text"
                      name="search"
                      placeholder="Type keywords here"
                    />
                    <button className="search-btn">
                      <i className="fas fa-search" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
