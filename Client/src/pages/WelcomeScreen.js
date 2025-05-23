import React, { useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import styles from './WelcomeScreen.module.css';


function WelcomeScreen() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const setViewportForLargeScreens = () => {
        const width = window.innerWidth;
        const meta = document.querySelector('meta[name="viewport"]') || 
                    document.createElement('meta');
        meta.name = "viewport";
    
        if (width > 2500) {
          meta.content = `width=${width}, initial-scale=1.8`; // Extreme scaling
        } else if (width > 2000) {
          meta.content = `width=${width}, initial-scale=1.5`;
        } else if (width > 1600) {
          meta.content = "width=1600, initial-scale=1.2";
        } else {
          meta.content = "width=device-width, initial-scale=1";
        }
    
        document.head.appendChild(meta);
      };
    
      setViewportForLargeScreens();
      window.addEventListener('resize', setViewportForLargeScreens);
      
      return () => window.removeEventListener('resize', setViewportForLargeScreens);
    }, []);
    
  
    return(
      
    <div className={styles.splitScreen}> 

      <div className= {styles.welcomescreen}>
        <div className={styles.leftSide}>
          <img src="/companylogo.png" alt="logo" className={styles.logo}/>
          <div className={styles.content}>
            <h1> Welcome to Pet Matchmaker</h1>
            <p>Find your perfect furry friend with ease!  Simply take the quiz, match, and adopt—because every pet deserves a loving family.</p>
            <div className= {styles.buttonContainer}>
              <button onClick={() => navigate("/auth", { state: { isSignup: true } })}>Sign Up</button>
              <button onClick={() => navigate("/auth", { state: { isSignup: false } })}>Log In</button>
          </div>
        </div>
      </div>
  
        <div className={styles.rightSide}>
          <img src="/welcome dog.png" alt="Welcome Dog" className={styles.AppPuppy}/>
          <div className={styles.paws}>
        
        <img className={styles.whitepaw1} src="/white paw.png" alt="Paw 1" />
        <img className={styles.whitepaw2} src="/white paw.png" alt="Paw 2" />
        <img className={styles.whitepaw3} src="/white paw.png" alt="Paw 3" />
        <img className={styles.whitepaw4} src="/white paw.png" alt=" Paw 4" />
        
        <img className={styles.lightgray1} src="/light gray paw.png" alt="Paw 9" />
        <img className={styles.lightgray2} src="/light gray paw.png" alt="Paw 10" />
        <img className={styles.lightgray3} src="/light gray paw.png" alt="Paw 11" />
        <img className={styles.lightgray4} src="/light gray paw.png" alt="Paw 12" />
        
         <img className={styles.graypaw1} src="/gray paw.png" alt="Paw 5" />
        <img className={styles.graypaw2} src="/gray paw.png" alt="Paw 6" />
        <img className={styles.graypaw3} src="/gray paw.png" alt="Paw 7" />
        <img className={styles.graypaw4} src="/gray paw.png" alt="Paw 8" />

        <img className={styles.blackpaw1} src="/black paw.png" alt="Black2 Paw 1" />
        <img className={styles.blackpaw2} src="/black paw.png" alt="Black2 Paw 2" />
        <img className={styles.blackpaw3} src="/black paw.png" alt="Black2 Paw 3" />
        <img className={styles.blackpaw4} src="/black paw.png" alt="Black2 Paw 4" />

         </div>

        
          </div>
        </div>
        </div>
     
    );
  }

  export default WelcomeScreen;