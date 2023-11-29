import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {Route, Router, Routes, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrderPage from "./pages/OrderPage";
import Loading from "./components/common/Loading";

function App() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        },2000)
    },[])

    return (
        <div className="App">
            <Routes>
            <Route path="/loading" element={<Loading/>}></Route>
            </Routes>

            {loading ? (
                <Loading/>
            ) : (
                <>
                    <Header/>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}></Route>
                        <Route path="/register" element={<RegisterPage/>}></Route>
                        <Route path="/order" element={<OrderPage/>}></Route>
                    </Routes>
                    <Footer/>
                </>
            )}
        </div>
    );
}

export default App;
