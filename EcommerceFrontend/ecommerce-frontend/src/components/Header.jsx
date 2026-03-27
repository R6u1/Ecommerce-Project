import {NavLink, useNavigate} from "react-router";
import Logo from "../assets/logo.png";
import CartFavicon from "../assets/cart-favicon.png";
import SearchIcon from "../assets/search-icon.png"
import "./Header.css";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import {toast} from "react-toastify";

export function Header() {
    const {userData, backendUrl, setUserData, setIsLoggedIn} = useContext(AppContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Inchide dropdown-ul cand dai click in afara
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendUrl + "/logout");
            if (response.status === 200) {
                setIsLoggedIn(false);
                setUserData(false);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sendVerification = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendUrl + "/send-otp");
            if (response.status === 200) {
                navigate("/email-verify");
                toast.success("OTP has been sent successfully.")
            } else {
                toast.error("Unable to send OTP.")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink className="header-link" to="/">
                    <img className="logo" src={Logo} alt=""/>
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search"/>
                <button className="search-button">
                    <img className="search-icon" src={SearchIcon}/>
                </button>
            </div>

            <div className="right-section">
                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartFavicon}/>
                    <div className="cart-quantity">0</div>
                    <div className="cart-text">Cart</div>
                </NavLink>

                {userData ? (
                    <div className="avatar-wrapper" ref={dropdownRef}>
                        <div className="avatar" onClick={() => setDropdownOpen(prev => !prev)}>
                            {userData.name.charAt(0).toUpperCase()}
                        </div>

                        {dropdownOpen && (
                            <div className="dropdown">
                                {!userData.isAccountVerified && (
                                    <div className="dropdown-item" onClick={sendVerification}>Verify email</div>
                                )}
                                <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink to="/login">
                        <button className="login-button">Login</button>
                    </NavLink>
                )}
            </div>
        </div>
    );
}