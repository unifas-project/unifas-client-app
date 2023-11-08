import './App.css';
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {Route, Router, Routes, Switch} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <div className="App">

            <Header/>
            <Routes>

                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>

            </Routes>
            <Footer/>

        </div>
    );
}

export default App;
