CREATE DATABASE petmatchmaker;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    --Stores a hashed password
    password TEXT NOT NULL, 
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
    url TEXT,
    type VARCHAR(50), 
    species VARCHAR(50), 
    breed_primary VARCHAR(100),
    breed_secondary VARCHAR(100),
    mixed BOOLEAN,
    age VARCHAR(50), 
    gender VARCHAR(20),
    size VARCHAR(50), 
    coat VARCHAR(50),
    name VARCHAR(100) NOT NULL,
    description Text,
    photo_small TEXT,  
    photo_medium TEXT,  
    photo_large TEXT,  
    photo_full TEXT,  
    status VARCHAR(50),
    spayed_neutered BOOLEAN,  
    house_trained BOOLEAN,  
    declawed BOOLEAN,  
    special_needs BOOLEAN,  
    shots_current BOOLEAN,  
    good_with_children BOOLEAN,  
    good_with_dogs BOOLEAN,  
    good_with_cats BOOLEAN, 
    tags JSONB, 
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    color_primary VARCHAR(50),
    color_secondary VARCHAR(50)
    CONSTRAINT unique_name_org_breed UNIQUE (name, organization_id, breed_primary)
);

