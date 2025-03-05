import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LeaveQuiz.module.css"

const LeaveQuiz = () =>{
    const navigate = useNavigate();

 return (
    <div className={styles.LeaveQuiz}>
       
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
        <h1>Woof! You didn't finish the Quiz!!!</h1>
        <p>Would you like to go back to the Quiz or Leave? If you leave, you will lose all progress and would have to restart the quiz.</p>
        
    <div className={styles.buttonContainer}>
        <button type="button" onClick={() => navigate("/questions")}>Go back</button>
        <button type="button" onClick={() => navigate("/")}>Exit</button>
        </div>
        <div className={styles.dog}>
<img className={styles.ldog} src="/ldog.png" alt="dog" />
</div>

    
      
     </div>
     </div>
 );
};


export default LeaveQuiz;
