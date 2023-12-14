"use client";
import { createContext, ReactNode, useState, useEffect } from "react";
import { AuthContextProps } from "@/types";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../constants/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        router.push("/home");
        setLoading(false);
      } else {
        setUser(undefined);
        setLoading(false);
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleLogIn = async () => {
    setLoadingUser(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error) {
      alert(error);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleSignUp = async () => {
    setLoadingUser(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error) {
      alert(error);
    } finally {
      setLoadingUser(false);
    }
  };

  const googleSignUp = async () => {
    setLoadingUser(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/home");
    } catch (error) {
      alert(error);
    } finally {
      setLoadingUser(false);
    }
  };

  if (auth.currentUser) {
    console.log(auth.currentUser.email);
  } else {
    console.log("No user is currently signed in");
  }

  const handleSignOut = async () => {
    setLoadingUser(true);
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoadingUser(false);
    }
  };

  if (auth.currentUser) {
    console.log(auth.currentUser.email);
  } else {
    console.log("No user is currently signed in");
  }

  if (loadingUser) {
    return <Loading />;
  }

  if (loading) {
    return <Loading />;
  }
  const contextValue: AuthContextProps = {
    email,
    password,
    auth,
    setEmail,
    handleSignOut,
    setPassword,
    handleLogIn,
    handleSignUp,
    googleSignUp,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
