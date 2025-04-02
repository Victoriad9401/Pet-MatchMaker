import {FaHeart} from "react-icons/fa"
import styles from './PetCard.module.css';
import { useNavigate} from "react-router-dom";

const PetCard = ({pet, rank, onMoreInfo, onAdopt, isFavorite, onToggleFavorite,onRemove}) => {
    const navigate=useNavigate();

    const handleToggleFavorite = () =>{
        if(isFavorite){
            onRemove(pet.id);
             }
             else{
                onToggleFavorite(pet);
             }
    };

    const handleMoreInfo =() =>{
        navigate('/PetBio', {state: {pet}});
    }

    const handleAdopt = () => {
        navigate("/EndingScreen", {state: {petType: pet.species}})
    };
  

    return(

            <div className ={`{styles.petCard} ${rank ? styles.ranked : ''}`}>

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

                {/* Pet info */} 
                <h3 className={styles.petName}>{pet.name}</h3>
                <p className={styles.petBreed}>
                     {pet.breed_primary} {pet.breed_secondary ? `& ${pet.breed_secondary}` : ""}</p>
                
                  {/* Buttons */} 
                <div className={styles.buttonGroup}>
                    <button onClick={handleMoreInfo} className={styles.infoBtn}>More Info</button>
                    <button onClick={handleAdopt} className={styles.adoptBtn}>Adopt</button>
                </div>
            </div>
        );
    };

    export default PetCard;