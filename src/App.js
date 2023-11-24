import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Route, Routes } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
