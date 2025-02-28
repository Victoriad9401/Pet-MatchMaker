import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LeaveQuiz.module.css"

const LeaveQuiz = () =>{
    const navigate = useNavigate();

 return (
    <div className={styles.LeaveQuiz}>
        
        <h1>Woof! You didn't finish the Quiz!!!</h1>
        <p>Would you like to go back to the Quiz or Leave? If you leave, you will lose all progress and would have to restart the quiz.</p>
    <div className={styles.buttonContainer}>
        <button type="button" onClick={() => navigate("/")}>Go back</button>
        <button type="button" onClick={() => navigate("/")}>Exit</button>
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

export default LeaveQuiz;
