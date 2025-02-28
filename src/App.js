import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from "./WelcomeScreen";
import SignupLogin from "./signuplogin";
import ForgotPassword from './ForgotPassword'; 
import Verification from "./Verification";
import ChangePassword from "./ChangePassword";
import StartQuiz from "./StartQuiz";
import TakeQuizAgain from "./TakeQuizAgain";
import Questions from "./Questions";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<WelcomeScreen />} /> {/* Use the WelcomeScreen component */}
              <Route path="/auth" element={<SignupLogin />} />
              <Route path="/forget-password" element={<ForgotPassword />}/>
              <Route path="/verification" element={<Verification />}/>
              <Route path="/changePassword" element={<ChangePassword />}/>
              <Route path="/startQuiz" element={<StartQuiz />}/>
              <Route path="/takeQuizAgain" element={<TakeQuizAgain/>}/>
              <Route path="/questions" element={<Questions/>}/>
          </Routes>
      </Router>
  );
}
    
  export default App;
