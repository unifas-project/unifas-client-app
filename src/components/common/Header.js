
import {Link} from 'react-router-dom'
import $ from 'jquery';
import {BiUser} from "react-icons/bi";
import React, { useEffect, useState } from 'react';
import{ useDispatch, useSelector } from "react-redux";
import { getCategories, selectCategories, selectSuccess, setSuccess } from '../../feature/category/categorySlice';
import { getSubCategories, selectSubCategories, selectSuccess1, setSuccess1 } from '../../feature/category/subCategorySlice';

function Header(){
  const handleActive = (e)=>{
    document.querySelectorAll('.main-menu ul li').forEach( el => {
      el.classList.remove('active');
    })
    e.target.parentNode.classList += ' active';
  }
    const subActive = (e)=>{
    document.querySelectorAll('.main-menu ul li ul li').forEach( el => {
      el.classList.remove('active');
    })
    e.target.parentNode.classList += ' active';
  }
  useEffect(()=>{


    //SubMenu Dropdown Toggle
if ($('.menu-area li.menu-item-has-children ul').length) {
	$('.menu-area .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');

}
    if ($('.mobile-menu').length) {

	var mobileMenuContent = $('.menu-area .main-menu').html();
	$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);

	//Dropdown Button
	$('.mobile-menu li.menu-item-has-children .dropdown-btn').on('click', function () {
		$(this).toggleClass('open');
		$(this).prev('ul').slideToggle(500);
	});
	//Menu Toggle Btn
	$('.mobile-nav-toggler').on('click', function () {
		$('body').addClass('mobile-menu-visible');
	});

	//Menu Toggle Btn
	$('.menu-backdrop, .mobile-menu .close-btn').on('click', function () {
		$('body').removeClass('mobile-menu-visible');
	});
}

   $(".navbar-toggle").on('click', function () {
        $(".navbar-nav").addClass("mobile_menu");
      });
      $(".navbar-nav li a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
      });

        $(".header-search > a").on('click', function () {
        $(".search-popup-wrap").slideToggle();
          return false;
        });

        $(".search-close").on('click',function () {
        $(".search-popup-wrap").slideUp(500);
        });
  },[])

  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const CategoryList = useSelector(selectCategories);
  const success = useSelector(selectSuccess);

  const getCategoryList = async () => {
      if (!success) {
          dispatch(getCategories());
      }
      else {
        setCategories(CategoryList)
        dispatch(setSuccess(true));
      }
    };
    
    useEffect(() => {
      getCategoryList();
    }, [success]);

    const [subCategories, setSubCategories] = useState([]);
    const dispatch2 = useDispatch();
    const SubCategoryList = useSelector(selectSubCategories);
    const success2 = useSelector(selectSuccess1);
  
    const getSubCategoryList = async () => {
        if (!success2) {
          dispatch2(getSubCategories());
        }
        else {
          setSubCategories(SubCategoryList)
          dispatch2(setSuccess1(true));
        }
      };
      
      useEffect(() => {
        getSubCategoryList();
      }, [success2]);

    return(
<header>
        <div className="header-top-area">
          <div className="container custom-container">
            <div className="row align-items-center">
              <div className="col-md-7">
                <div className="header-top-left">
                  <ul>
                    <li>Call us: 747-800-9880</li>
                    <li><i className="far fa-clock" />Opening Hours: 7:00 am - 9:00 pm (Mon - Sun)</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="header-top-right">
                  <ul className="header-top-social">
                    <li className="follow">Follow :</li>
                    <li><a href="/#"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href="/#"><i className="fab fa-twitter" /></a></li>
                    <li><a href="/#"><i className="fab fa-instagram" /></a></li>
                    <li><a href="/#"><i className="fab fa-linkedin-in" /></a></li>
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
                <div className="mobile-nav-toggler"><i className="fas fa-bars" /></div>
                <div className="menu-wrap">
                  <nav className="menu-nav show">
                    <div className="logo"><Link to="/"><img src="img/logo/logo.png" alt="" /></Link></div>
                    <div className="navbar-wrap main-menu d-none d-lg-flex">
                      <ul className="navigation">

                        <li className="menu-item-has-children">
                          <Link to="/" onClick={(e)=> handleActive(e)}>Nữ</Link>
                          <ul className="submenu">
                            {categories.map((category) => 
                              category.gender === 'NỮ' ? (
                                <>
                                  <li><Link to="/" onClick={(e)=> subActive(e)}>{category.name}</Link></li>
                                  {subCategories.map((subCategory) => 
                                    subCategory.categoryId === category.id ?
                                    <li><Link to="/" onClick={(e)=> subActive(e)}>{subCategory.name}</Link></li>
                                    : null
                                  )}
                                </>
                              ) : null
                            )}
                          </ul>
                        </li>

                          <li className="menu-item-has-children">
                          <Link to="/" onClick={(e)=> handleActive(e)}>NAM</Link>
                          <ul className="submenu">
                          {categories.map((category) => 
                              category.gender === 'NAM' ? 
                              <li><Link to="/" onClick={(e)=> subActive(e)}>{category.name}</Link></li> 
                              : null
                          )}
                          </ul>
                          </li>

                          <li className="menu-item-has-children">
                          <Link to="/" onClick={(e)=> handleActive(e)}>TRẺ EM</Link>
                          <ul className="submenu">
                          {categories.map((category) => 
                              category.gender === 'TRẺ EM' ? 
                              <li><Link to="/" onClick={(e)=> subActive(e)}>{category.name}</Link></li> 
                              : null
                          )}
                          </ul>
                          </li>

                          <li className="menu-item-has-children">
                          <Link to="/" onClick={(e)=> handleActive(e)}>TRẺ SƠ SINH</Link>
                          <ul className="submenu">
                          {categories.map((category) => 
                              category.gender === 'TRẺ SƠ SINH' ? 
                              <li><Link to="/" onClick={(e)=> subActive(e)}>{category.name}</Link></li> 
                              : null
                          )}
                          </ul>
                          </li>

                      </ul>
                    </div>
                    <div className="header-action d-none d-md-block">
                      <ul>
                        <li className="header-search">
                          <a href="/#"><i className="flaticon-search" /></a>
                        </li>
                        <li className="">
                          <a href="/#"><BiUser style={{fontSize : "30px"}}></BiUser></a>
                        </li>
                        <li className="header-shop-cart"><a href="/#"><i className="flaticon-shopping-bag" /><span>2</span></a>
                          <ul className="minicart">
                            <li className="d-flex align-items-start">
                              <div className="cart-img">
                                <a href="/#"><img src="img/product/cart_p01.jpg" alt="" /></a>
                              </div>
                              <div className="cart-content">
                                <h4><a href="/#">The King Charles Spaniel</a></h4>
                                <div className="cart-price">
                                  <span className="new">$229.9</span>
                                  <span><del>$229.9</del></span>
                                </div>
                              </div>
                              <div className="del-icon">
                                <a href="/#"><i className="far fa-trash-alt" /></a>
                              </div>
                            </li>
                            <li className="d-flex align-items-start">
                              <div className="cart-img">
                                <a href="/#"><img src="img/product/cart_p02.jpg" alt="" /></a>
                              </div>
                              <div className="cart-content">
                                <h4><a href="/#">The Labrador Retriever</a></h4>
                                <div className="cart-price">
                                  <span className="new">$229.9</span>
                                  <span><del>$229.9</del></span>
                                </div>
                              </div>
                              <div className="del-icon">
                                <a href="/#"><i className="far fa-trash-alt" /></a>
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
                                <a className="black-color" href="/#">Checkout</a>
                              </div>
                            </li>
                          </ul>
                        </li>
                        {/*<li className="header-btn"><Link to="/adoption" className="btn">Adopt Here <img src="img/icon/w_pawprint.png" alt="" /></Link></li>*/}
                      </ul>
                    </div>
                  </nav>
                </div>
             
                <div className="mobile-menu">
                  <nav className="menu-box">
                    <div className="close-btn"><i className="fas fa-times" /></div>
                    <div className="nav-logo"><Link to="/"><img src="img/logo/logo.png" alt="" title='true' /></Link>
                    </div>
                    <div className="menu-outer">
                  
                    </div>
                    <div className="social-links">
                      <ul className="clearfix">
                        <li><a href="/#"><span className="fab fa-twitter" /></a></li>
                        <li><a href="/#"><span className="fab fa-facebook-square" /></a></li>
                        <li><a href="/#"><span className="fab fa-pinterest-p" /></a></li>
                        <li><a href="/#"><span className="fab fa-instagram" /></a></li>
                        <li><a href="/#"><span className="fab fa-youtube" /></a></li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="menu-backdrop" />
         
              </div>
            </div>
          </div>
          {/*<div className="header-shape" style={{backgroundImage:"url('img/bg/header_shape.png')"}}/>*/}
        </div>
       
        <div className="search-popup-wrap" tabIndex={-1} role="dialog" aria-hidden="true">
          <div className="search-close">
            <span><i className="fas fa-times" /></span>
          </div>
          <div className="search-wrap text-center">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="title">... Search Here ...</h2>
                  <div className="search-form">
                    <form>
                      <input type="text" name="search" placeholder="Type keywords here" />
                      <button className="search-btn"><i className="fas fa-search" /></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      
      </header>
    )
}

export default Header