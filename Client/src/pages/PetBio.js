import React, {useEffect, useState} from "react";
import { useNavigate, useLocation} from "react-router-dom";
import styles from "./PetBio.module.css";
import PetDetails from "./PetDetails";



const PetBio = () => {

    
         const navigate = useNavigate();
         const{ state } = useLocation();

         const[favorites, setFavorites] = useState(() => {
            try{
                const stored = localStorage.getItem("favorites");
                return stored? JSON.parse(stored) : [];
            }
            catch{
                return [];
            }
         });
        
         const[isLoading, setIsLoading] = useState(true);
         const[cleanDescription, setCleanDescription] = useState("");
         const[pet, setPet] = useState(null); // store pet in state


         useEffect(() => {
         const cleanPetDescription = (html) =>{
            if(!html) return "No bio avaiable";
    
            const div = document.createElement('div');
            div.innerHTML = html;
    
            let text = div.textContent || div.innerText || "";
    
            text = text
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&apos;/g, "'")
                .replace(/&#39;/g, "'")
                .replace(/&nbsp;/g, ' ');
            
            // Clean up multiple spaces and line breaks
            text = text
                .replace(/\s+/g, ' ')
                .replace(/\n\s*\n/g, '\n\n')
                .trim();
            return text;
        };
        
        //load favorites first
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            try {
                const parsedFavorites = JSON.parse(storedFavorites);
                if (Array.isArray(parsedFavorites)) {
                    setFavorites(parsedFavorites);
                }
            } catch (error) {
                console.error("Failed to load favorites", error);
            }
        }

        //then load pet
       
        if (state?.pet) {
                localStorage.setItem('currentPet', JSON.stringify(state.pet));
                setPet(state.pet);
                setCleanDescription(cleanPetDescription(state.pet.description));
                setIsLoading(false);
            } 
            else {
                    const storedPet = localStorage.getItem('currentPet');
                    if (storedPet) {
                        const parsedPet = JSON.parse(storedPet);
                        setPet(parsedPet);
                        setCleanDescription(cleanPetDescription(parsedPet.description));
                        setIsLoading(false);
                    }
                    else{
                navigate("/Recommended"); // No backup, send to Recommended
            }
        }
    }, [state, navigate]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
     }, [favorites]);

     const handleAdopt = () =>  navigate("/EndingScreen", {state: {petType: pet.species}});
     const handleBack = () =>  navigate("/Recommended");
         
     
     const isFavorite = (petToCheck) => {
        if (!petToCheck || !petToCheck.id) return false;
        return favorites.some((favPet) => favPet.id === petToCheck.id);
    };

    const toggleFavorite = (petToToggle) => {
        setFavorites((prev) =>
            prev.some((fav) => fav.id === petToToggle.id)
                ? prev.filter((fav) => fav.id !== petToToggle.id)
                : [...prev, petToToggle]
        );
    };

    if (!pet || isLoading) {
        return null;
    }



    

return(

    <div className={styles.petBio}>  
    
    
        {/*back button */}
        <div  className={styles.bbutton}>
         <button type="button" onClick={handleBack}><svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M15 18l-6-6 6-6"/>
        </svg>
    </button>
</div>
        
<div className={styles.container}>
    </div>

    {/*pictures*/}

    <div className={styles.paw}>
          <img src="/biopaw.png" alt="paw" className="paw"/>
           </div>
                                
         <div className={styles.paw2}>
        <img src="/biopaws.png" alt="paw2" className="paw2"/>
           </div>


  {/*display pet name & info container*/}
  <div key={pet.id} className={styles.intro}>
        <div className={styles.pcontainer}>
        <h3>Meet {pet.name}</h3> 
        <p> {pet.breed_primary || " breed Not Avaiable"} </p>

        {/*pet image*/}
        {pet ? (
            <PetDetails pet={pet}/>
        ):(
            <p> No Image Avaiable</p>
        )}
</div>

        {/*bio container*/}
        <div className={styles.bcontainer}>

        {/*pets info*/}
        <div className={styles.acontainer}>
            <h3> Age</h3>
            <p>{pet.age || "Not available"}</p>
        </div>

        <div className={styles.sexcontainer}>
        <h3> Sex </h3>
        <p>{pet.gender || "Not available"}</p>
        </div>

        <div className={styles.scontainer}>
        <h3> Size</h3>
        <p>{pet.size || "Not available"}</p>
        </div>

        <div className={styles.percontainer}>
        <h3> Pet Status </h3>
        <p>{pet.status || "Not available"}</p>
        </div>

        <div className={styles.infocontainer}>
            <h3><strong>About {pet.name}: </strong></h3>
           {cleanDescription.split('\n').map((paragraph, i)=> (
            <p key={i}>{paragraph}</p>
           ))}

            {/* More Info link (after description) */}
            {pet.url && (
                <a 
                href={pet.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.moreinfolink}
            > More Info</a>     
             )}
   
            <button className={styles.adoptButton} onClick={handleAdopt}>
                    Adopt
                </button>

                {/*favorite button*/}
            <button className={styles.favoriteButton} onClick={() => toggleFavorite(pet)}>
                {isFavorite(pet) ?(
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    width="24"
                    height="24"
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24"
                    height="24"
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                )}
            </button>
         </div> 
         </div>
        </div>
        </div>
    );
 };
      

export default PetBio;
