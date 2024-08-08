import React, { useState, useEffect } from "react";
import './Home.css';
import { CouponCode } from "../CouponCode/CouponCode";
import Layout from "../Layout/Layout";

export const Home = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const storedUserData = sessionStorage.getItem('UserData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {
            setUserData(null);
        }
    }, []);

    const userLevel = userData?.userLevel;
    if (!userData) {
        return <div className="error-loading">Loading...</div>;
    }

    return (
        <Layout  userData={userData}>
        <div className="home-container"> 
            {userLevel === 2 || userLevel === 3 ? (
                <CouponCode  userData={userData}/>
            ) : (
                <h1 className="feature-access-error">You do not have access to Coupon Generation feature.</h1>
            )}
        </div>
        </Layout>

    );
};
