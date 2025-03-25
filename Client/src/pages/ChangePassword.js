import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.css"


const ChangePassword = () =>{
    const navigate = useNavigate();
    useEffect(() => {
        const setViewportForLargeScreens = () => {
          const width = window.innerWidth;
          const meta = document.querySelector('meta[name="viewport"]') || 
                      document.createElement('meta');
          meta.name = "viewport";
      
          // More aggressive scaling thresholds
          if (width > 3000) {
            meta.content = `width=${width}, initial-scale=2.5`; // Ultra scaling
          } else if (width > 2500) {
            meta.content = `width=${width}, initial-scale=2.0`;
          } else if (width > 2000) {
            meta.content = `width=${width}, initial-scale=1.7`;
          } else if (width > 1600) {
            meta.content = `width=1600, initial-scale=${width/1600}`; // Dynamic scaling
          } else {
            meta.content = "width=device-width, initial-scale=1";
          }
      
          // Clean up any existing meta tags
          const existingMetas = document.querySelectorAll('meta[name="viewport"]');
          existingMetas.forEach((tag, index) => {
            if (index > 0) document.head.removeChild(tag);
          });
      
          if (!meta.parentNode) {
            document.head.appendChild(meta);
          }
        };
      
        setViewportForLargeScreens();
        const resizeHandler = debounce(setViewportForLargeScreens, 100);
        window.addEventListener('resize', resizeHandler);
        
        return () => {
          window.removeEventListener('resize', resizeHandler);
          // Restore default viewport when unmounting
          const meta = document.querySelector('meta[name="viewport"]');
          if (meta) {
            meta.content = "width=device-width, initial-scale=1";
          }
        };
      }, []);
      
      // Debounce helper function
      function debounce(func, wait) {
        let timeout;
        return function() {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
      }

 return (
        
        <div className={styles.ChangePasswordContainer}> {/* Use CSS Module class */}
       
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