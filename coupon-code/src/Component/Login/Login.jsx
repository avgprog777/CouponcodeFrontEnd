import React from 'react'
import './Login.css'
import emailIcon from '../Assets/email.png'
import passwordIcon from '../Assets/password.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const Login = () => {
    const navigate = useNavigate();
    const initialFormData = {
        username: '',
        password: ''
    };
    const initialFormErrors = {
        username: '',
        password: ''
    };
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({
        username: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');

    const handleFocus = () => {
        setLoginError('');
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'Username') {
            if (!value || !/\S+@\S+\.\S+/.test(value)) {
                setFormErrors({
                    ...formErrors,
                    username: 'Please enter a valid email address'
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    username: ''
                });
            }

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        axios.post('https://localhost:7298/api/Authenticate', formData)
            .then((response) => {
                console.log('Response data:', response.data);
                if (response.status === 200) {
                    alert("Login successfully");
                    sessionStorage.setItem('UserData', JSON.stringify(response.data));
                    navigate('/Home');
                    setFormData(initialFormData);
                    setFormErrors(initialFormErrors);
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setLoginError('Invalid username or password');
                }
            });
    };
    return (
        <div className="login-container">
            <div className="header">
                <div className="text">Login</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <img src={emailIcon} alt="" />
                        <input
                            type="email"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                        {formErrors.email && <span className="error">{formErrors.email}</span>}
                    </div>
                    <div className="input">
                        <img src={passwordIcon} alt="" />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                    </div>
                    <div>
                        {loginError && <div className="login-error">{loginError}</div>}
                    </div>
                    <div className="submit-container">
                        <button type="submit" className="submit">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
