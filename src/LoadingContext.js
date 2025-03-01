import React, { createContext, useState } from "react";

// Create a context for the loading state
export const LoadingContext = createContext();

// Create a provider component
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};