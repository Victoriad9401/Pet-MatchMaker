import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Questions.module.css";
import {LoadingContext} from "./LoadingContext";

const questions = [
    // ALL QUESTIONS (First Section)
    {
        page: 1,
        question: "Do you have prior or current pet ownership experience?",
        name: "petOwnership",
        options: ["Yes", "No"],
    },
    {
        page: 1,
        question: "Do you have any children under 12 in your household?",
        name: "childrenUnder12",
        options: ["Yes", "No"],
    },
    {
        page: 1,
        question: "How often will your pet be alone at home?",
        name: "petAloneTime",
        options: ["Rarely", "Part of the Day", "Most of the Day"],
    },

    // PET EXPERIENCE BRANCH (Optional Section)
    {
        page: 2,
        question: "Do you currently have any other pets (Cats or Dogs)?",
        name: "otherPets",
        options: ["Yes", "No"],
        dependsOn: { name: "petOwnership", value: "Yes" },
    },
    {
        page: 2,
        question: "Please indicate your comfort level with pet-related behavioral challenges:",
        name: "comfortLevel",
        options: ["Unfamiliar", "Some Experience", "Advanced"],
        dependsOn: { name: "petOwnership", value: "Yes" },
    },

    // OTHER PETS BRANCH (Optional Section)
    {
        page: 3,
        question: "How many other pets do you have?",
        name: "numberPets",
        options: ["1", "2", "3", "4+"],
        dependsOn: { name: "otherPets", value: "Yes" },
    },
    {
        page: 3,
        question: "What type of pets do you have?",
        name: "typePets",
        options: ["Cat(s)", "Dog(s)"],
        dependsOn: { name: "otherPets", value: "Yes" },
    },

    // ALL QUESTIONS (Second Section)
    {
        page: 4,
        question: "What role do you want your pet to play in your life?",
        name: "petRole",
        type: "checkbox",
        options: ["Companion", "Protector", "Family Pet", "Emotional Support", "Other"],
        hasOtherOption: true,
    },
    {
        page: 4,
        question: "What type of pet are you looking for?",
        name: "typePet",
        options: ["Dog", "Cat"],
    },

    // DOG BRANCH QUESTIONS (Major Branch Section)
    {
        page: 5,
        question: "Do you have any experience potty training dogs?",
        name: "pottyTrain",
        options: ["Yes, I’ve done it before", "Some experience, but not fully comfortable", "No experience"],
        dependsOn: { name: "typePet", value: "Dog" },
    },
    {
        page: 5,
        question: "Which best describes how active you are?",
        name: "activityLevel",
        options: ["I Prefer Staying Indoors", "I Like Casual Strolls", "I Love To Adventure Outdoors!"],
        dependsOn: { name: "typePet", value: "Dog" },
    },
    {
        page: 5,
        question: "Which best reflects your living situation?",
        name: "livingSituation",
        options: ["House with Fenced Yard", "House without Fenced Yard", "Apartment with Shared Outdoor Space", "Apartment With No Outdoor Access"],
        dependsOn: { name: "typePet", value: "Dog" },
    },

    // DOG WILLINGNESS BRANCH
    {
        page: 6,
        question: "Are you willing to potty train your dog?",
        name: "willingnessPottyTrain",
        options: ["Yes", "No"],
        dependsOn: { name: "pottyTrain", value: ["Some experience, but not fully comfortable", "No experience"] },
    },
    
    // DOG BRANCH QUESTIONS 2 (Major Branch Section)
    {
        page: 6,
        question: "Are there any characteristics that your ideal dog should have?",
        name: "dogTraits",
        type: "checkbox",
        options: ["Current Vaccinations", "House-Trained", "Crate-Trained", "Leash-Trained", "Hypoallergenic"],
        dependsOn: { name: "typePet", value: "Dog" },
    },

    // CAT BRANCH QUESTIONS
    {
        page: 5,
        question: "How much do you want your cat to need attention from you?",
        name: "catAttention",
        options: ["Very affectionate", "Balanced", "Independent"],
        dependsOn: { name: "typePet", value: "Cat" },
    },
    {
        page: 5,
        question: "Are there any characteristics that your ideal cat should have?",
        name: "catTraits",
        type: "checkbox",
        options: ["Spayed/Neutered", "Current Vaccinations", "Litter Box Trained", "Hypoallergenic"],
        dependsOn: { name: "typePet", value: "Cat" },
    },

    // ALL QUESTIONS (Final Section)
    {
        page: 6,
        question: "What is your estimated monthly budget for pet care?",
        name: "budget",
        options: ["$50", "$100", "$150"],
    },
    {
        page: 6,
        question: "How much pet Hair are you able to handle?",
        name: "cleaningTime",
        options: ["Minimum", "Moderate", "Alot of Hair"],
    },
    {
        page: 7,
        question: "In one word, what kind of traits are you looking for in a pet?",
        name: "petTraits",
        type: "checkbox",
        options: ["Supportive", "Affectionate", "Intelligent", "Adventurous", "Other"],
        hasOtherOption: true,
    },
    {
        page: 7,
        question: "Are there activities or hobbies that you would like to share with your pet?",
        name: "petHobbies",
        type: "checkbox",
        options: ["Hiking", "Running", "Cuddling", "Napping", "Other"],
    },
    {
        page: 8,
        question: "Is there anything else you’d like us to know about your future pet?",
        name: "additionalInfo",
        type: "textarea",
    },
];


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
        setAnswers({});
        setHasLoadedSavedAnswers(false);
        setCurrentPage(1);
    };

    const handleTextareaChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
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
            console.log("Submitting answers...", answers);
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate("/Recommended", {state: {userPreferences: answers} }); //passes the asnwer here
        } catch (error) {
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
                                            type="checkbox"
                                            name={q.name}
                                            value={option}
                                            checked={answers[q.name]?.includes(option) || false}
                                            onChange={handleAnswerChange}
                                        />
                                        {option}
                                        {option === "Other" && answers[q.name]?.includes("Other") && (
                                            <input
                                                type="text"
                                                name={q.name + "Other"}
                                                value={answers[q.name + "Other"] || ""}
                                                onChange={handleTextareaChange}
                                                placeholder="Enter Response Here..."
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
                                <textarea name={q.name} value={answers[q.name] || ""} onChange={handleTextareaChange} placeholder="Enter response here..." />
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
