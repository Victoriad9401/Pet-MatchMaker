import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Verification.module.css";


const Verification = () =>{
    const navigate = useNavigate();

 return (
        
        <div className={styles.VerificationContainer}> {/* Use CSS Module class */}
            <div className={styles.centeredContainer}> {/* Use CSS Module class */}
                <div className={styles.formContainer}> {/* Use CSS Module class */}
                    <form>
                        <h1>Enter Code</h1>

                    <div className={styles.codeBoxes}>
                       <input type = "text" maxLength="1" class={styles.codeBoxes}/>
                       <input type = "text" maxLength="1" class={styles.codeBoxes}/>
                       <input type = "text" maxLength="1" class={styles.codeBoxes}/>
                       <input type = "text" maxLength="1" class={styles.codeBoxes}/>
                    </div>

                        <p>Please put in Verification Code</p>

                        {/* Navigation buttons */}
                        <button type="button" onClick={() => navigate("/changePassword")}>Next</button>
                        <button type="button" onClick={() => navigate("/forget-password")}>Back</button>
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

export default Verification;