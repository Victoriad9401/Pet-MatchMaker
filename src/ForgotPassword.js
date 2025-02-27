import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgetPassword.module.css";



const ForgotPassword = () => {
    const navigate = useNavigate();
  
    return (
        
        <div className={styles.forgotPasswordContainer}> {/* Use CSS Module class */}
            <div className={styles.centeredContainer}> {/* Use CSS Module class */}
                <div className={styles.formContainer}> {/* Use CSS Module class */}
                    <form>
                        <h1>Forgot Password</h1>
                        <input type="email" placeholder="Email" />
                        <p>We'll send a notification code to this email</p>

                        {/* Navigation buttons */}
                        <button type="button" onClick={() => navigate("/verification")}>Next</button>
                        <button type="button" onClick={() => navigate("/auth")}>Back</button>
                    </form>
                </div>
            </div>

        <div className={styles.leftSide}>
            <img src="/Qcat1.png" alt="cat" className={styles.QCat}/>  
        </div>
        <div className={styles.PawContainer}>
            <img src="/black2paw.png" alt="paw" className={styles.paw1}/>
            <img src="/black2paw.png" alt="paw" className={styles.paw2}/>  
        </div>
              
                
    <div className={styles.rightSide}>
        <img src="/ds.png" alt=" Dog" className={styles.QDog}/>
        
        </div>
        </div>
    );
};

export default ForgotPassword;
