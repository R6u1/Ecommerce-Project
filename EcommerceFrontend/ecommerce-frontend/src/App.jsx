import './App.css'
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router";
import {HomePage} from "./pages/HomePage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {EmailVerifyPage} from "./pages/EmailVerifyPage.jsx";
import {ResetPasswordPage} from "./pages/ResetPasswordPage.jsx";

function App() {
    return(
        <>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/email-verify" element={<EmailVerifyPage/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>
            </Routes>
        </>
    );
}

export default App