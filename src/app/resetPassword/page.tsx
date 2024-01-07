"use client";
import Input from "@/components/Input";
import SocialLoginButton from "@/components/SocialLoginButton";
import { AuthContext } from "@/context/AuthContext";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { BsGoogle } from "react-icons/bs";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const { signInWithGoogle, handleResetPassword } = useContext(AuthContext);

  return (
    <main className="min-h-screen w-screen flex items-center justify-center gap-16 px-[5%] dark:bg-gray-900">
      <div className="w-full max-w-sm flex flex-col bg-gray-200 dark:bg-gray-800 p-8 rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Change Password</h1>
        <div className="rounded-full mx-auto border-2 border-white">
          <Lock className="h-8 w-8 m-4" />
        </div>
        <p className="text-center py-4">
          Enter the email associated with your account to change your password.
        </p>
        {/* <p className="text-center py-4">
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </p> */}
        <form
          action="#"
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword(email);
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

          <button className="w-full text-white bg-blue-500 px-4 py-2 rounded-lg transition-all hover:tracking-wider">
            Send Email
          </button>
        </form>

        <div className="w-full flex items-center">
          <div className="h-[1px] w-full bg-zinc-500"></div>
          <span className="mx-4 leading-10">or</span>
          <div className="h-[1px] w-full bg-zinc-500"></div>
        </div>

        <SocialLoginButton
          icon={<BsGoogle />}
          text={"Sign in With Google"}
          onClick={signInWithGoogle}
        />

        <Link
          href="login"
          className="w-8/12 mt-8 mx-auto flex items-center justify-center gap-2 ring ring-blue-500/50 px-4 py-2 rounded-lg transition-all hover:tracking-wider"
        >
          Back to login
        </Link>
      </div>
    </main>
  );
}
