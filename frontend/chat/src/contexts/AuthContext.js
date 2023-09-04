"use client";
import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  const userData = Cookies.get("userData")
  // console.log(userData);
  const initialUserData = userData? JSON.parse(userData) : null
  useEffect(() => {
    if (initialUserData) {
        setUser(initialUserData)
      }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}