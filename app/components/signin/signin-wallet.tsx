"use client";

import React, { useState } from "react";
import {
  selectCurrentNonce,
  selectSignature,
  selectWalletAddress,
  signInWithWalletAsync,
} from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CSSProperties } from "react";

export default function SignInWallet() {
  const dispatch = useAppDispatch();
  const walletAddress = useAppSelector(selectWalletAddress);
  const currentNonce = useAppSelector(selectCurrentNonce);
  const signature = useAppSelector(selectSignature);

  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      if (!walletAddress) {
        setError("Wallet address is not available.");
        return;
      }
      if (!currentNonce) {
        setError("Nonce is not available.");
        return;
      }
      if (!signature) {
        setError("Signature is not available.");
        return;
      }
      const data = {
        signature: signature,
        publicAddress: walletAddress,
        nonce: currentNonce,
        chainId: 1,
      };
      dispatch(signInWithWalletAsync(data));
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={handleSignIn} style={buttonStyle}>
        Sign in with Wallet
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
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
