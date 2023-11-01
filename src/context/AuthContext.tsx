"use client"
import { createContext, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/service/firebase";

interface AuthContextType {
    user: [];
    logOut: () => void;
    signInWithGoogle: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }:any) => {
    const [user, setUser] = useState([]);
    
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        console.log("Login With Google:", user);

        setUser(user);
    }

    const logOut = () => {
        alert("Log out function");
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}
