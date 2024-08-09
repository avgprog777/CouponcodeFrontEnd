import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewCoupon.css'; 
import Layout from '../Layout/Layout';

function ViewCoupon() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const storedUserData = sessionStorage.getItem('UserData');
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const userId = userData?.userId;

    useEffect(() => {
        if (!userId) {
            console.error('User ID is missing');
            setLoading(false);
            return;
        }

        axios.get(`https://localhost:7298/api/Authenticate/GetCouponCodeListByUserId/${userId}`)
            .then(response => {
                console.log('API Response:', response.data); // Log response data
                setCoupons(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error); // Log errors
                setError(error);
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Layout userData={userData}>
            <div className="viewCoupon-container">
                <h1>Generated Coupon </h1>
                <h1>Coupon Code List</h1>
                 <table>
                    <thead>
                        <tr>
                            <th>SR.</th>
                            <th>Reason</th>
                            <th>Coupon Code</th>
                            <th>Generate Date</th>
                            <th>Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.length > 0 ? coupons.map((coupon,index) => (
                            <tr key={coupon.couponId}>
                                 <td>{index + 1}</td>
                                <td>{coupon.reason}</td>
                                <td>{coupon.couponCode1}</td>
                                <td>{new Date(coupon.generatedTime).toLocaleString()}</td>
                                <td>{new Date(coupon.expirationTime).toLocaleString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default ViewCoupon;
