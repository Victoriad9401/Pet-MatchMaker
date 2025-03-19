import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EndingScreen.module.css"

const EndingScreen = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const petType = location.state?.petType || "default";

const adoptionLinks = {
    Dog: "https://angelsrescue.org/adoption-form-dog/",
    Cat: "https://angelsrescue.org/adoption-form-cat/"
};


    const handleContinue =() =>{
        if (adoptionLinks[petType]) {
            window.location.href = adoptionLinks[petType];
        }
        else {
            navigate("/")
        }
     };
    

 return (

    <div className={styles.EndingScreen}>
       
       <div className = {styles.bubbleContainer}>
         {[...Array(14)].map((__,i)=>(
            <span key={i} className={styles.bubble}></span>
      ))}
      <div className={styles.paw}>
                <img className={styles.whitepaw}  src="/white paw.png" alt="whitepaw" />
                <img className={styles.whitepaw2}   src="/white paw.png" alt="whitepaw2" />
                <img className={styles.pinkpaw}  src="/pinkpaw.png" alt="pinkpaw " />
                <img className={styles.pinkpaw2}  src="/pinkpaw.png" alt="pinkpaw2" />
</div>

       </div>
        <div className={styles.container}>
        <h1>Thank you for Picking your New Friend!</h1>
        <p>Continue the adoption process by clicking "Continue" Or keep looking for new Friends!</p>
        
    <div className={styles.buttonContainer}>
        <button type="button" onClick={() => navigate("/Recommended")}>Go back</button>
        <button type="button" onClick={handleContinue}> Continue</button>
        </div>
        

    
      
     </div>
     </div>
 );
};


export default EndingScreen;
