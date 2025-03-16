import React, {useState, useEffect} from "react";
import axios from "axios";
import{FaHeart} from "react-icons/fa"; //imports hearts
import styles from "./Recommended.module.css"

const Recommended = ({ userPreferences }) => {
        const[pets, setPets] = useState([]);
        const[filteredPets, setFilteredPets] = useState([]);
        const[filter, setFilter] = useState({age: "all", size: "all", breed: "all"});

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

            //Handles Filtering
            const handleFilterChange = (e) =>{
                const{name, value} = e.target;
                setFilter((prev) => ({ ...prev, [name]: value}));
                };

                useEffect(() => {
                    let filtered = pets.filter((pet) =>{
                        return (
                            (filter.age === "all" || pet.age === filter.age) &&
                            (filter.size === "all" || pet.size === filter.size) &&
                            (filter.breed === "all" || pet.age === filter.breed)
                        );
                    });
                    setFilteredPets(filtered);
                 }, [filter, pets]);

                 const uniqueAges = [...new Set(pet.map((pet) => pet.age))];
                 const uniqueSizes = [...new Set(pet.map((pet) => pet.size))];
                 const uniqueBreeds = [...new Set(pet.map((pet) => pet.breed_primary))];

                 return(
                    
                    <div className={styles.Recommended}>
                        <div className={styles.containers}>
                            
                        <div className={styles.quiz}>
                             <img src="/quiz.png" alt="quiz" className="quiz"/>
                             </div>
                        
                             <div className={styles.heart}>
                             <img src="/heart.png" alt="heart" className="heart"/>
                             </div>
                        
                          \
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
                          

                    <div className="max-w-5xl mx-auto py-10">
                        <h2 className="text-3xl font-bold text-center mb-6"> Your Recommended Pets</h2>
                    {/*Filter dropdowns*/}
                    <div className="flex justify0center gap-4 mb-6">
                            <select name="age" value={filter.age} onChange={handleFilterChange} className="border p-2 rounded-lg">
                                <option value="all"> All Ages</option>
                                {uniqueAges.map((age) => (
                                  <option key={age} value={age}>{age}</option>
                                ))}
                            </select>

                            <select name="size" value={filter.size} onChange={handleFilterChange} className="border p-2 rounded-lg">
                                <option value="all"> All Sizes</option>
                                {uniqueAges.map((size) => (
                                  <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                            <select name="breed" value={filter.breed} onChange={handleFilterChange} className="border p-2 rounded-lg">
                                <option value="all"> All Breeds</option>
                                {uniqueAges.map((breed) => (
                                  <option key={breed} value={breed}>{breed}</option>
                                ))}
                            </select>
                    </div>

                     {/*shows pets*/}

                     {filteredPets.length > 0 ?(
                        <div>
                             {/*top3 pets*/}
                             <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPets.slice(3).map((pet, index) => (
                                    <PetCard key = {pet.petfinder_id} pet = {pet} rank={index + 1}/>
                                ))}
                            </div>
                            {filteredPets.length > 3 && (
                                <div>
                            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4"> Other Avaible Pets</h3>
                            <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPets.slice(3).map((pet) => (
                                    <PetCard key = {pet.petfinder_id} pet={pet}/>
                                ))}
                         </div>
                         </div>
                 )}
                 </div>

                ) : (
                    <p className="text-center text-gray-600">No Matching Pets Found try adjusting filters</p>
                )} 
                </div>
                </div>
                );
            };

const PetCard = ({pet, rank}) => {
    const[isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite =() => {
        setIsFavorite(!isFavorite);
    };
        return(
            <div classname = {`relative border p-4 rounded-lg shadow-md ${rank ? "border-yellow-500 bg-yellow-100" : "border-gray-300"}`}>

                <button
                    onClick={toggleFavorite}
                    className="absolute top-2 left-2 text-2xl cursor-pointer">
                        <FaHeart className={isFavorite ? "text-red-500": "text-gray-400"}/>
                    </button>
                {/* Rank badge  top 3*/} 
                {rank && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white font-bold px-3 py-1 rounded-full">
                        #{rank}
                        </div>
                )}

                <img src = {pet.photo_medium || "https://via.placeholder.com/150"} alt = {pet.name} className="v-full h-48 object-cover rounded-mb mb-4"/>
                <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
                <p className="text-gray-700">Breed: {pet.breed_primary} {pet.breed_secondary ? `& ${pet.breed_secondary}` : ""}</p>
                <p className="text-gray-700">Age: {pet.age}</p>
                <p className="text-gray-700">Size: {pet.Size}</p>
                <div className="mt-4 flex justify-between">
                    <button classname="px-4 py-2 bg-blue-500 text-white rounded-lg">More Info</button>
                    <button classname="px-4 py-2 bg-blue-500 text-white rounded-lg">Adopt</button>
                </div>
            </div>
        );
    };

    export default Recommended;
