import React, {useState, useEffect, useRef} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignupLogin.css"
import { registerUser, loginUser } from "./api/authService"; //import service functions

const SignupLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isSignup, setIsSignUp] = useState(false);

    //Updates the 'isSignUp' state based on the value passed from the welcome screen when navigating to auth
    useEffect(() => {
        if (location.state?.isSignup !== undefined) {
            setIsSignUp(location.state.isSignup);
        }
    }, [location.state]);

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    // Store form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    const { name, email, password, confirmPassword } = formData;

    const resetError = () =>{
        if (passwordRef.current) passwordRef.current.setCustomValidity("");  
        if (confirmPasswordRef.current) confirmPasswordRef.current.setCustomValidity("");
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        //Reset the error messages fields when user types
        resetError()
    };


    // Handle form submission (Signup/Login)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            // Sign-up logic
            if (password !== confirmPassword) {
                if (confirmPasswordRef.current) {
                    confirmPasswordRef.current.setCustomValidity("Passwords do not match!");
                    confirmPasswordRef.current.reportValidity();
                }

                return;
            }
            
            try {
                const newUser = await registerUser({ name, email, password });
                console.log("User registered:", newUser);
                navigate("/startQuiz"); // Redirect after signup
            } catch (error) {
                console.error("Signup failed:", error.response?.data?.message || error.message);
            }
        } else {
            // Login logic
            try {
                const data = await loginUser({ email, password });
                console.log("Login successful:", data);
                localStorage.setItem("token", data.token); // Store JWT
                navigate("/startQuiz"); // Redirect after login
            } catch (error) {
                console.error("Login failed:", error.response?.data?.message || error.message);

                if (passwordRef.current) {
                    passwordRef.current.setCustomValidity(error.response?.data?.message || "Invalid email or password.");
                    passwordRef.current.reportValidity();
                }

            }
        }
    };


    
    return(
        <div className={`container ${isSignup ? "right-panel-active" : ""}`}>
            {isSignup ? ( 
                <div className="form-container sign-up">
                    <form onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <img className="blackpaw blackpaw-1" src="/black2paw.png" alt="Black2 Paw 1" />
                        <img className="blackpaw blackpaw-2" src="/black2paw.png" alt="Black2 Paw 2" />
                        <img className="blackpaw blackpaw-3" src="/black2paw.png" alt="Black2 Paw 3" />
                        <img className="blackpaw blackpaw-4" src="/black2paw.png" alt="Black2 Paw 4" />
                        <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
                        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm Password" required ref={confirmPasswordRef}/>
                        <button type="submit">Sign Up</button>

                    </form>
                        </div>
            ):(
        <div className="form-container sign-in">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <img className="blackpaw blackpaw-1" src="/black2paw.png" alt="Black2 Paw 1" />
                <img className="blackpaw blackpaw-2" src="/black2paw.png" alt="Black2 Paw 2" />
                <img className="blackpaw blackpaw-3" src="/black2paw.png" alt="Black2 Paw 3" />
                <img className="blackpaw blackpaw-4" src="/black2paw.png" alt="Black2 Paw 4" />
                <span> Use your email address</span>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required ref={passwordRef}
                />
                <Link to="/forget-password">Forgot Password? </Link>
                <button type="submit">Log In</button>
            </form>
        </div>
        )}

        {/* left side panel */}
                    <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggel-panel toggle-left">
                            <h1> Welcome Back! </h1>
                            <p>Login back in to see your Pet Recommendations!</p>
                            <button className="hidden" onClick={() => {setIsSignUp(false); resetError()}}> Log In </button>
                        </div>

                        {/* right side panel */}
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Welcome to Pet MatchMaker! Our platform helps  gather your information to find your specific pets!</p>
                            <p>New to the website? Create an account to save your details and let us help you find the perfect pet just for you!</p>
                            <button className="hidden" onClick={() => {setIsSignUp(true); resetError()}}> Sign Up </button>
                            </div>
                        </div>
                    </div>
                    </div>
         
   );
};

export default SignupLogin;