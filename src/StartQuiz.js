import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StartQuiz.module.css"

const StartQuiz = () =>{
    const navigate = useNavigate();

 return (
    <div className={styles.StartQuiz}>
        
        <h1>Welcome To Pet Matchmaker!!</h1>
        <h2>Quiz Time!!!!</h2>
        <p>This is a list of questions that help to gather your preferences to find you your perfect friend!!!</p>
        <button type="button" onClick={() => navigate("/takeQuizAgain")}>Start the Quiz</button>
   
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

export default StartQuiz;
