import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Questions.module.css";
import {LoadingContext} from "./LoadingContext";

const questions =[
    {
        page:1,
        questions: "1. Do you have prior or current pet ownership experience?",
        name: "petOwnership",
        options: ["Yes", "No"],

    },
    {
        page:1,
        questions: "2. Do you have any children under 12 in your household?",
        name: "ChildrenUnder12",
        options:["Yes", "No"],

    },
    {
        page:1,
        questions: "3. How often will you prospective pet be alone at home? (due to work, school, etc)",
        name: "petAloneTime",
        options:["Rarely", "Part of the Day", "Most of The Day"],

    },
   
    {
        page:2,
        questions: "4. Do you currently have any other pets (Cats or Dogs)?",
        name: "otherPets",
        options:["Yes", "No"],

    }, 
    {
        page:2,
        questions: "5. How many other pets do you have?",
        name: "numberPets",
        type: "textarea",

    },

    {
        page:2,
        questions: "6. Please indicate your comfort level with pet-related behavioral challenges",
        name: "comfortLevel",
        options:["Unfamilar", "Some Experience", "Advanced"],

    },

    {
        page:3,
        questions: "7. How often do you travel?",
        name: "travel",
        options:["Hardly Ever", "Every Once In A While", "Often"],

    }, 
    {
        
        page:3,
        questions: "8. What role do you want your pet to play in your life? ",
        name: "comfortLevel",
        options:["Companion", "Protector", "Family Pet", "Emtional Support", "Other:"],
        hasOtherOption: true,
    },

    {
        page:3,
        questions: "9. What type of pet are you looking for?",
        name: "typePet",
        options:["Dog", "Cat", "No Preference"],

    }, 
    {
        //dog questions
        page:4,
        questions: "10. Do you have any experience potty training dogs?",
        name: "pottyTrain",
        options:["Yes, I've Done It Before", "Some Experience, But Not Fully Comfortable", "No Experience"],
        branch: "Dog",
    },
    {
        page:4,
        questions: "11. Which best describes how active you are?",
        name: "Active",
        options:["I Prefer Staying Indoors", "I Like Casual Strolls", "I Love To Adventure Outdoors!"],
        branch: "Dog",
    }, 
    {
        page:4,
        questions: "12. Which best reflects your living situation?",
        name: "livingSituation",
        options:["House with Fence Yard", "Hose without Fence Yard", "Apartment with Access To A Shared Outdoor Space", "Apartment With No Outdoor Access"],
        branch: "Dog",
    },
    {
        page:5,
        questions: "13.Are you willing to potty train your dog?",
        name: "pottyT",
        options:["Yes", "No"],
        branch: "Dog",

    },
    {
        page:5,
        questions: "14. Are there any characteristics that your ideal dog should have (Default leave blank). Selecting any traits will mark them as a top priority, but leaving them blank doesn’t exclude those traits",
        name: "livingSituation",
        type: "checkbox",
        options:["Sprayed/Neutered", "House-Trained", "Crate-Trained", "Leash-Trained","Up-To-Date Vaccinations", "Hypoallergenic"],
        branch: "Dog",
    },

    //basic questions
    {
        page:6,
        questions: "15.What is your estimated monthly budget for pet care?",
        name: "budget",
        options:["$50", "$100","$150" ],

    },
    {
        page:6,
        questions: "16. How much time are you comfortable spending on pet-related cleaning?",
        name: "timePet",
        options:["Minimum", "Moderate ", "Mess Is No Stress"],

    },
    {
        page:6,
        questions: "17. In one word, what kind of traits are you looking for in a pet? ",
        name: "traitsPet",
        type: "checkbox",
        options:["Supportive", "Affectionate", "Intelligent", "Adventurous", "Other"],
        hasOtherOption: true,

    },

    {
        page:7,
        questions: "18.Are there activities or hobbies that you would like to share with your pet?",
        name: "hobbiesPet",
        type: "checkbox",
        options:["Hiking", "Running", "Cuddling", "Napping", "Watching TV", "Other"],
        hasOtherOption: true,

    },
    {
        page:7,
        questions: "19. Is there anything else you’d like us to know about your home, lifestyle, or expectations for your future pet?",
        name: "ExtraInfo",
        type: "textarea",

    },
    //cat questions
    {
        page:4,
        questions: "10. How much do you want your cat to need attention from you?",
        name: "catTime",
        options:["At Least 30 Minutes", "At Least 45 Mintues", "At Least 60 Minutes"],
        branch: "Cat",
    },
    {
        page:4,
        questions: "11. Are there any characteristics that your ideal cat should have (Default leave blank). Selecting any traits will mark them as a top priority, but leaving them blank doesn’t exclude those traits",
        name: "characterCat",
        type: "checkbox",
        options:["Sprayed/Neutered", "Up-To-Date Vaccinations", "Litter Box Trained", "Hypoallergenic"],
        branch: "Cat",
    },

]

