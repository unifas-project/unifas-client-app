import './App.css';
import Header from "./components/common/Header";
import {Route, Routes} from "react-router-dom";
import Login from './components/login/Login';
import LoginPage from './page/LoginPage/LoginPage';
import SignupPage from './page/SignupPage/SignupPage';
// import { Counter } from './feature/counter/Counter';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Header/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/register" element={<SignupPage/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
