import {FaHeart} from "react-icons/fa"

const PetCard = ({pet, rank, onMoreInfo, onAdopt, isFavorite, onToggleFavorite,onRemove}) => {
    const handleToggleFavorite = () =>{
        if(isFavorite){
            onRemove(pet.id);
             }
             else{
                onToggleFavorite(pet);
             }
    };
  

    return(

            <div classname = {`relative border p-4 rounded-lg shadow-md ${rank ? "border-yellow-500 bg-yellow-100" : "border-gray-300"}`}>
                {/*Favorite Button*/}

                <button
                    onClick={ handleToggleFavorite}
                    className="absolute top-2 left-2 text-2xl cursor-pointer">

                        <FaHeart className={isFavorite ? "text-red-500": "text-gray-400"}/>
                    </button>

                {/* Rank badge  top 3*/} 
                {rank && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white font-bold px-3 py-1 rounded-full">
                        #{rank}
                    </div>
                )}

                {/*Pet Image */} 
                <img src = {pet.photo_medium || "https://via.placeholder.com/150"} alt={pet.name} className="v-full h-48 object-cover rounded-mb mb-4"/>

                {/* Pet info */} 
                <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
                <p className="text-gray-700">Breed: {pet.breed_primary} {pet.breed_secondary ? `& ${pet.breed_secondary}` : ""}</p>
                
                  {/* Buttons */} 
                <div className="mt-4 flex justify-between">
                    <button onClick={() => onMoreInfo(pet)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">More Info</button>
                    <button onClick={() => onAdopt(pet)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Adopt</button>
                </div>
            </div>
        );
    };

    export default PetCard;