import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../../feature/cart/cartSlice";

import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

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
        Shopping Cart
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
                <th>Quantity</th>
                <th>Total</th>
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
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="count text-center"
                          value={cartItem.cartQuantity}
                          readOnly
                          style={{ width: "30px", margin: "10px" }}
                        />
                        <button
                          className={`btn`}
                          onClick={() => handleAddToCart(cartItem)}
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
                        onClick={() => handleRemoveFromCart(cartItem)}
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
              <button className="btn" onClick={() => handleClearCart()}>
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
                >
   
                </svg>
                <button className="btn">Continue Shopping</button>
              </Link>
            </div>

            <div className="summary-item">
              <button className="btn">Check out</button>
            </div>

            <div className="summary-item">
              <div className="subtotal">
              <button className="btn">Subtotal : ${cart.cartTotalAmount}</button>
              </div>
            </div>

         
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
