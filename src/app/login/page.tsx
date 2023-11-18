"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

import { Lock, Mail } from "lucide-react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import SocialLoginButton from "@/components/SocialLoginButton";
import Input from "@/components/Input";
import { auth } from "@/service/firebase";

export default function Login() {
  const {
    user,
    signInWithGoogle,
    handleSignInWithEmailAndPassword,
    loadingUserState,
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loadingScreen = () => {
    return (
      <div className="h-screen w-screen text-white bg-gray-900">
        <h1 className="text-white">LOADING...</h1>
      </div>
    );
  };

  {
    loadingUserState && loadingScreen;
  }

  return (
    <main className="min-h-screen w-screen flex items-center justify-center gap-16 px-[5%] dark:bg-gray-900">
      <div className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 p-8 rounded-lg">
        <span>{user?.displayName}</span>
        <h1 className="text-2xl font-bold text-center mb-8">Login Page</h1>
        {/* <h1>{loadingUserState === true ? "IS LOADING" : "IS NOT LOADING"}</h1> */}
        <form
          action="#"
          className="flex flex-col items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignInWithEmailAndPassword(email, password);
          }}
        >
          <Input
            icon={<Mail className="h-4 text-gray-500" />}
            id="email"
            type="mail"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={<Lock className="h-4 text-gray-500" />}
            id="password"
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link href="/login" className="text-violet-500 mr-auto pb-3 text-sm">
            Forgot my password
          </Link>

          <button className="w-full bg-violet-500 px-4 py-2 rounded-lg transition-all hover:tracking-wider">
            Login
          </button>
        </form>

        <p className="text-sm text-center leading-10">
          Don`t have an account?{" "}
          <Link href="/login" className="font-bold text-violet-500">
            Sign Up
          </Link>
        </p>

        <div className="flex items-center">
          <div className="h-[1px] w-full bg-zinc-500"></div>
          <span className="mx-4 leading-10">or</span>
          <div className="h-[1px] w-full bg-zinc-500"></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <SocialLoginButton
            icon={<BsGoogle />}
            text={"Sign in With Google"}
            onClick={signInWithGoogle}
          />
          {/* <SocialLoginButton icon={<BsGithub />} text={"Sign in With GitHub"} onClick={signInWithGoogle} /> */}
        </div>
      </div>
    </main>
  );
}
