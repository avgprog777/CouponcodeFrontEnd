import React, { useState, useEffect } from "react";
import axios from "axios";
import './CouponCode.css';

export const CouponCode = ({userData}) => {
    const [count, setCount] = useState(0);
    const [reasons, setReasons] = useState([]);
    const [selectedReason, setSelectedReason] = useState("");
    const [textboxReason, setTextboxReason] = useState("");
    const [couponCodes, setCouponCodes] = useState([]);
    const [error, setError] = useState("");
    const { userId,token } = userData || {};
    const increment = () => setCount(count + 1);
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleGenerateCouponCode = async () => {
        try {
            const reasonParam = selectedReason === "6" ? "other" : selectedReason.value;
            const additionalReasonParam = selectedReason === "6" ? encodeURIComponent(textboxReason) : "";
            console.log(selectedReason);
            console.log(additionalReasonParam)
            const response = await axios.post('https://localhost:7298/api/Authenticate/GetCouponCode', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200){

                setCouponCodes(response.data);
            }
           else if (response.status === 400){
                alert("Hello");
                setError()
                console.log(response.data);
            }
            setError("");
        } catch (error) {
            console.error("Error generating coupon code:", error);
            setCouponCodes([]);
            setError("Failed to generate coupon codes. Please try again.");
        }
    };

    useEffect(() => {
        const fetchReasons = async () => {
            try {
                const response = await axios.get("https://localhost:7298/api/Authenticate/GetListOfReasons");
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

    const isFormValid = () => {
        if (count <= 0) return false;
        if (selectedReason === "") return false;
        if (selectedReason === "6" && textboxReason.trim() === "") return false;
        return true;
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Coupon code copied to clipboard!");
        }, (err) => {
            console.error("Failed to copy coupon code:", err);
        });
    };

    return (
        <div className="coupon-container">
            <div className="coupon-header">
                <h1>Generate Coupon Code</h1>
            </div>
            <form onSubmit={handleGenerateCouponCode}> 
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
                        <textarea
                            id="additional-reason"
                            value={textboxReason}
                            onChange={handleAdditionalReasonChange}
                            maxLength="100"
                            placeholder="Up to 100 characters limit"
                            rows="2"
                            cols="45"
                        />
                    </div>
                )}
            </div>
            </form>

            <button
                className="generate-button"
                onClick={handleGenerateCouponCode}
                disabled={!isFormValid()}
            >
                Generate Code
            </button>
            {error && <div className="error-message">{error}</div>}
            {couponCodes.length > 0 && (
                <div className="coupon-codes-container">
                    {couponCodes.map((code, index) => (
                        <div key={index} className="coupon-code-item">
                            <input
                                type="text"
                                readOnly
                                value={code}
                                className="coupon-code-input"
                            />
                            <button
                                className="copy-button"
                                onClick={() => copyToClipboard(code)}
                            >
                                Copy
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};
