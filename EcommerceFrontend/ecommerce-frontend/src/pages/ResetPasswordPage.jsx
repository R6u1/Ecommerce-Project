import "./ResetPasswordPage.css"
import {Link, useNavigate} from "react-router";
import Logo from "../assets/logo.png";
import {useContext, useRef, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";

export function ResetPasswordPage() {
    const inputRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const {getUserData, isLoggedIn, userData, backendUrl} = useContext(AppContext);

    axios.defaults.withCredentials = true;


    return (
        <div className="reset-container">
            <Link className="home-logo" to="/">
                <img src={Logo}/>
            </Link>

            {!isEmailSent && (
                <div className="reset-card">
                    <h4 className="reset-title">Reset password</h4>
                    <p className="reset-text">Enter your registered email address</p>
                    <form className="reset-form">
                        <input className="email-input"
                               type="email"
                               placeholder="Enter email address"
                               onChange={(e) => setEmail(e.target.value)}
                               value={email}
                               required/>
                        <button className="submit-button" type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}