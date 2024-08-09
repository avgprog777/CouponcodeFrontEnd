import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import axios from 'axios';


function Navbar({ userData}) {
  const navigate = useNavigate()
  const [couponLimit, setCouponLimit] = useState(null);
  const [error, setError] = useState(null);
  const handleLogout = () => {   
    sessionStorage.clear(); 
    navigate('/')
  };
  const { userId,userLevel, userName } = userData || {};

  useEffect(() => {
    const fetchCouponLimit = async () => {
      try {
        const response = await axios.get(`https://localhost:7298/api/Authenticate/GetCouponcodelimitbyUser/${userId}`);
        setCouponLimit(response.data);
      } catch (err) {
        setError('Failed to fetch coupon limit');
        console.error('Error fetching coupon limit:', err);
      }
    };
  
    if (userId) {
      fetchCouponLimit();
    }
  }, [userId]); // Added userId to dependency array
  

  return (
    <nav className="navbar">
    <div className="navbar-container">
        <a href="/Home" className="navbar-logo">Coupon Code </a>
        {userName && (
            <span className="navbar-username">Welcome, {userName.split('@')[0]}</span>
          )}
          {couponLimit != null && (
    <span className='navbar-couponlimit'>
        Coupon Limit: {typeof couponLimit === 'number' ? couponLimit : 'Limit exceeded'}
    </span>
)}

        <ul className="navbar-menu">
        
        {userLevel === 2 || userLevel === 3 ? (
                        <li><a href="./ViewCoupon">View Coupon</a></li>
                    ) : null}
            <li><a href="#contact">Contact</a></li>
            <li><button className="btn btn-light" onClick={handleLogout}>Logout</button></li>
        </ul>     
    </div>
  </nav>
  )
}
export default Navbar