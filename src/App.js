import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from "./WelcomeScreen";
import SignupLogin from "./signuplogin";
import ForgotPassword from './ForgotPassword'; 
import Verification from "./Verification";
import ChangePassword from "./ChangePassword";
import StartQuiz from "./StartQuiz";
import TakeQuizAgain from "./TakeQuizAgain";
import Questions from "./Questions";
import LeaveQuiz from "./LeaveQuiz";
import LoadingScreen from "./LoadingScreen";
import {LoadingProvider } from "./LoadingContext";


function App() {
  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingProvider>
      <Router>
        {isLoading ? (
          <LoadingScreen /> 
        ) :(
          <Routes>
              <Route path="/" element={<WelcomeScreen />} /> {/* Use the WelcomeScreen component */}
              <Route path="/auth" element={<SignupLogin />} />
              <Route path="/forget-password" element={<ForgotPassword />}/>
              <Route path="/verification" element={<Verification />}/>
              <Route path="/changePassword" element={<ChangePassword />}/>
              <Route path="/startQuiz" element={<StartQuiz />}/>
              <Route path="/takeQuizAgain" element={<TakeQuizAgain/>}/>
              <Route path="/questions" element={<Questions/>}/>
              <Route path="/LeaveQuiz" element={<LeaveQuiz/>}/>
              <Route path="/LoadingScreen" element={<LoadingScreen/>}/>
          </Routes>
        )}

      </Router>
      </LoadingProvider>
  );
}
    
  export default App;
