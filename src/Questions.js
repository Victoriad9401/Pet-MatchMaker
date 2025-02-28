import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Questions.module.css";


const Questions = () =>{
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({
        petOwnership: '',
        childrenUnder12: '',
        petAloneTime: '',
    });
    
    

    const handleAnswerChange = (e) => {
        const {name, value} = e.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Answers:', answers);
        navigate('/next-page');
    };


 return (
    <div className={styles.Questions}>
        <h1>Pet Quiz</h1>
        <button type="button" className={styles.exitbutton} onClick={() => navigate("/")}>Exit</button>

<div className={styles.formContainer}>
    <form onSubmit={handleSubmit}>
        <div className={styles.question}>
            <p>1. Do you have prior or current pet ownership experience?</p>
            <label>
            <input 
                type="radio" 
                name="petOwnership" 
                value="Yes" 
                checked ={answers.petOwnership === 'Yes'}
                onChange={handleAnswerChange}
                />
                 Yes</label>
            <label>
            <input
                type="radio" 
                name="petOwnership"
                value="No"
                checked ={answers.petOwnership === 'No'} 
                onChange={handleAnswerChange}/>
            No</label>
            
            </div>

            <div className={styles.question}>
            <p>2. Do you have any children under 12 in your household?</p>
            <label>
            <input
                type="radio"
                name="childrenUnder12" 
                value="Yes" 
                checked ={answers.childrenUnder12 ==='Yes'} 
                onChange={handleAnswerChange}/>
            Yes</label>

            <label>
            <input 
                type="radio" 
                name="childrenUnder12" 
                value="No" 
                checked ={answers.childrenUnder12 ==='No'} 
                onChange={handleAnswerChange}/>
            No</label>
            </div>

            <div className={styles.question}>
            <p>3. How often will you prospective pet be alone at home? (due to work, school, etc)</p>
            
            <label>
            <input 
                type="radio" 
                name="petAloneTime" 
                value="Rarely" 
                checked ={answers.petAloneTime ==='Rarely'} 
                onChange={handleAnswerChange}/>
            Rarely</label>
            <label>
            <input 
                type="radio" 
                name="petAloneTime" 
                value="Part of The Day" 
                checked ={answers.petAloneTime ==='Part of The Day'} 
                onChange={handleAnswerChange}/>
            Part of The Day</label>
            <label>
                <input 
                    type="radio" 
                    name="petAloneTime" 
                    value="Most of The Day" 
                    checked ={answers.petAloneTime ==='Most of The Day'} 
                    onChange={handleAnswerChange}/>
            Most of The Day</label>
            </div>

            <button type="submit" className={styles.nextbutton} >Next</button>
            
            
            </form>

           
                 <div className={styles.dog}>
                 <img src="/Wdog.png" alt="dog" className={styles.dog}/>
                 </div>

                 <div className={styles.cat}>
                      <img src="/Scat.png" alt="Cat" className={styles.cat}/>
                      </div>
                <div className={styles.paws}>
                <img className={`${styles.paws} ${styles.whitepaw1}`} src="/white paw.png" alt="white Paw 1" />
                <img className={`${styles.paws} ${styles.whitepaw2}`} src="/white paw.png" alt="white Paw 2" />
                <img className={`${styles.paws} ${styles.whitepaw3}`} src="/white paw.png" alt="white Paw 3" />
                <img className={`${styles.paws} ${styles.whitepaw4}`} src="/white paw.png" alt="white Paw 4" />
                <img className={`${styles.paws} ${styles.whitepaw5}`} src="/white paw.png" alt="white Paw 5" /></div> 

            <div className={styles.bubbleContainer}>
                     {[...Array(33)].map((__,i)=>(
                        <span key={i} className={styles.bubble}></span>
                  ))}
                  
            
                   </div>
            </div>
            </div>
          
 );
};
export default Questions;

