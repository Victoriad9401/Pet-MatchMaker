import {FaHeart} from "react-icons/fa"
import styles from './PetDetails.module.css';


const PetDetails = ({pet, rank, isFavorite, onToggleFavorite,onRemove}) => {


    const handleToggleFavorite = () =>{
        if(isFavorite){
            onRemove(pet.id);
             }
             else{
                onToggleFavorite(pet);
             }
    };

  
  

    return(

            <div className ={`{styles.petCard} ${rank ? styles.ranked : ''}`}>
                {/*Favorite Button*/}

                <button
                    onClick={ handleToggleFavorite}
                    className={styles.favoriteBtn}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <FaHeart className={isFavorite ? styles.favoriteActive : styles.favoriteInactive}/>
                    </button>

                {/* Rank badge  top 3*/} 
                {rank && (
                    <div className= {styles.rankBadge}>
                        #{rank}
                    </div>
                )}

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