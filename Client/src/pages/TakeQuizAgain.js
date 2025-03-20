import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TakeQuizAgain.module.css"

const TakeQuizAgain = () =>{
    const navigate = useNavigate();

 return (
    <div className={styles.TakeQuizAgain}>
        
        <h1>Quiz Time!!!!</h1>
        <p>You have already took the quiz! Would you like to take it again?</p>
    <div className={styles.buttonContainer}>
        <button type="button" onClick={() => navigate("/Recommended")}>Go back to Results</button>
        <button type="button" onClick={() => navigate("/questions")}>Start the Quiz</button>
        </div>
<div className={styles.container}>
     <div className={styles.dog}>
     <img src="/hdog.png" alt="dog" className="hdog"/>
     </div>

     <div className={styles.cat}>
     <img src="/oc.png" alt="Cat" className="oCat"/>
     </div>

     <div className={styles.pflower}>
     <img src="/pinkflower.png" alt="flower" className="pflowers"/>
     </div>

     <div className={styles.yflower}>
     <img src="/yellowf.png" alt="flower" className="yflowers"/>
     </div>

     <div className={styles.upper}>
     <img src="/cloud.png" alt="cloud" className="cloud"/>
     </div>
     
     <div className={styles.upper2}>
     <img src="/cloud.png" alt="cloud" className="cloud2"/>
   </div>

     <div className={styles.grass}></div> {/* Grass div */}
        </div>

        <div className={styles.ellispe}>
         </div> {/* Grass div */}
       <div class = {styles.bubbleContainer}>
         {[...Array(14)].map((__,i)=>(
            <span key={i} className={styles.bubble}></span>
      ))}
      

       </div>
     </div>
 
 );
};

export default TakeQuizAgain;
