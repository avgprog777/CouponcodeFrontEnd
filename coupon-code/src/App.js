import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import {Login} from './Component/Login/Login'
import {Home} from './Component/Home/Home'
function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Home" element={<Home></Home>}></Route>
    </Routes>
  </Router>
);
  
}

export default App;
