import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { toast } from 'react-toastify'; // Import toast

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        newPassword: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        let endpointUrl = url;

        if (currState === "Login") {
            endpointUrl += "/api/user/login";
        } else if (currState === "Sign Up") {
            endpointUrl += "/api/user/register";
        } else if (currState === "Update Password") {
            endpointUrl += "/api/user/updatePassword";
        }

        try {
            const response = await axios.post(endpointUrl, data);

            if (response.data.success) {
                if (currState === "Login" || currState === "Sign Up") {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    setShowLogin(false);
                    toast.success("Logged in successfully!"); // Success toast
                } else {
                    toast.success("Password updated successfully."); // Success toast
                    setShowLogin(false);
                }
            } else {
                toast.error(response.data.message); // Error toast
            }
        } catch (error) {
            toast.error("An error occurred. Please try again."); // General error toast
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onSubmitHandler} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && 
                        <input name='username' onChange={onChangeHandler} value={data.username} type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    {(currState !== "Update Password") && 
                        <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />}
                    {currState === "Update Password" && 
                        <input name='newPassword' onChange={onChangeHandler} value={data.newPassword} type="password" placeholder='New Password' required />}
                </div>
                <button type='submit'>
                    {currState === "Sign Up" ? "Create Account" : 
                    currState === "Update Password" ? "Update Password" : "Login"}
                </button>
                {currState === "Login" && 
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>}
                {currState === "Sign Up" && 
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}
                {currState === "Login" && 
                    <p>Forgot password? <span onClick={() => setCurrState("Update Password")}>Click here</span></p>}
            </form>
        </div>
    );
}

export default LoginPopup;
