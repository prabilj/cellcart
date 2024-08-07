import React, { createContext, useContext, useState } from 'react';

// Create an authentication context
const AuthContext = createContext();

// Create a custom hook to use the context
export function useAuth() {
    return useContext(AuthContext);
}

// Create a Provider component
export function AuthProvider({ children }) {
    const [token, setToken] = useState()
    const [userId, setUserId] = useState();

    const login = (newToken, newUserId) => {
        console.log('Setting token:', newToken)
        setToken(newToken);
        console.log("setuserId", newUserId)
        setUserId(newUserId);

    };

    const logout = () => {
        setToken(null);
        setUserId(null);

    };

    // Create a context value object
    const contextValue = {
        token,
        userId,
        login,
        logout,
       
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
