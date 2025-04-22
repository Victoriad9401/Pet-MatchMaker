import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Questions.module.css";
import {LoadingContext} from "./LoadingContext";

const questions = [
    // Filter QUESTIONS 
    {
        page: 1,
        question: "What type of pet are you looking for?",
        name: "typePet",
        options: ["Dog", "Cat"],
    },
    {
        page: 1,
        question: "Do you have an age preference for your future pet?",
        name: "age",
        options: ["No Preference", "Baby", "Young", "Adult", "Senior"],
    },
    {
        page: 1,
        question: "Do you have a gender preference for your future pet?",
        name: "gender",
        options: ["No Preference", "Male", "Female"],
    },

    //Need dynamic update
    {
        page: 2,
        question: "Do you have a Breed preference for your future dog?",
        name: "breed",
        options: [
            "No Preference",
            "American Bulldog", "Australian Cattle Dog / Blue Heeler", "Australian Shepherd", "Beagle", "Belgian Shepherd / Malinois", "Black Labrador Retriever", "Black Mouth Cur", "Bloodhound", "Border Collie", "Boxer", "Cattle Dog", "Chihuahua", "Chocolate Labrador Retriever", "Corgi", "Dachshund", "Doberman Pinscher", "English Bulldog", "English Pointer", "English Toy Spaniel", "Flat-Coated Retriever", "Golden Retriever", "Great Dane", "Great Pyrenees", "Hound", "Husky", "Jack Russell Terrier", "Labrador Retriever", "Miniature Pinscher", "Pit Bull Terrier", "Plott Hound", "Pomeranian", "Poodle", "Retriever", "Schnauzer", "Shar-Pei", "Shepherd", "Shih Tzu", "Spaniel", "Standard Poodle", "Terrier", "Treeing Walker Coonhound", "Yorkshire Terrier"      
        ],
        type: "checkbox",
        dependsOn: { name: "typePet", value: ["Dog"] },
    },
    //Temp hard code
    {
        page: 2,
        question: "Do you have a Breed preference for your future cat?",
        name: "breed",
        options: ["No Preference", "Domestic Long Hair", "Domestic Short Hair", "Domestic Medium Hair", "Maine Coon", "Russian Blue", "Tabby"],
        type: "checkbox",
        dependsOn: { name: "typePet", value: ["Cat"] },
    },

    //
    {
        page: 2,
        question: "Are there any characteristics that your ideal pet should have?",
        name: "characteristics",
        type: "checkbox",
        options: ["No Preference", "House-Trained", "Good with Children", "Good with Dogs", "Good with Cats"],
    },


    // AI Context Questions
    {
        page: 3,
        question: "In one word, what kind of traits are you looking for in a pet?",
        name: "petTraits",
        type: "checkbox",
        options: ["Supportive", "Affectionate", "Intelligent", "Adventurous", "Other"],
        hasOtherOption: true,
    },
    {
        page: 3,
        question: "Are there activities or hobbies that you would like to share with your pet?",
        name: "petHobbies",
        type: "checkbox",
        options: ["Hiking", "Running", "Cuddling", "Napping", "Other"],
    },
    {
        page: 4,
        question: "Is there anything else you’d like us to know about your future pet?",
        name: "additionalInfo",
        type: "textarea",
    },
];

const getRankedProfiles = async(quizAnswers) => {

    try{
    const response = await fetch('/api/rankProfiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({answers:quizAnswers})
    });

    if(!response.ok){
       console.error("Failed to fetch profiles:", response.status);
       return[];
    }
    const data = await response.json();
    return data.rankedProfiles;
} catch(error){
    console.error("Error fetching ranked profiles:", error);
    return [];
}
};

