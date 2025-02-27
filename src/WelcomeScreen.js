import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from './WelcomeScreen.module.css';

function WelcomeScreen() {
    const navigate = useNavigate();
  
    const pawTypes = [
      { src: "/white paw.png", className: styles.whitepaw },
      { src: "/light gray paw.png", className: styles.lgpaw },
      { src: "/gray paw.png", className: styles.graypaw },
      { src: "/black paw.png", className: styles.blackpaw },
    ];
  
    return(
      <div className={styles.splitScreen}> 
         <div className= {styles.welcomescreen}>
        <div className={styles.leftSide}>
        <img src="/companylogo.png" alt="logo" className={styles.logo}/>
          <div className={styles.content}>
          <h1> Welcome to Pet Matchmaker</h1>
          <p>Find your perfect furry friend with ease!  Simply take the quiz, match, and adopt—because every pet deserves a loving family.</p>
       <div className= {styles.buttonContainer}>
        <button onClick={() => navigate("/auth")}> Sign Up</button>
        <button  onClick={() => navigate("/auth")}>Log In</button>
        </div>
       </div>
    </div>
  
        <div className={styles.rightSide}>
          <img src="/welcome dog.png" alt="Welcome Dog" className={styles.AppPuppy}/>
          
          {/* Paw prints container */}
          <div id="paws">
            {pawTypes.map((paw, i) =>
              [1, 2, 3, 4].map((num) => (
                <img
                  key={`${paw.className}-${num}`}
                  src={paw.src}
                  alt={`${paw.className} ${num}`}
                  className={`${paw.className} paw${num}`}
                />
              ))
            )}
          </div>
        </div>
        </div>
      </div>
    );
  }

  export default WelcomeScreen;