import React from 'react'
import './ViewCoupon.css'; 
import Layout from '../Layout/Layout';
function ViewCoupon() {

    const storedUserData = sessionStorage.getItem('UserData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    return (
        <Layout userData={userData}>
            <div className="viewCoupon-container">
                <h1>Generated Coupon </h1>
            </div>
        </Layout>

    )
}

export default ViewCoupon