"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import ToggleThemeButton from "./ToggleThemeButton";

export default function Header() {
  const { logOut } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed h-16 w-full flex items-center justify-between bg-zinc-50 dark:bg-gray-900 shadow-lg px-[5%]">
      <h1 className="font-bold">Chat | Firebase</h1>

      <div className="flex items-center">
        <ToggleThemeButton />
        <button
          className="border border-zinc-500/50 px-4 py-2 rounded-xl"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </header>
  );
}
