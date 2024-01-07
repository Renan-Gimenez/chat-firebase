"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

import SocialLoginButton from "@/components/SocialLoginButton";
import Input from "@/components/Input";

import { Lock, Mail, User } from "lucide-react";
import { BsGoogle } from "react-icons/bs";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signInWithGoogle, handleSignUpWithEmailAndPassword } =
    useContext(AuthContext);

  const validadeForm = (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    // Empty username
    if (username.trim() == "") {
      alert("Empty username");
      return false;
    }

    // Different password
    if (password != confirmPassword) {
      alert("Repeat the same password");
      return false;
    }

    return true;
  };

  return (
    <main className="min-h-screen w-screen flex items-center justify-center gap-16 px-[5%] dark:bg-gray-900">
      <div className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 p-8 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8">SignUp Page</h1>

        <form
          action="#"
          className="flex flex-col items-center gap-2"
          onSubmit={async (e) => {
            e.preventDefault();

            const isFormValid = validadeForm(
              username,
              password,
              confirmPassword
            );

            if (isFormValid) {
              try {
                await handleSignUpWithEmailAndPassword(
                  email,
                  password,
                  username
                );
              } catch (error) {
                console.log(error);
              }
            }
          }}
        >
          <Input
            icon={<User className="h-4 text-gray-500" />}
            id="username"
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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

          <Input
            icon={<Lock className="h-4 text-gray-500" />}
            id="confirm-password"
            type="password"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="w-full text-white bg-violet-500 mt-3 px-4 py-2 rounded-lg transition-all hover:tracking-wider">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center leading-10">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-violet-500">
            Log In
          </Link>
        </p>

        <div className="flex items-center">
          <div className="h-[1px] w-full bg-zinc-500"></div>
          <span className="mx-4 leading-10">or</span>
          <div className="h-[1px] w-full bg-zinc-500"></div>
        </div>

        <SocialLoginButton
          icon={<BsGoogle />}
          text={"Sign in With Google"}
          onClick={signInWithGoogle}
        />
      </div>
    </main>
  );
}
