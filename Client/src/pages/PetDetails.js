import {FaHeart} from "react-icons/fa"
import { useState, useEffect } from "react";
import styles from './PetDetails.module.css';


const PetDetails = ({pet, rank, isFavorite, onToggleFavorite}) => {

    const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);

    // Sync with parent component's isFavorite state
    useEffect(() => {
        setLocalIsFavorite(isFavorite);
    }, [isFavorite]);

    const handleToggleFavorite = () => {
        const newFavoriteState = !localIsFavorite;
        setLocalIsFavorite(newFavoriteState);
        onToggleFavorite(pet.petfinder_id, newFavoriteState);
    };
  
  

    return(

            <div className ={`{styles.petdetail} ${rank ? styles.ranked : ''}`}>
                {/*Favorite Button*/}

                {/* <button
                    onClick={ handleToggleFavorite}
                    className={styles.favoriteBtn}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <FaHeart className={isFavorite ? styles.favoriteActive : styles.favoriteInactive}/>
                    </button>

              */}

                {/*Pet Image */} 
                <img 
                    src = {pet.photo_medium || "https://via.placeholder.com/150"}
                    alt={pet.name}
                    className={styles.petImage}
                    />

               
            </div>
        );
    };

    export default PetDetails;