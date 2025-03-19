import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Userprofile.module.css"

const UserProfile = () => {
    const[formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
});

const[isEditing, setIsEditing] = useState(false);
const[showChangePassword, setShowChangePassword] = useState(false);
const navigate = useNavigate();

const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Profile saved:", formData);
    // Add logic to save data to an API or state management
};

const handleEdit = () => {
    setIsEditing(true);
};

const handleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
};

const handleLogout = () => {
    // Add logout logic, e.g., clear user session
    console.log("User logged out");
    navigate("/"); 
};

return(

<div className={styles.UserProfile}>
    <div className={styles.containers}>
        
    <div className={styles.quiz}>
         <img src="/quiz.png" alt="quiz" className="quiz"/>
         </div>
    
         <div className={styles.heart}>
         <img src="/heart.png" alt="heart" className="heart"/>
         </div>
    
         <div className={styles.profile}>
         <img src="/profile.png" alt="profile" className="profile"/>
         </div>
    
         <div className={styles.house}>
         <img src="/house.png" alt="house" className="house"/>
         </div>
    
         <div className={styles.ucat}>
         <img src="/ucar.png" alt="cat" className="ucat"/>
         </div>
    
         <div className={styles.circlep}>
         <img src="/circlep.png" alt="circlep" className="circlep"/>
         </div>
    
         <div className={styles.circlec}>
         <img src="/circlec.png" alt="cirlcec" className="circlec"/>
         </div>
         <div className={styles.speechbubble}>
         Make sure you add put all of your information in *Meow*
</div>
    

         </div>
    <div className={styles.container}>
    <h1>User Profile</h1></div>
    <div className={styles.userProfileContainer}>
    {/* Navigation Bar */}
    <nav className={styles.navBar}>
        <ul className={styles.navList}>
            <li>
                <Link to="/Recommended" className={`${styles.navLink} ${styles.navLink1}`}>Home</Link>
            </li>
            <li>
                <Link to="/Userprofile" className={`${styles.navLink} ${styles.navLink2}`}>Profile</Link>
            </li>
            <li>
                <Link to="/favorite" className={`${styles.navLink} ${styles.navLink3}`}>Favorite</Link>
            </li>
            <li>
            <Link to="/takeQuizAgain" className={`${styles.navLink} ${styles.navLink4}`}>Questionnaire Quiz</Link>
            </li>
        </ul>
    </nav>
      </div>
    
    <form onSubmit = {handleSave}>
        <div className={styles.formField}>
            <label> First Name:</label>
            <input
            type = "text"
            name = "firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled ={!isEditing}
            required
            className={styles.inputField}
            />
        </div>
        <div className={styles.formField}>
        <label> Last Name:</label>
            <input
            type = "text"
            name = "lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled ={!isEditing}
            required
            className={styles.inputField}
            />
        </div>
        <div className={styles.formField}>
        <label> Email:</label>
            <input
            type = "email"
            name = "email"
            value={formData.email}
            onChange={handleChange}
            disabled ={!isEditing}
            required
            className={styles.inputField}
            />
        </div>
        {showChangePassword && (
                <div className={styles.formField}>
                    <label>New Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={styles.inputField}
                    />
                </div>
            )}

        <div className={styles.buttonContainer}>
                {!isEditing ? (
                    <button type="button" onClick={handleEdit}>Edit</button>
                ) : (
                    <button type="submit">Save</button>
                )}
                <button type="button" onClick={handleChangePassword}>
                    {showChangePassword ? "Hide Change Password" : "Change Password"}
                </button>
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
        </form>
  
        </div>
    );
};

export default UserProfile;