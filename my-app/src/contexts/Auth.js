import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../db";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
  
    useEffect(() => {
      const session = supabase.auth.session()
  
      setUser(session?.user ?? null)
  
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null)
        }
      )
  
      const ls = () => {listener?.unsubscribe()};
      return ls;
    }, []);
  
    const value = {
      signUp: (data) => supabase.auth.signUp(data),
      signIn: (data) => supabase.auth.signIn(data),
      signOut: () => supabase.auth.signOut(),
      user,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
  }
