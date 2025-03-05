import React from "react";
import { useNavigate } from "react-router-dom";
import "./forgetPassword.css"

const ForgetPassword = () =>{
  return(
    <div className="form-container">
    <form>
        <h1>Forgot Password</h1>
        <input type="email" placeholder="Email" />
        <p>We'll send a notification code to this email</p>
        <button type="button" onClick={() => navigate("/auth")}>Next</button>
      <button type= "button" onClick={() => navigate("/auth")}>Back</button>

    </form>

    <div className="Left side">
        <img src="/Qcat.png" alt="QCat" className="QCat"/>
        <img src="/black2paw.png" alt="black2paw" className="black2paw"/>
    </div>

    <div className="right-side">
         <img src="/Qdog.png" alt="QDog" className="QDog"/>
         <img src="/black2paw.png" alt="black2paw" className="black2paw"/>
</div>
</div>

    );
};

export default ForgetPassword;

