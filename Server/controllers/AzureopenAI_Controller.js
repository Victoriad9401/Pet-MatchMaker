const {client, modelName } = require("../config/openAI");


// 1. We will use structured outputs. 
// We need a consistent output to be able to reliably extratct the ranking for each profile. 
// TO get a reliable output, we will use the Strcutured outputs: (https://platform.openai.com/docs/guides/structured-outputs?api-mode=chat).


//Update 2: GPT3.5 does not have the structured outputs feature, but it has json mode. This is less ideal...

async function rankProfiles(filteredPetProfiles, petTraits, petHobbies, additionalInfo) {

    //Construct petProfile String
    const petProfileString = filteredPetProfiles.map(pet => `${pet.name} - ${pet.breed_primary}, ${pet.age}: ${pet.description}`).join('\n')

    //Construct prompt
    const prompt = `Return a JSON object with a field called "scores" containing a list of scored pet profiles.
    Format:

    {
    "scores": [
        { "name": "Pet Name", "score": 0-100 },
        { "name": "Another Pet", "score": 0-100 }
    ]
    }

    DO NOT include any extra text or explanations. Only output valid JSON. 

    Scores will be from 0-100 based on how well each pet profile matches the user's responses for Traits, Lifestyle, and Extra Context. Each pet profile must be given a unique score. 

    Ideal Pet Context:
    Traits: ${petTraits}
    Lifestyle: ${petHobbies}
    Extra Context: ${additionalInfo}

    Pet Profiles: ${petProfileString}

    IMPORTANT: Return a JSON with all the profiles ranked in descending order of their score. The array should contain ALL pet profiles
    `;
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a ranking assistant." },
                { role: "user", content: prompt }
            ],
            max_tokens: 210, //Estimnate that prompt uses about 800 tokens, and so allocate 1000-800 = 200
            temperature: 0.1, //Lower values makes it more deterministic. We want it to be less random and more methodical so lower val. 
            top_p: 1,
            model: modelName,
            response_format:{"type": "json_object"} // Not Safe
        });

        // Response error
        if (response?.error !== undefined && response.status !== "200") {
            throw response.error;
        }

        //Try to parse
        try{
        let result = response.choices[0].message.content;

        if(typeof result === "string"){
            try {
                result = JSON.parse(result);
            } catch (error) {
                console.error("Still failing to Parse result: ", error);
                console.error(response.choices[0].message.content)
            }
        }
        
        if(result.scores.length < filteredPetProfiles.length){
            console.warn(`Only ranked ${result?.scores.length || 0} of ${filteredPetProfiles.length}.`)
        }

        //Return resultant scored profiles
        return mergeScoreProfiles(filteredPetProfiles, result.scores);
        
        }catch(error){
            console.error("Failed to Parse result: ", error);
        }

    } catch (error) {
        console.error("The Azure ChatCompletion encountered an error:", error);
    }
}

// Function to merge Scores and filteredPetProfiles together
function mergeScoreProfiles(filteredPetProfiles, ranking){
    //Create a map to link name-score
    const scoreMap = new Map(ranking.map(entry => [entry.name, entry.score]));

    //Add score to profiles
    const scoredProfiles = filteredPetProfiles.map(profile=> ({
        ...profile,
        score: scoreMap.get(profile.name) || 0
    }))
    return scoredProfiles;
}

module.exports = { rankProfiles };

