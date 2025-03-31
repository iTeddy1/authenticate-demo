"use client";

import React, { useEffect, useState } from "react";
import { selectCurrentNonce, signInWithGoogleAsync, signInWithWalletAsync } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CSSProperties } from "react";
import firebase from "firebase/compat/app";
import { getCurrentUserToken, signInWithGoogle } from "@/services/firebase/auth";

export default function SignInGoogle() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const [user, setUser] = useState<any>(null);

  // Handle the full sign-in flow
  const handleSignIn = async () => {
    setError(null); // Clear previous errors
    try {
      const token = await signInWithGoogle();
      if (!token) {
        throw new Error("Token is not available.");
      }
      const data = { token };
      dispatch(signInWithGoogleAsync(data)); // Dispatch to Redux
    } catch (err: any) {
      const errorMessage = err.message || "An unknown error occurred";
      console.error("Sign-in error:", errorMessage);
      setError(errorMessage); // Show error to user
    }
  };

  return (
    <button style={buttonStyle} onClick={handleSignIn}>
      Sign in with Google
    </button>
  );
}

const buttonStyle: CSSProperties = {
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
  border: "none",
  backgroundColor: "#0070f3",
  color: "#fff",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
  transition: "background-color 0.3s",
};
