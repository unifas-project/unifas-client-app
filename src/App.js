import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';
import { Counter } from './feature/counter/Counter';
import Register from './components/common/Register';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    
  );
}

export default App;
