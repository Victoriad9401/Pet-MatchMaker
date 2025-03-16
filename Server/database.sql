CREATE DATABASE petmatchmaker;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Stores the HASHED password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP --meta data that may be useful
);

CREATE TABLE user_questionnaire(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, --foreign key for users.id
    responses JSONB NOT NULL, --flexible format, important because questionaire has branching and open-response
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP --meta data that may be useful
);

-- Constraint: pets belonging to the same organization, that have the same primary_breed, cannot have the same name (Or they will be seen as accidental duplicates)
--           -Issue: If a pet profile duplicate was created, but the name or primary_breed is changed, the system will have.
--           -Solution: Angels among us should avoid creating duplicate profiles in petfinder if possible, but if they do avoid changing the duplicate's name OR breed. 
CREATE TABLE pets(
    id SERIAL PRIMARY KEY, --unique id for the pets in our local database
    petfinder_id INTEGER UNIQUE NOT NULL, --Petfinder API's unique id. Software design princp: promote decoupling from external elements. 
    organization_id VARCHAR(50), --Shelter ID. Usually will be Angels among us, but we might use others for testing
    url TEXT, --Full Petfinder profile link

    type VARCHAR(50), -- ex: "Cat"
    species VARCHAR(50), --ex: "Cat"
    breed_primary VARCHAR(100),
    breed_secondary VARCHAR(100),
    mixed BOOLEAN,
    

    age VARCHAR(50), -- ex: "Young"
    gender VARCHAR(20), --ex: "Female"
    size VARCHAR(50), --ex: "Medium"
    coat VARCHAR(50),--ex: "Short"
    name VARCHAR(100) NOT NULL, --ex: "Nebula"
    description Text,
    -- Photo Urls
    photo_small TEXT,  
    photo_medium TEXT,  
    photo_large TEXT,  
    photo_full TEXT,  

    status VARCHAR(50),  -- ex: "adoptable"
    
    --Attributes
    spayed_neutered BOOLEAN,  
    house_trained BOOLEAN,  
    declawed BOOLEAN,  
    special_needs BOOLEAN,  
    shots_current BOOLEAN,  
    good_with_children BOOLEAN,  
    good_with_dogs BOOLEAN,  
    good_with_cats BOOLEAN, 
    tags JSONB, -- ex:
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP, --Last time the data was updated
    color_primary VARCHAR(50),
    color_secondary VARCHAR(50)


    CONSTRAINT unique_name_org_breed UNIQUE (name, organization_id, breed_primary)


);

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, --foreign key for users.id
    pet_id INTEGER REFERENCES pets(id) on DELETE CASCADE,--foreign key for pet.id
    ranking_score DECIMAL(5, 2) NOT NULL,
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP --meta data that may be useful
);