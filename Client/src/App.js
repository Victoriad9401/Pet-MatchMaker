import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from "./pages/WelcomeScreen";
import SignupLogin from "./pages/signuplogin";
import ForgotPassword from './pages/ForgotPassword'; 
import Verification from "./pages/Verification";
import ChangePassword from "./pages/ChangePassword";
import StartQuiz from "./pages/StartQuiz";
import TakeQuizAgain from "./pages/TakeQuizAgain";
import Questions from "./pages/Questions";
import LeaveQuiz from "./pages/LeaveQuiz";
import LoadingScreen from "./pages/LoadingScreen";
import {LoadingProvider } from "./pages/LoadingContext";
import EndingScreen from "./pages/EndingScreen";
import UserProfile from "./pages/Userprofile";
import PetBio from "./pages/PetBio";


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
              <Route path="/EndingScreen" element={<EndingScreen/>}/>
              <Route path="/Userprofile" element={<UserProfile/>}/>
              <Route path="/PetBio" element={<PetBio/>}/>
          </Routes>
        )}

      </Router>
      </LoadingProvider>
  );
}
    
  export default App;