const Questions = () => {
    const navigate = useNavigate();
    const {setIsLoading } = useContext(LoadingContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [answers, setAnswers] = useState({});
    const [hasLoadedSavedAnswers, setHasLoadedSavedAnswers] = useState(false);


    useEffect(() => {
        const savedAnswers = localStorage.getItem('petQuizAnswers');
        if(savedAnswers && !hasLoadedSavedAnswers){
            setAnswers(JSON.parse(savedAnswers));
            setHasLoadedSavedAnswers(true);
        }
    }, [hasLoadedSavedAnswers]);

    useEffect(() => {
        if(Object.keys(answers).length > 0){
            localStorage.setItem('petQuizAnswers', JSON.stringify(answers));
        }
    }, [answers]);

    // Helper function to filter questions based on dependencies
    const getVisibleQuestions = () => {
        return questions.filter(q => {
            if (!q.dependsOn) return true; // Show if no dependency
    
            const userAnswer = answers[q.dependsOn.name];
    
            // Check if `dependsOn.value` is an array (for OR conditions)
            if (Array.isArray(q.dependsOn.value)) {
                return q.dependsOn.value.includes(userAnswer);
            }
    
            // Default behavior for single value conditions
            return userAnswer === q.dependsOn.value;
        });
    };
    
    // Dynamically get all valid pages with questions
    const visiblePages = [...new Set(getVisibleQuestions().map(q => q.page))].sort((a, b) => a - b);

    // Get questions for the current page
    const currentPageQuestions = getVisibleQuestions().filter(q => q.page === currentPage);

    const handleAnswerChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setAnswers((prev) => {
            const updatedAnswers = { ...prev };
    
            // Handle checkboxes separately
            if (type === "checkbox") {
                const currentValues = prev[name] || [];
                updatedAnswers[name] = checked
                    ? [...currentValues, value]
                    : currentValues.filter(item => item !== value);
            } else {
                updatedAnswers[name] = value;
            }
    
            // === Remove dependent answers if the parent answer changes ===
            questions.forEach(q => {
                if (q.dependsOn && q.dependsOn.name === name && prev[name] !== value) {
                    delete updatedAnswers[q.name]; // Clear the answer for dependent questions
                }
            });
    
            return updatedAnswers;
        });
    };
    
    const clearSavedAnswers = () =>{
        localStorage.removeItem('petQuizAnswers');
        localStorage.removeItem('rankedProfiles'); //added removal for the ranked profiles to redo
        setAnswers({});
        setHasLoadedSavedAnswers(false);
        setCurrentPage(1);
    };

    const handleTextareaChange = (e) => {
        const { name, value } = e.target;

        //Add character limit
        const maxLength = 275;
        if(value.length <= maxLength){
            setAnswers(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleNext = () => {
        const currentIndex = visiblePages.indexOf(currentPage);
        if (currentIndex < visiblePages.length - 1) {
            setCurrentPage(visiblePages[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        const currentIndex = visiblePages.indexOf(currentPage);
        if (currentIndex > 0) {
            setCurrentPage(visiblePages[currentIndex - 1]);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const savedAnswers = JSON.parse(localStorage.getItem('savedQuizAnswers'));
            if (savedAnswers && JSON.stringify(savedAnswers) === JSON.stringify(answers)) {
                console.log("Same answers detected! Using cached pets...");
                navigate("/Recommended", { state: { userPreferences: answers } });
              } else {
                console.log("New answers detected! Fetching new pets...");
                const rankedResults = await getRankedProfiles(answers);

            // console.log("Submitting answers...", answers);
            // await new Promise(resolve => setTimeout(resolve, 2000));

            // //fetch ranked results from backend
            // const rankedResults = await getRankedProfiles(answers); 
            // console.log("Ranked profiles receieved:", rankedResults);

            //save the ranked results within the localstorage
            localStorage.setItem('rankedProfiles', JSON.stringify(rankedResults)); 
            localStorage.setItem('savedQuizAnswers', JSON.stringify(answers));
         
            navigate("/Recommended", {state: {userPreferences: answers} }); //passes the asnwer here
        } 
    }
    catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.Questions}>
            <h1>Pet Quiz</h1>
            <button type="button" className={styles.exitbutton} onClick={() => navigate("/LeaveQuiz")}>Exit</button>
            {hasLoadedSavedAnswers && (
                <button
                type="button"
                className={styles.clearButton}
                onClick={clearSavedAnswers}
                >
                    Clear
                </button>
            )}

            {/* Progress Bar and Progress Text Container */}
            <div className={styles.progressContainer}>
                <span className={styles.pagebar}>
                    {visiblePages.indexOf(currentPage) + 1} out of {visiblePages.length}
                </span>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar} 
                        style={{ width: `${((visiblePages.indexOf(currentPage) + 1) / visiblePages.length) * 100}%` }}>
                    </div>
                </div>
            </div>


            <div className={styles.formContainer}>
                <form onSubmit={(e) => e.preventDefault()}>
                    {currentPageQuestions.map((q, index) => (
                        <div key={index} className={styles.question}>
                            <p>{q.question}</p>
                            {hasLoadedSavedAnswers && answers[q.name] && (
                                <div className={styles.savedIndicator}> Previously Answered</div>
                            )}
                            {q.type === "checkbox" ? (
                                
                                q.options.map((option, i) => (
                                    <label key={i} style={{ display: "flex", alignItems: "center", gap: "5px", marginRight: "15px" }}>
                                        <input
                                            type="checkbox" name={q.name} value={option} checked={answers[q.name]?.includes(option) || false} onChange={handleAnswerChange}
                                        />
                                        {option}
                                        {option === "Other" && answers[q.name]?.includes("Other") && (
                                            <input
                                                type="text" name={q.name + "Other"} value={answers[q.name + "Other"] || ""} onChange={handleTextareaChange} placeholder="Enter Response Here..." maxLength={25}
                                                style={{
                                                    marginLeft: "5px",
                                                    padding: "5px",
                                                    fontSize: "14px",
                                                    width: "150px"
                                                }}
                                            />
                                        )}
                                    </label>
                                ))

                            ) : q.type === "textarea" ? (
                                <textarea name={q.name} value={answers[q.name] || ""} onChange={handleTextareaChange} placeholder="Enter response here..." maxLength={275}/>
                            ) : (
                                q.options.map((option, i) => (
                                    <label key={i}>
                                        <input type="radio" name={q.name} value={option} checked={answers[q.name] === option} onChange={handleAnswerChange} />
                                        {option}
                                    </label>
                                ))
                            )}
                        </div>
                    ))}
                </form>

                <div className={styles.navigationButtons}>
                    {visiblePages.indexOf(currentPage) > 0 && (
                        <button type="button" className={styles.previousButton} onClick={handlePrevious}>Previous</button>
                    )}
                    {visiblePages.indexOf(currentPage) < visiblePages.length - 1 ? (
                        <button type="button" className={styles.nextButton} onClick={handleNext}>Next</button>
                    ) : (
                        <button type="button" className={styles.submitButton} onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </div>

            <div className={styles.dog}>
                <img src="/Wdog.png" alt="dog" className={styles.dog} />
            </div>

            <div className={styles.cat}>
                <img src="/Scat.png" alt="Cat" className={styles.cat} />
            </div>

            <div className={styles.paws}>
                <img className={`${styles.paws} ${styles.whitepaw1}`} src="/white paw.png" alt="white Paw 1" />
                <img className={`${styles.paws} ${styles.whitepaw2}`} src="/white paw.png" alt="white Paw 2" />
                <img className={`${styles.paws} ${styles.whitepaw3}`} src="/white paw.png" alt="white Paw 3" />
                <img className={`${styles.paws} ${styles.whitepaw4}`} src="/white paw.png" alt="white Paw 4" />
                <img className={`${styles.paws} ${styles.whitepaw5}`} src="/white paw.png" alt="white Paw 5" />
            </div>

            <div className={styles.bubbleContainer}>
                {[...Array(33)].map((__, i) => (
                    <span key={i} className={styles.bubble}></span>
                ))}
            </div>
        </div>
    );
};

export default Questions;
