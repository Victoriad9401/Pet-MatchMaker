import React, {useState, useEffect} from "react";
import styles from "./Recommended.module.css"
import { Link, useNavigate } from "react-router-dom";
import PetCard from "./PetCard";
import { fetchPetProfiles } from "../api/petService";



const Recommended = ({ userPreferences }) => {
        const[pets, setPets] = useState([]);
        const[filteredPets, setFilteredPets] = useState([]);
        const[filter, setFilter] = useState({age: "all", size: "all", breed: "all", gender:"all", animalType:"all"});
        const[favorites, setFavorites] = useState([]);
        const[showFilterOptions, setShowFilterOptions] = useState(false);
        const [loading, setLoading] = useState(true);

        const navigate = useNavigate();
        const handleMoreInfo = (pet) =>{
            navigate("/PetBio", {state: {pet} });
        };


        //Handles api
        useEffect(() => {
            const fetchPets = async ()=>{
                try{
                    setLoading(true);
                    const petsData = await fetchPetProfiles(userPreferences);
                    console.log(petsData);
                    setPets(petsData);
                    setFilteredPets(petsData);
                 }catch(error){
                    console.error("Error Fetching Pets: ", error);
                 }finally{
                    setLoading(false);
                 }
            };
            fetchPets();
            }, [userPreferences]);

            const toggleFilters =() => {
                setShowFilterOptions(prev => !prev);
            };

            //handles favorite

            useEffect(() => {
                const savedFavorites = JSON.parse(localStorage.getItem("favoritePets")) || [];
                setFavorites(savedFavorites);
            }, []);
        
            const toggleFavorite = (pet) => {
                let updatedFavorites;
                if (favorites.some((fav) => fav.petfinder_id === pet.petfinder_id)) {
                    updatedFavorites = favorites.filter((fav) => fav.petfinder_id !== pet.petfinder_id);
                } else {
                    updatedFavorites = [...favorites, pet];
                }
                setFavorites(updatedFavorites);
                localStorage.setItem("favoritePets", JSON.stringify(updatedFavorites));
            };


    

                 return(
                    
                    <div className={styles.Recommended}>
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
                            
                             <div className={styles.blue}>
                             <img src="/blue1.png" alt="blue1" className="blue2"/>
                             </div>
                        
                             <div className={styles.blue2}>
                             <img src="/bluepaw.png" alt="blue2" className="blue2"/>
                             </div>
                    </div>
                    
                        <div className={styles.container}>
                        <h1> Recommended Pets</h1>
                        </div>
                        <div className={styles.RecommendedContainer}>
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
                      <p>Your Recommended Pets: </p>
                      </div>

                      {/*Loading*/}
                     {loading ? (
                        <div className={styles.loading}>
                            <p>Loading Recommended pets...</p>
                            </div>
                     ):(
                        <> 

                     {/*shows pets*/}

                     {filteredPets.length > 0 ?(
                        <div>
                             {/*top 3 pets*/}
                             <div className={styles.petcontainers}>
                                {filteredPets.slice(0, 3).map((pet, index) => (
                                    <PetCard
                                     key = {pet.petfinder_id}
                                     pet ={pet} 
                                     rank={index + 1}
                                     onMoreInfo={handleMoreInfo}
                                     />
                                ))}
                            </div>

                            {filteredPets.length > 3 && (
                                <div>
                             <div className={styles.petcontainer}>
                                {filteredPets.slice(3).map((pet) => (
                                    <PetCard 
                                        key = {pet.petfinder_id} 
                                        pet={pet}
                                        isFavorite={favorites.some((fav) => fav.petfinder_id === pet.petfinder_id )}
                                        onMoreInfo={handleMoreInfo}
                                        />
                                ))}
                         </div>
                    </div>
                 )}
            </div>
            

                ) : (
                    <p className="text-center text-gray-600">No Matching Pets Found! Try the quiz again</p>
                )} 
                 </>
            )}
            
                </div>
           
        );
    };

    export default Recommended;