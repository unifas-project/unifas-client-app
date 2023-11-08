
import './App.css';
import Header from "./components/common/Header";
import {Route, Routes} from "react-router-dom";
// import { Counter } from './feature/counter/Counter';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Header/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
