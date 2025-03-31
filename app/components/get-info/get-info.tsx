"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "./Counter.module.css";
import {
  getSignatureAsync,
  getSignMessageAsync,
  selectCurrentNonce,
  selectMessage,
  selectSignature,
  selectWalletAddress,
} from "@/lib/features/auth/authSlice";
import ConnectWallet from "./connect-wallet";

export const GetInfo = () => {
  const dispatch = useAppDispatch();
  const walletAddress = useAppSelector(selectWalletAddress);
  const currentNonce = useAppSelector(selectCurrentNonce);
  const signature = useAppSelector(selectSignature);
  const message = useAppSelector(selectMessage);

  return (
    <div>
      <h1 className={styles.title}>Click here to connect to wallet</h1>
      <ConnectWallet />
      {walletAddress && <h2>Wallet Address: {walletAddress}</h2>}
      <h1 className={styles.title}>Click here to get message + nonce</h1>
      <button className={styles.button} onClick={() => dispatch(getSignMessageAsync())}>
        Click me
      </button>
      {message && <h2>Message: {message}</h2>}
      {currentNonce && <h2>Nonce: {currentNonce}</h2>}

      {message && (
        <>
          <h1 className={styles.title}>Click here to sign message</h1>
          <button className={styles.button} onClick={() => dispatch(getSignatureAsync(message))}>
            Click me
          </button>
        </>
      )}
      {signature && <h2>Signature: {signature}</h2>}
    </div>
  );
};
