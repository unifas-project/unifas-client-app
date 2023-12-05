import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import React, { useEffect, useState } from "react";
import OrderPage from "./pages/OrderPage";
import Loading from "./components/common/Loading";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePassword from "./pages/ChangePassword";
import CreateSaleVoucherPage from "./pages/admin/CreateSaleVoucherPage";
import ShowAllSaleVoucherPage from "./pages/admin/ShowAllSaleVoucherPage";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/forget-password" element={<ForgetPassword />}></Route>
            <Route path="/change-password" element={<ChangePassword />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/order" element={<OrderPage />}></Route>
            <Route path="/loading" element={<Loading />}></Route>
            <Route path="/admin/sale-voucher/create" element={<CreateSaleVoucherPage/>}></Route>
            <Route path="/admin/sale-voucher/show" element={<ShowAllSaleVoucherPage/>}></Route>
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}
export default App;
