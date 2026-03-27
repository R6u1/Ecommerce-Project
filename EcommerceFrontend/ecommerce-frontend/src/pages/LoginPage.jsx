import "./LoginPage.css";
import {useState, useEffect, useContext} from "react";
import {Link, NavLink, useNavigate} from "react-router";
import LogoWhite from "../assets/logo-white.png"
import axios from "axios";
import {AppContext} from "../context/AppContext.jsx";
import {toast} from "react-toastify";

export function LoginPage() {
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        setLoading(true);
        try {
            if (isCreateAccount) {
                //register API
                const response = await axios.post(`${backendUrl}/register`, {name, email, password});
                if (response.status === 201) {
                    navigate("/");
                    toast.success("Account created successfully.")
                } else {
                    toast.error("Email already exists.")
                }
            } else {
                //login API
                const response = await axios.post(`${backendUrl}/login`, {email, password});
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    getUserData();
                    navigate("/");
                } else {
                    toast.error("Email/Password incorrect");
                }
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <NavLink className="home-logo" to="/">
                <img src={LogoWhite}/>
            </NavLink>

            <form className="form" onSubmit={onSubmitHandler}>
                {isCreateAccount ?
                    <>
                        <h1>Create account</h1>
                        <p>Enter your credentials to register.</p>
                    </> :
                    <>
                        <h1>Welcome Back</h1>
                        <p>Enter your credentials to continue.</p>
                    </>}

                {isCreateAccount && (
                    <div className="input-wrapper">
                        <input type="text" placeholder="Enter your full name" required
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>)}

                <div className="input-wrapper">
                    <input type="text" placeholder="Enter your email" required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="input-wrapper">
                    <input type="password" placeholder="Enter your password" required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {!isCreateAccount && (
                    <div className="button-forgot-password">
                        <Link to="/reset-password">
                            Forgot password?
                        </Link>
                    </div>)
                }

                <div className="button-wrapper">
                    <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : isCreateAccount ? "Sign up" : "Login"}
                    </button>
                </div>

                {isCreateAccount ?
                    <>
                        Already have an account?
                        <span onClick={() => setIsCreateAccount(false)}>Login here</span>
                    </> :
                    <>
                        Don't have an account?
                        <span onClick={() => setIsCreateAccount(true)}>Sign up</span>
                    </>
                }
            </form>
        </div>
    );
}