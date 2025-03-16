import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Favorite.module.css"
import PetCard from "./PetCard";

const Favorite =() =>{
    //state to read favorites pets

    const[favorites, setFavorites] = useState([]);

    const ToggleFavorite = (pet) =>{
        if(favorites.some(favPet => favPet.id === pet.id)){
            setFavorites(prevFavorites => prevFavorites.filter(favPet => favPet.id !== pet.id));

        }
        else{
            setFavorites(prevFavorites => [...prevFavorites, pet]);
        }
    };
    const removeFromFavorites =(petId) => {
        setFavorites(prevFavorites => prevFavorites.filter(pet => pet.id !== petId));
    };


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
                {favorites.length === 0 ? (
                    <div className={styles.noFavorites}>
                        <p> No Favorite pets added yet</p>
                        </div>
                ): (<div className={styles.favoritesList}>
                    {favorites.map((pet)=>(
                        <PetCard 
                         key ={pet.id}
                         pet={pet} 
                         isFavorite={true}
                         onToggleFavorite={ToggleFavorite}
                         onRemove={removeFromFavorites}
                          />
                    ))}
                    </div>
                    )}
              </div>
      </div>
    );
};

    

export default Favorite;
