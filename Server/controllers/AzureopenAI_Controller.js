const {client, modelName } = require("../config/openAI");


// 1. We will use structured outputs. 
// We need a consistent output to be able to reliably extratct the ranking for each profile. 
// TO get a reliable output, we will use the Strcutured outputs: (https://platform.openai.com/docs/guides/structured-outputs?api-mode=chat).


//Update 2: GPT3.5 does not have the structured outputs feature, but it has json mode. This is less ideal...

async function rankProfiles() {
    //**Inputs will turn into parameters later**
    // Create an array of profile objects
    const petProfiles= [
    {name: "Bearon", breed_primary:"Great Dane", age: "Adult", description: "Meet Bearon!This handsome hunk with beautiful eyes is a4-year-old, 65-pound Great Dane and Catahoula mix (we think)...."},
    {name: "Jessie Girl", breed_primary: "Boxer", age:"Adult", description: "What's not to love about me? I'm a cute, petite, super snuggler and I heard a guy named Rick wrote..."},
    {name: "Wonder Girl", breed_primary: "Pit Bull Terrier", age:"Adult", description: "Wonder Girl is the perfect example of a resilient spirit! Once timid, she has blossomed into a bubbly, outgoing girl..."},
    {name: "Callaghan", breed_primary: "Domestic Short Hair", age:"Senior", description: "Meet your new favorite movie buddy! Callaghan makes a wonderful companion for all, especially those who love to cuddle on..."},
    {name: "Johnny Papa", breed_primary: "Chihuahua", age:"Adult", description: "Meet Johnny Papa!Johnny Papa may be pint-sized, but he's big on love once you get to know him. This..."},
    {name: "Gianna", breed_primary: "Pit Bull Terrier", age:"Senior", description: "My name is Gianna and I surely need a hero, and, if you are my hero, I will pay you..."},
    {name: "Blushing Star", breed_primary: "Shepherd", age:"Adult", description: "Blushing Star's Adoption Fee is Sponsored by a volunteer who loves me!Hi, Im Blushing Star, but you can call..."},
    {name: "Chikis", breed_primary: "Chihuahua", age:"Senior", description: "Chikis is a 13-year-old Chiweenie with a heart as golden as his years. Chikis has been patiently waiting for his..."},
    {name: "Calisto", breed_primary: "Miniature Pinscher", age:"Adult", description: "Hi! My name is Calisto. Since I have that name, you should know I think I am a pirate. Aye,..."},
    {name: "Doxy", breed_primary: "Beagle", age:"Senior", description: "Doxy is a 9 year old, 17 pound, Beagle/Doxy mix. He was returned to AAU because his adopter was going..."}
    ]

    const petContext= {
        traits: "Affectionate, Supportive, Small",
        lifestyle: "Hiking and Cuddling",
        extraContext: "I live in a small apartment, so I’d prefer a lower energy pet."
    }


    //Construct petProfile String
    const petProfileString = petProfiles.map(pet => `${pet.name} - ${pet.breed_primary}, ${pet.age}: ${pet.description}`).join('\n')

    //Construct prompt
    const prompt = `Return the scoring result STRICTLY as a JSON array of objects in the following format:
    [{"name": "Pet Name", "score": 0-100}, {"name": "Another Pet", "score": 0-100}]
    DO NOT include any extra text or explanations. Only output the JSON array.

    Scores will be from 0-100 based on how well each pet profile matches the user's responses for Traits, Lifestyle, and Extra Context. Each pet profile must be given a unique score. 

    Ideal Pet Context:
    Traits: ${petContext.traits}
    Lifestyle: ${petContext.lifestyle}
    Extra Context: ${petContext.extraContext}

    Pet Profiles: ${petProfileString}

    IMPORTANT: Return a JSON array with all the profiles ranked in descending order of their score. The array should contain ALL pet profiles
    `;
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a ranking assistant." },
                { role: "user", content: prompt }
            ],
            max_tokens: 200, //Estimnate that prompt uses about 800 tokens, and so allocate 1000-800 = 200
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
        const result = JSON.parse(response.choices[0].message.content);
        console.log("Ranked Pet Profiles: ", JSON.stringify(result, null, 1));
        }catch(error){
            console.error("Failed to Parse result: ", response.choices[0].message.content);
        }

    } catch (error) {
        console.error("The sample encountered an error:", error);
    }
}

//Test it
rankProfiles();  

