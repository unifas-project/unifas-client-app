
import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Route, Routes } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePassword from "./pages/ChangePassword";
import Search from "./pages/Search";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
      <Footer />
  
    </div>
  );
}

export default App;