const Questions = () =>{
    const navigate = useNavigate();
    const {isLoading, setIsLoading } = useContext(LoadingContext);

    const[currentPage, setCurrentPage] = useState(1);
    const [answers, setAnswers] = useState({
        petOwnership: "",
        ChildrenUnder12: "",
        petAloneTime: "",
        otherPets: "",
        numberPets: "",
        comfortLevel: "",
        travel: "",
        typePet: "",
        pottyTrain: "",
        Active: "",
        livingSituation: [],
        pottyT: "",
        budget: "",
        timePet: "",
        traitsPet: [],
        hobbiesPet: [],
        ExtraInfo: "",
        catTime: "",
        characterCat: [],
    });
    

    const handleAnswerChange = (e) => {
        const {name, value, type, checked} = e.target;
        
        if(type === "checkbox"){
        setAnswers((prevAnswers) => {
            const currentValues = prevAnswers[name] || [];
            if(checked){
                return{
                    ...prevAnswers,
                    [name]: [...currentValues,value],
                };
            }
            else{
                return{
                    ...prevAnswers,
                     [name]: currentValues.filter((item) => item !== value),
            };
            
        }
        });
    }
    else{
        setAnswers((prevAnswers)=> ({
            ...prevAnswers,
            [name]: value,

    }));
}
    };

    const handleTextareaChange = (e) => {
        const{ name, value} = e.target;
        setAnswers((prevAnswers)=> ({
            ...prevAnswers,
            [name]: value,
        }));
    };


    const handleNext = () =>{
        if(currentPage < 7 ){
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious =() =>{
        if (currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try{
            console.log("Submitting answers...", answers);
        
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        navigate("/LoadingScreen");
    } catch (error){
        console.error("Submission failed:", error);
    } finally{
        setIsLoading(false);
    }
};

    const currentPageQuestions = questions.filter(
        (q) => q.page === currentPage && (!q.branch || q.branch === answers.typePet)
    );
    

 return (
    <div className={styles.Questions}>
        <h1>Pet Quiz</h1>
        <button type="button" className={styles.exitbutton} onClick={() => navigate("/LeaveQuiz")}>Exit</button>

  {/* Progress Bar */}
  <div className={styles.progressBarContainer}>
        <div
            className={styles.progressBar}
            style={{ width: `${(currentPage / 7) * 100}%` }}
        ></div>
    </div>
<div className={styles.pagebar}>
    {currentPage} out of 7
    </div>

<div className={styles.formContainer}>
    <form onSubmit={(e) => e.preventDefault()}>
        {currentPageQuestions.map((q, index) => (
         <div key ={index} className={styles.question}>    
            <p>{q.questions}</p>
                            {q.type === "checkbox" ? (
                                // Render checkboxes
                                q.options.map((option, i) => (
                                    <label key={i}>
                                        <input
                                            type="checkbox"
                                            name={q.name}
                                            value={option}
                                            checked={answers[q.name]?.includes(option) || false}
                                            onChange={handleAnswerChange}
                                        />
                                        {option}
                                    </label>
                                ))
                        

                            ) : q.type === "textarea" ? (
                                // Render textarea
                                <textarea
                                    name={q.name}
                                    value={answers[q.name] || ""}
                                    onChange={handleTextareaChange}
                                    placeholder="Enter response here..."
                                />
                            ) : (
                                // Render radio buttons
                                q.options.map((option, i) => (
                                    <label key={i}>
                                        <input
                                            type="radio"
                                            name={q.name}
                                            value={option}
                                            checked={answers[q.name] === option}
                                            onChange={handleAnswerChange}
                                        />
                                        {option}
                                        {option === "Other:" && (
                                             <input
                                             type="text"
                                             name={q.name + "Other"}
                                             value={answers[q.name + "Other"] || ""}
                                             onChange={(e) => setAnswers((prevAnswers) => ({
                                                 ...prevAnswers,
                                                 [q.name + "Other"]: e.target.value,
                                             }))}
                                             placeholder="Please specify"
                                         />
                                     )}
                            
                                    </label>
                                ))
                            )}
                        </div>
                    ))}
                </form>

                <div className={styles.navigationButtons}>
                    {currentPage > 1 && (
                        <button type="button" className={styles.previousButton} onClick={handlePrevious}>
                            Previous
                        </button>
                    )}
                    {currentPage < 7 ? (
                        <button type="button" className={styles.nextButton} onClick={handleNext}>
                            Next
                        </button>
                    ) : (
                    <button type="button" className={styles.submitButton} onClick={handleSubmit}>
                            Submit
                        </button>
                        
                    )}
                </div>
            </div>
           
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
        
          
 );
};
export default Questions;

