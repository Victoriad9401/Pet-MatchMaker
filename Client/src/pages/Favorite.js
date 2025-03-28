import React, {useState, useEffect} from "react";
import { json, Link } from "react-router-dom";
import styles from "./Favorite.module.css"
import PetCard from "./PetCard";
import PetDetails from "./PetDetails";
const Favorite =() =>{
    //state to read favorites pets

    const [favoritePets, setFavoritePets] = useState([]);


//for the petcard saved pets
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favoritePets')) || [];
        setFavoritePets(savedFavorites);
    }, []);

    const removeFavorite = (petId) => {
        const updatedFavorites = favoritePets.filter((pet) => pet.petfinder_id !== pet.petfinder_id);
        setFavoritePets(updatedFavorites);
        localStorage.setItem('favoritePets', JSON.stringify(updatedFavorites));
    };
    
// gets petdetail saved pets
    useEffect (() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavoritePets(storedFavorites);
    }, []);


return(

<div className={styles.Favorite}>
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
        
         <div className={styles.pawHeart}>
         <img src="/PinkHeart.png" alt="pinkH" className="pawHeart"/>
         </div>
    
         <div className={styles.pawHeart2}>
         <img src="/PinkHeart.png" alt="Pinkh2" className="pawHeart2"/>
         </div>
</div>

    <div className={styles.container}>
    <h1> Favorites</h1></div>
    <div className={styles.FavoriteContainer}>
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

       <div className={styles.listing}>
                      <p>My Favorites: </p>
                      </div>

     <div className={styles.favpets}>
                {favoritePets.length === 0 ? (
                    <div className={styles.noFavorites}>
                        <p> No Favorite pets added yet</p>
                        </div>
                ): (<div className={styles.favoritesList}>
                    {favoritePets.map((pet)=>(
                        <PetCard 
                         key ={pet.petfinder_id}
                         pet={pet} 
                         isFavorite={true}
                         onRemove={removeFavorite}
                         
                          />
                    ))}
                    </div>
                    )}
              </div>
      </div>
    );
};

    

export default Favorite;
