import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Login} from './Component/Login/Login'
import {Home} from './Component/Home/Home'
import ViewCoupon from './Component/ViewCoupon/ViewCoupon';
function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Home" element={<Home></Home>}></Route>
      <Route path="/ViewCoupon" element={<ViewCoupon></ViewCoupon>}></Route>
    </Routes>
  </Router>
);
  
}

export default App;
