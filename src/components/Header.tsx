"use client"
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Header() {
    const { signInWithGoogle, logOut } = useContext(AuthContext);

    return (
        <header className="h-16 w-full flex items-center justify-between bg-gray-900 shadow-lg px-[5%]">
            <h1 className="font-bold">Chat | Firebase</h1>

            <button 
                className='border px-4 py-2 rounded-full'
                onClick={signInWithGoogle}
            >
                Login With Google
            </button>
        </header>
    );
}