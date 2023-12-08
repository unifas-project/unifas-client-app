import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubCategories,
  selectSubCategories,
  selectSubCategorySuccess,
  setSubCategorySuccess,
} from "../../feature/subCategory/subCategorySlice";
import {
  getCategories,
  selectCategories,
  selectCategorySuccess,
  setCategorySuccess,
} from "../../feature/category/categorySlice";
import BeforeAfterLogin from "../main/account/BeforeAfterLogin";

import axios from "axios";
import { UNIFAS_API } from "../../constants/api";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUsername = localStorage.getItem("username");
  const [username, setUsername] = useState(storedUsername);


  // Get List Category
  const [categories, setCategories] = useState([]);
  const CategoryList = useSelector(selectCategories);
  const successCategory = useSelector(selectCategorySuccess);

  const getCategoryList = useCallback(async () => {
    if (!successCategory) {
      dispatch(getCategories());
    } else {
      setCategories(CategoryList);
      dispatch(setCategorySuccess(true));
    }
  }, [successCategory, dispatch, CategoryList]);

  // Get List SubCategory
  const [subCategories, setSubCategories] = useState([]);
  const SubCategoryList = useSelector(selectSubCategories);
  const successSubCategory = useSelector(selectSubCategorySuccess);

  const getSubCategoryList = useCallback(async () => {
    if (!successSubCategory) {
      dispatch(getSubCategories());
    } else {
      setSubCategories(SubCategoryList);
      dispatch(setSubCategorySuccess(true));
    }
  }, [successSubCategory, dispatch, SubCategoryList]);

  useEffect(() => {
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

  useEffect(() => {
    if (storedUsername) {
      setUsername(storedUsername);
    }
  },[storedUsername])

  const handleActive = (e) => {
    document.querySelectorAll(".main-menu ul li").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.parentNode.classList += "active";
  };
  const subActive = (e) => {
    document.querySelectorAll(".main-menu ul li ul li").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.parentNode.classList += "active";
  };
  const [searchValue, setSearchValue] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${searchValue}`);
    $(".search-popup-wrap").slideUp(500);
  };

  const [cart, setCart] = useState([]);

  useEffect(() => {
    handleGetAllCartItem();
    console.log(cart);
  }, []);

  const handleGetAllCartItem = async () => {

    if(username != null) {
      const userId = localStorage.getItem("id");
    const response = await axios.get(`${UNIFAS_API}/cart/${userId}`);
    setCart(response.data.data);
    }
  };



  let totalQuantiy = 0;

  let array = cart?.cartItemResponseList;
  for (let i = 0; i < array?.length; i++) {
    totalQuantiy +=  array[i].quantity;
  }



  
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

      <div
        id="sticky-header"
        className="menu-area"
        style={{ boxShadow: "#e8e8e8 0px 22px 10px -20px" }}
      >
        <div className="container custom-container" style={{ width: "85%" }}>
          <div className="row">
            <div className="col-12">
              <div className="menu-wrap">
                <nav className="menu-nav show">
                  <div className="logo">
                    <Link to="/">
                      <img
                        src="/img/logo/UNIFAS-200px.png"
                        alt=""
                        style={{ maxWidth: "30%" }}
                      />
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
                              ?.filter((category) => category.gender === gender)
                              .map((category) => (
                                <li onClick={(e) => subActive(e)}>
                                  <Link to="/">{category.name}</Link>
                                  <ul className="sub-submenu">
                                    {subCategories
                                      ?.filter(
                                        (subCategory) =>
                                          subCategory.category.id === category.id
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
                        <a to="/">
                          <i className="flaticon-search" />
                        </a>
                      </li>

                      <li>
                        <BeforeAfterLogin />
                      </li>

              

                      <li className="header-shop-cart">
                    
                      {username !== null ? (
                         <Link to="/cart">
                        
                         <i className="flaticon-shopping-bag" />

                         
                         <span style={{ color: "red" }}>
               
                           {totalQuantiy}
                         </span>
                       </Link>

                      ) : (
                        <Link to="/cart">
                        
                        <i className="flaticon-shopping-bag" />

                        
                        <span style={{ color: "red" }}>
              
                          {0}
                        </span>
                      </Link>
                      )}
                       
                      </li>


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
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      name="search"
                      placeholder="Type keywords here"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
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
