"use client";

import { getWalletAddressAsync } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { CSSProperties, useCallback } from "react";
import styles from "./Counter.module.css";

export default function ConnectWallet() {
  const dispatch = useAppDispatch()
  return (
    <>
      <button className={styles.button} onClick={()=> dispatch(getWalletAddressAsync())}>
        Connect to MetaMask
      </button>
    </>
  );
}

