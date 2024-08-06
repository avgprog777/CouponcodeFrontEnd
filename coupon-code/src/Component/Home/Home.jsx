import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Navbar/Navbar";
import './Home.css';

export const Home = () => {
    const [count, setCount] = useState(0);
    const [reasons, setReasons] = useState([]);
    const [selectedReason, setSelectedReason] = useState("");
    const [textboxReason, setTextboxReason] = useState("");

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId')
    const increment = () => setCount(count + 1);
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleGenerateCouponCode = async () => {
        await generateCouponCode();
    };


    useEffect(() => {
        const fetchReasons = async () => {
            try {
                const response = await axios.get("https://localhost:7298/api/Authenticate/GetListOfReasons", {
                });
                setReasons(response.data);
            } catch (error) {
                console.error("Error fetching reasons:", error);
            }
        };

        fetchReasons();
    }, []);

    const handleReasonChange = (event) => {
        const reasonId = event.target.value;
        setSelectedReason(reasonId);
        if (reasonId !== "6") {
            setTextboxReason("");
        }
    };

    const handleAdditionalReasonChange = (event) => {
        const value = event.target.value;
        if (value.length <= 100) {
            setTextboxReason(value);
        }
    };
    const generateCouponCode = async () => {
        try {
            const response = await axios.get(`https://localhost:7298/api/Authenticate/GetCouponCode/${count}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Coupon code generated:", response.data);
        } catch (error) {
            console.error("Error generating coupon code:", error);
        }
    };
    const isFormValid = () => {
        if (count <= 0) return false;
        if (selectedReason === "") return false;
        if (selectedReason === "6" && textboxReason.trim() === "") return false;
        return true;
    };

    return (
        <div className="home-container">
            <NavBar />
            <div className="coupon-container">
                <h1>Generate Coupon Code</h1>
                <div className="counter-inner">
                    <span>Please Specify the Coupon quantity</span>
                    <button className="counter-button" onClick={increment}>+</button>
                    <span className="counter-value">{count}</span>
                    <button className="counter-button" onClick={decrement}>-</button>
                </div>
                <div className="dropdown-container">
                    <label className="lbl-reason">Please select the reason for Coupon Code:</label>
                    <select id="reason-select" value={selectedReason} onChange={handleReasonChange}>
                        <option value="">Select a reason</option>
                        {
                            reasons.map((reason) => (
                                <option key={reason.id} value={reason.id}>
                                    {reason.reason1}
                                </option>
                            ))
                        }
                    </select>
                    {selectedReason === "6" && (
                        <div className="additional-reason-container">
                            <label htmlFor="additional-reason">Please specify the reason:</label>
                            <input
                                id="additional-reason"
                                type="text"
                                value={textboxReason}
                                onChange={handleAdditionalReasonChange}
                                maxLength="100"
                                placeholder=" Upto 100 characters Limit"
                            />
                        </div>
                    )}
                </div>
                <button
                    className="generate-button"
                    onClick={handleGenerateCouponCode}
                    disabled={!isFormValid()}
                >
                    Generate Code
                </button>
            </div>
        </div>
    );
};
