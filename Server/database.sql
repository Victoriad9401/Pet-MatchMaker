CREATE DATABASE petmatchmaker;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    -- Stores a hashed password
    password TEXT NOT NULL, 
    --This is meta data that could be useful
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE user_questionnaire(
    id SERIAL PRIMARY KEY,
    --fk
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    --flexible format, important because questionaire has branching and open-response
    responses JSONB NOT NULL,
    --This is meta data that could be useful
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Constraint: pets belonging to the same organization, that have the same primary_breed, cannot have the same name (Or they will be seen as accidental duplicates)
--           -Issue: If a pet profile duplicate was created, but the name or primary_breed is changed, the system will have.
--           -Solution: Angels among us should avoid creating duplicate profiles in petfinder if possible, but if they do avoid changing the duplicate's name OR breed. 
CREATE TABLE pets(
    id SERIAL PRIMARY KEY, 

    --Petfinder API's unique id. Software design princp: promote decoupling from external elements. This also is important since angels among us uploads dupliate profiles
    petfinder_id INTEGER UNIQUE NOT NULL, 
    organization_id VARCHAR(50), 
    url TEXT, --Full Petfinder profile link

    type VARCHAR(50), --example data "Cat"
    species VARCHAR(50), --example data "Cat"
    breed_primary VARCHAR(100),
    breed_secondary VARCHAR(100),
    mixed BOOLEAN,
    

    age VARCHAR(50), ----example data "Young"
    gender VARCHAR(20), --example data "Female"
    size VARCHAR(50), ----example data "Medium"
    coat VARCHAR(50),----example data "Short"
    name VARCHAR(100) NOT NULL, ----example data "Nebula"
    description Text,
    -- Photo Urls
    photo_small TEXT,  
    photo_medium TEXT,  
    photo_large TEXT,  
    photo_full TEXT,  

    status VARCHAR(50),  -- --example data "adoptable"
    
    --Attributes
    spayed_neutered BOOLEAN,  
    house_trained BOOLEAN,  
    declawed BOOLEAN,  
    special_needs BOOLEAN,  
    shots_current BOOLEAN,  
    good_with_children BOOLEAN,  
    good_with_dogs BOOLEAN,  
    good_with_cats BOOLEAN, 
    tags JSONB, 
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP, --Last time the data was updated
    color_primary VARCHAR(50),
    color_secondary VARCHAR(50)
    CONSTRAINT unique_name_org_breed UNIQUE (name, organization_id, breed_primary)
);

-- I might need a table of pet breeds

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    --fk
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    --fk
    pet_id INTEGER REFERENCES pets(id) on DELETE CASCADE,
    ranking_score DECIMAL(5, 2) NOT NULL,
    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);