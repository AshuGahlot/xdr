import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        username: localStorage.getItem('username') || '',
        password: localStorage.getItem('password') || '',
    });

    // Sync authData with localStorage
    useEffect(() => {
        if (authData.username && authData.password) {
            localStorage.setItem('username', authData.username);
            localStorage.setItem('password', authData.password);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
    }, [authData]);

      // Compute isLoggedIn based on authData
      const isLoggedIn = Boolean(authData.username && authData.password);

    // Logout function to clear auth state
    const logout = () => {
        setAuthData({ username: '', password: '' });
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    };
    

    return (
        <AuthContext.Provider value={{ authData, setAuthData, isLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
