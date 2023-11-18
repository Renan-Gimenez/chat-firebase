"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/service/firebase";

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => void;
  handleSignInWithEmailAndPassword: (email: string, password: string) => void;
  logOut: () => void;
  loadingUserState: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUserState, setLoadingUserState] = useState(false);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      setLoadingUserState(true);
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      setUser(user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setLoadingUserState(false);
  };

  const handleSignInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setUser(user);

        console.log(user);
        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-login-credentials") {
          return alert("Invalid login credentials");
        }

        if (error.code === "auth/invalid-email") {
          return alert("Invalid Email");
        }

        console.log(error);
      });
  };

  const logOut = () => {
    signOut(auth);

    console.log("USER AFTER LOGOUT:", user);
    router.push("/login");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      router.push("/");
    });
    console.log("RENDER AUTH STATE");

    return () => unsubscribe();
  }, [router, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        handleSignInWithEmailAndPassword,
        logOut,
        loadingUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
