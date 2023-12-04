import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import FilterForm from "./FilterForm";
import { Link } from "react-router-dom";

function ProductList() {
  return (
    <>
      <div class="container-fluid">
        <div class="row px-xl-5">
          <div class="col-lg-3 col-md-12"></div>
          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="dropdown ml-auto">
                    <button
                      className="btn border dropdown-toggle"
                      type="button"
                      id="triggerId"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link className="dropdown-item" to="#">
                        Latest
                      </Link>
                      <Link className="dropdown-item" to="#">
                        Popularity
                      </Link>
                      <Link className="dropdown-item" to="#">
                        Best Rating
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://suckhoedoisong.qltns.mediacdn.vn/2014/3-20140713093040-1405079463-3-2038-1419663128-1419670649954.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://afamilycdn.com/150157425591193600/2022/8/11/10930912936956820104589788551165867324828271n-1660209470704295124104.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://nguoinoitieng.vn/wp-content/uploads/2019/08/tom-tat-thong-tin-tieu-su-tam-tit.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://media.phunutoday.vn/files/upload_images/2014/06/15/tam%20tit.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://suckhoedoisong.qltns.mediacdn.vn/2014/3-20140713093040-1405079463-3-2038-1419663128-1419670649954.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://suckhoedoisong.qltns.mediacdn.vn/2014/3-20140713093040-1405079463-3-2038-1419663128-1419670649954.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://suckhoedoisong.qltns.mediacdn.vn/2014/3-20140713093040-1405079463-3-2038-1419663128-1419670649954.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://suckhoedoisong.qltns.mediacdn.vn/2014/3-20140713093040-1405079463-3-2038-1419663128-1419670649954.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://suckhoedoisong.qltns.mediacdn.vn/2014/3-20140713093040-1405079463-3-2038-1419663128-1419670649954.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://suckhoedoisong.qltns.mediacdn.vn/2014/3-20140713093040-1405079463-3-2038-1419663128-1419670649954.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://suckhoedoisong.qltns.mediacdn.vn/2014/3-20140713093040-1405079463-3-2038-1419663128-1419670649954.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src="https://suckhoedoisong.qltns.mediacdn.vn/2014/3-20140713093040-1405079463-3-2038-1419663128-1419670649954.jpg"
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-center bg-light border">
                    <Link
                      to=""
                      className="btn btn-sm text-dark p-0"
                      style={{ background: "transparent" }}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 pb-1">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center mb-3">
                    <li className="page-item disabled">
                      <Link
                        className="page-link"
                        to="#"
                        aria-label="Previous"
                        style={{ color: "red" }}
                      >
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                        style={{ color: "red" }}
                      >
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                        style={{ color: "red" }}
                      >
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                        style={{ color: "red" }}
                      >
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                        aria-label="Next"
                        style={{ color: "red" }}
                      >
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Next</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
