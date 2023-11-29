import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Route, Routes } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePassword from "./pages/ChangePassword";
import Checkout from "./components/main/checkout/Checkout";
import DashBoard from "./components/main/account/DashBoard";
import List from "./pages/list/List";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/dashboard" element={<DashBoard/>}></Route>
        <Route path="/users" element={<List/>}></Route>
             
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
