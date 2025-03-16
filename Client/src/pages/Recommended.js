import React, {useState, useEffect} from "react";
import axios from "axios";
import{FaHeart} from "react-icons/fa"; //imports hearts
import styles from "./Recommended.module.css"
import { Link } from "react-router-dom";
import PetCard from "./PetCard";

const Recommended = ({ userPreferences }) => {
        const[pets, setPets] = useState([]);
        const[filteredPets, setFilteredPets] = useState([]);
        const[filter, setFilter] = useState({age: "all", size: "all", breed: "all", gender:"all", animalType:"all"});
        const[favorites, setFavorites] = useState([]);
        const[showFilterOptions, setShowFilterOptions] = useState(false);

        useEffect(() => {
            const fetchPets = async ()=>{
                try{
                    const response = await axios.post("/api/pets/match", userPreferences);
                    setPets(response.data.pets);
                    setFilteredPets(response.data.pets);
                 }catch(error){
                    console.error("Error fetching matched pets", error);
                 }
            };
            fetchPets();
            }, [userPreferences]);

            const toggleFilters =() => {
                setShowFilterOptions(prev => !prev);
            };

            //Handles Filtering
            const handleFilterChange = (e) =>{
                const{name, value} = e.target;
                setFilter((prev) => ({ ...prev, [name]: value}));
                };

                useEffect(() => {
                    let filtered = pets.filter((pet) =>{
                        return (
                            (filter.animalType === "all" || pet.animal === filter.animal) &&
                            (filter.age === "all" || pet.age === filter.age) &&
                            (filter.size === "all" || pet.size === filter.size) &&
                            (filter.breed === "all" || pet.breed_primary === filter.breed)&&
                            (filter.gender === "all" || pet.gender === filter.gender)
                        );
                    });
                    setFilteredPets(filtered);
                 }, [filter, pets]);

                 const uniqueAges = [...new Set(pets.map((pet) => pet.age))];
                 const uniqueSizes = [...new Set(pets.map((pet) => pet.size))];
                 const uniqueBreeds = [...new Set(pets.map((pet) => pet.breed_primary))];
                 const uniqueGenders = [...new Set(pets.map((pet) => pet.gender))];
                 const uniqueAnimals = ["all", "cat", "dog"];

                 const toggleFavorite =(petId) => {
                    setFavorites((prevFavorites)=> {
                        if(prevFavorites.includes(petId)){
                            return prevFavorites.filter((id)=> id !== petId);
                        }else{
                            return[...prevFavorites, petId];
                        }
                    });
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
                        <h1> Recommended Pets</h1></div>
                        <div className={styles.RecommendedContainer}>
                        {/* Navigation Bar */}
                        <nav className={styles.navBar}>
                            <ul className={styles.navList}>
                                <li>
                                    <Link to="/results" className={`${styles.navLink} ${styles.navLink1}`}>Home</Link>
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
                      
                      
                      <div className={styles.filters}>
                    {/*Filter dropdowns*/}
                    <div className="mb-6">
                    <div className="flex justify-center gap-4">
                     <select
                         name="All Filters"
                         onClick={toggleFilters}
                         className={`${styles.filterDropdown} ${filter.animalType !== 'all' ? styles.active : ''}`} >
                            <option value="all"> All Filters</option>
                         </select>

                            {showFilterOptions && (<>
                                <select
                                    name="animalType"
                                    value={filter.animalType}
                                    onChange={handleFilterChange}
                                    className={`${styles.filterDropdown} ${filter.animalType !== 'all' ? styles.active : ''}`}
                                    >

                                <option value="all"> Animals</option>
                                {uniqueAnimals.map((type) => (
                                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}

                            </select>

                            <select 
                                name="age"
                                value={filter.age}
                                onChange={handleFilterChange}
                                className={`${styles.filterDropdown} ${filter.animalType !== 'all' ? styles.active : ''}`} 
                                >
                                 <option value="all"> Ages</option>
                                {uniqueAges.map((age) => (
                                  <option key={age} value={age}>{age}</option>
                                ))}
                            </select>


                            <select 
                                name="size"
                                value={filter.size} 
                                onChange={handleFilterChange} 
                                className={`${styles.filterDropdown} ${filter.animalType !== 'all' ? styles.active : ''}`} 
                                >

                                <option value="all"> Sizes</option>
                                {uniqueSizes.map((size) => (
                                  <option key={size} value={size}>{size}</option>
                                ))}
                            </select>

                            <select 
                                name="breed" 
                                value={filter.breed} 
                                onChange={handleFilterChange}
                                className={`${styles.filterDropdown} ${filter.animalType !== 'all' ? styles.active : ''}`} 
                                >

                                <option value="all"> Breeds</option>
                                {uniqueBreeds.map((breed) => (
                                  <option key={breed} value={breed}>{breed}</option>
                                ))}
                            </select>

                            <select 
                                name="gender" 
                                value={filter.gender} 
                                onChange={handleFilterChange}
                                className={`${styles.filterDropdown} ${filter.animalType !== 'all' ? styles.active : ''}`} 
                                >

                                <option value="all"> Genders</option>
                                {uniqueGenders.map((gender) => (
                                  <option key={gender} value={gender}>{gender}</option>
                                ))}
                            </select>
</>
                            )}
                            </div>
                    </div>
                    </div>

                     {/*shows pets*/}

                     {filteredPets.length > 0 ?(
                        <div>
                             {/*top3 pets*/}
                             <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPets.slice(0, 3).map((pet, index) => (
                                    <PetCard
                                     key = {pet.petfinder_id}
                                     pet ={pet} 
                                     rank={index + 1}
                                     isFavorite={favorites.includes(pet.petfinder_id)}
                                     toggleFavorite={toggleFavorite}
                                     />
                                ))}
                            </div>

                            {filteredPets.length > 3 && (
                                <div>
                             <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPets.slice(3).map((pet) => (
                                    <PetCard 
                                        key = {pet.petfinder_id} 
                                        pet={pet}
                                        isFavorite={favorites.includes(pet.petfinder_id)}
                                        toggleFavorite={toggleFavorite}
                                        />
                                ))}
                         </div>
                    </div>
                 )}
            </div>

                ) : (
                    <p className="text-center text-gray-600">No Matching Pets Found! Try the quiz again</p>
                )} 
                </div>
          
        );
    };

    export default Recommended;