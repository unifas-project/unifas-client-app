import './App.css';
import Header from "./components/common/Header";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/common/Footer";
// import { Counter } from './feature/counter/Counter';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
