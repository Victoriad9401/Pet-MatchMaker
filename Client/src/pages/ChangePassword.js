import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.css"
import { Helmet } from "react-helmet";

const ChangePassword = () =>{
    const navigate = useNavigate();

 return (
        
        <div className={styles.ChangePasswordContainer}> {/* Use CSS Module class */}
        <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
            <div className={styles.centeredContainer}> {/* Use CSS Module class */}
                <div className={styles.formContainer}> {/* Use CSS Module class */}
                    <form>
                        <h1>Change Password</h1>
                        <input type="newpassword" placeholder="New Password..." />
                        <input type="newpassword" placeholder="Re-Enter New Password..." />
                      

                        {/* Navigation buttons */}
                        <button type="button" onClick={() => navigate("/auth")}>Next</button>
                        <button type="button" onClick={() => navigate("/Verification")}>Back</button>
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

export default ChangePassword;