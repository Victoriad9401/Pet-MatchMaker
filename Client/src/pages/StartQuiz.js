import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StartQuiz.module.css"

const StartQuiz = () =>{
    const navigate = useNavigate();
    useEffect(() => {
      const setViewportForLargeScreens = () => {
        const width = window.innerWidth;
        const meta = document.querySelector('meta[name="viewport"]') || 
                    document.createElement('meta');
        meta.name = "viewport";
    
        if (width > 2500) {
          meta.content = `width=${width}, initial-scale=3.0`; // Extreme zoom
        } else if (width > 2000) {
          meta.content = `width=${width}, initial-scale=2.5`;
        } else if (width > 1600) {
          meta.content = "width=1600, initial-scale=2.0";
        } else if (width > 1200) {
          meta.content = "width=1200, initial-scale=1.5";
        } else {
          meta.content = "width=device-width, initial-scale=1";
        }
    
        document.head.appendChild(meta);
      };
    
      setViewportForLargeScreens();
      window.addEventListener('resize', setViewportForLargeScreens);
      return () => window.removeEventListener('resize', setViewportForLargeScreens);
    }, []);
    
    // In your React component
useEffect(() => {
  console.log(document.querySelectorAll('.upper, .upper2'));
}, []);

 return (
    <div className={styles.StartQuiz}>
        
        <h1>Welcome To Pet Matchmaker!!</h1>
        <h2>Quiz Time!!!!</h2>
        <p>This is a list of questions that help to gather your preferences to find you your perfect friend!!!</p>
        <button type="button" onClick={() => navigate("/questions")}>Start the Quiz</button>
   
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
