import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../css/cart/Cart.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import axios from "axios";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  updateCartQuantity,
} from "../../../feature/cart/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  // const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleSetCartQuantity = (product, quantity) => {
    dispatch(updateCartQuantity({ productId: product.id, quantity }));
  };

  const handleShowModal = (cartItem) => {
    setItemToRemove(cartItem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setItemToRemove(null);
    setShowModal(false);
  };

  const handleRemoveFromCartWithConfirmation = (cartItem) => {
    handleShowModal(cartItem);
  };

  const handleConfirmRemoveFromCart = () => {
    handleRemoveFromCart(itemToRemove);
    handleCloseModal();
  };

  const [showClearModal, setShowClearModal] = useState(false);

  const handleShowClearModal = () => {
    setShowClearModal(true);
  };

  const handleCloseClearModal = () => {
    setShowClearModal(false);
  };

  const handleClearCartWithConfirmation = () => {
    handleShowClearModal();
  };

  const handleConfirmClearCart = () => {
    handleClearCart();
    handleCloseClearModal();
  };

  const handleCheckOutClick = async () => {
    if (username !== null) {
      // try {
      //   const cartItemsFromLocalStorage = localStorage.getItem("cartItems");

      //   if (cartItemsFromLocalStorage) {

      //     const cartItems = JSON.parse(cartItemsFromLocalStorage);
      //     const requestData = { cartItems };

      //     const response = await axios.post(
      //       "http://localhost:8080/api/cart",
      //       requestData,
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     );

      //     if (response.status === 200) {
      navigate("/checkout");
      //     } else {
      //       console.error(
      //         "Failed to save information to the database. Server returned:",
      //         response
      //       );
      //     }
      //   } else {
      //     console.error("No cart items found in Local Storage.");
      //   }
      // } catch (error) {
      //   console.error(
      //     "Error sending request to save information to the database:",
      //     error
      //   );
      // }
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="site-wrap">
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        SHOPPING CART
      </h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "#000",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>SubTotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          border: "0px",
                        }}
                        className="cart-product"
                      >
                        <img
                          src={cartItem.image}
                          alt={cartItem.name}
                          style={{
                            width: "100%",
                            maxWidth: "100px",
                            height: "100%",
                            maxHeight: "100px",
                          }}
                        />
                      </div>
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                        className="cart-product"
                      >
                        {cartItem.name}
                      </div>
                    </td>
                    <td>${cartItem.price}</td>
                    <td>${cartItem.size}</td>
                    <td>${cartItem.color}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                        className="cart-product-quantity"
                      >
                        <button
                          className={`btn`}
                          onClick={() => handleDecreaseCart(cartItem)}
                          disabled={cartItem.cartQuantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="count text-center"
                          value={cartItem.cartQuantity}
                          min={1}
                          max={50}
                          style={{ width: "30px", margin: "10px" }}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value) && value >= 1 && value <= 50) {
                              handleSetCartQuantity(cartItem, value);
                            }
                          }}
                        />
                        <button
                          className={`btn`}
                          onClick={() => handleAddToCart(cartItem)}
                          disabled={cartItem.cartQuantity >= 50}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>${cartItem.price * cartItem.cartQuantity}</td>
                    <td>
                      <button
                        className={`btn`}
                        style={{ padding: "5px 9px" }}
                        onClick={() =>
                          handleRemoveFromCartWithConfirmation(cartItem)
                        }
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <div className="summary-item">
              <button
                className="btn"
                onClick={() => handleClearCartWithConfirmation()}
                style={{ padding: "9px 9px" }}
              >
                Clear Cart
              </button>
            </div>

            <div className="summary-item">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                ></svg>
                <button className="btn" style={{ padding: "9px 9px" }}>
                  Continue Shopping
                </button>
              </Link>
            </div>

            <div className="summary-item">
              <button
                className="btn"
                style={{ padding: "9px 9px" }}
                onClick={handleCheckOutClick}
              >
                Check out
              </button>
            </div>

            <div className="summary-item d-flex align-items-center">
              <h3 style={{marginBottom : "0" ,     fontSize: "31px"}}>Total : ${cart.cartTotalAmount}</h3>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>REMOVE ITEM</Modal.Title>
          <button
            className="btn"
            style={{ padding: "6px 9px" }}
            onClick={handleCloseModal}
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove {itemToRemove && itemToRemove.name}{" "}
          from the cart ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn"
            style={{ padding: "6px 9px" }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn"
            style={{ padding: "6px 9px" }}
            onClick={handleConfirmRemoveFromCart}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showClearModal} onHide={handleCloseClearModal}>
        <Modal.Header>
          <Modal.Title>CLEAR CART</Modal.Title>
          <button
            className="btn"
            style={{ padding: "6px 9px" }}
            onClick={handleCloseClearModal}
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to clear the cart ? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn"
            style={{ padding: "6px 9px" }}
            onClick={handleCloseClearModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn"
            style={{ padding: "6px 9px" }}
            onClick={handleConfirmClearCart}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
