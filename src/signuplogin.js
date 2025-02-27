import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupLogin.css"

const SignupLogin = () => {
    const [isSignup, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignUp(!isSignup);
    };
    

    
    return(
        <div className={`container ${isSignup ? "right-panel-active" : ""}`}>
{isSignup ? ( 
     <div className="form-container sign-up">
                <form>
                    <h1>Create Account</h1>
                    <img className="blackpaw blackpaw-1" src="/black2paw.png" alt="Black2 Paw 1" />
                <img className="blackpaw blackpaw-2" src="/black2paw.png" alt="Black2 Paw 2" />
                <img className="blackpaw blackpaw-3" src="/black2paw.png" alt="Black2 Paw 3" />
                <img className="blackpaw blackpaw-4" src="/black2paw.png" alt="Black2 Paw 4" />
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="email" />
                    <input type="tel" placeholder="Phone Number" />
                    <input type="password" placeholder="Password" />
                    <input type="cpassword" placeholder="Confirm Password" />
                    <button type="button" onClick={() => navigate("/startQuiz")}>Sign Up</button>
                    
                </form>
            </div>
):(

    <div className="form-container sign-in">
        <form>
            <h1>Sign In</h1>
            <img className="blackpaw blackpaw-1" src="/black2paw.png" alt="Black2 Paw 1" />
                <img className="blackpaw blackpaw-2" src="/black2paw.png" alt="Black2 Paw 2" />
                <img className="blackpaw blackpaw-3" src="/black2paw.png" alt="Black2 Paw 3" />
                <img className="blackpaw blackpaw-4" src="/black2paw.png" alt="Black2 Paw 4" />
            <span> Use your email address</span>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="Password" />
            <Link to="/forget-password">Forgot Password? </Link>
            <button type="button" onClick={() => navigate("/startQuiz")}>Log In</button>
        </form>
    </div>
)}

    {/* left side panel */}
             <div className="toggle-container">
                <div className="toggle">
                    <div className="toggel-panel toggle-left">
                        <h1> Welcome Back! </h1>
                        <p>Login back in to see your Pet Recommendations!</p>
                        <button className="hidden" onClick={toggleForm}> Log In </button>
                    </div>
    
                 {/* right side panel */}
             <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Welcome to Pet MatchMaker! Our platform helps  gather your information to find your specific pets!</p>
                        <p>New to the website? Create an account to save your details and let us help you find the perfect pet just for you!</p>
                        <button className="hidden" onClick={toggleForm}> Sign Up </button> 
                    </div>
                 </div>
               </div>
             </div>

            
         
   );
};

export default SignupLogin;