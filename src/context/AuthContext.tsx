"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/service/firebase";

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => void;
  handleSignInWithEmailAndPassword: (email: string, password: string) => void;
  handleSignUpWithEmailAndPassword: (
    email: string,
    password: string,
    username: string
  ) => void;
  handleResetPassword: (email: string) => void;
  logOut: () => void;
  loadingUserState: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUserState, setLoadingUserState] = useState(true);
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

        // console.log(user);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/invalid-login-credentials") {
          return alert("Invalid login credentials");
        }

        if (errorCode === "auth/invalid-email") {
          return alert("Invalid Email");
        }

        if (errorCode === "auth/missing-password") {
          return alert("Missing password");
        }

        if (errorCode === "auth/network-request-failed") {
          return alert("Network Request Failed");
        }

        alert(`"Error: " ${errorMessage}`);
      });
  };

  const handleSignUpWithEmailAndPassword = (
    email: string,
    password: string,
    username: string
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const defaultPhotoURL =
          "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";

        if (auth.currentUser != null) {
          updateProfile(auth.currentUser, {
            displayName: username,
            photoURL: defaultPhotoURL,
          });
          // .then(() => console.log("Account Created: ", username, email));
        }
      })
      .catch((error) => {
        if (error) {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === "auth/email-already-in-use") {
            return alert("Email already in use");
          }

          if (errorCode === "auth/invalid-email") {
            return alert("Invalid email");
          }

          if (errorCode === "auth/weak-password") {
            return alert("Weak password");
          }

          if (errorCode === "auth/missing-email") {
            return alert("Missing email");
          }

          if (errorCode === "auth/missing-password") {
            return alert("Missing password");
          }

          if (errorCode === "auth/network-request-failed") {
            return alert("Network Request Failed");
          }

          alert(`"Error: " ${errorMessage}`);
        }
      });
  };

  const handleResetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("A password reset link has been sent to your email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/invalid-email") {
          return alert("Invalid Email");
        }

        if (errorCode === "auth/missing-email") {
          return alert("Missing Email");
        }

        if (errorCode === "auth/network-request-failed") {
          return alert("Network Request Failed");
        }

        alert(`Error: ${errorMessage}`);
      });
  };

  const logOut = () => {
    setLoadingUserState(true);
    signOut(auth);

    // console.log("USER AFTER LOGOUT:", user);
    router.push("/login");
  };

  const userStateChanged = useCallback(
    (currentUser: User | null) => {
      // console.log("USER STATE CHANGED", currentUser);

      setUser(currentUser);

      if (!currentUser) {
        router.push("/login");
      } else {
        router.push("/");
        setLoadingUserState(false);
      }
    },
    [router]
  );

  useEffect(() => {
    // console.log("USE EFFECT");

    setLoadingUserState(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      userStateChanged(user);
    });
    // console.log("RENDER AUTH STATE");

    return () => unsubscribe();
  }, [router, userStateChanged]);

  // console.log({ loadingUserState });

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        handleSignInWithEmailAndPassword,
        handleSignUpWithEmailAndPassword,
        handleResetPassword,
        logOut,
        loadingUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
