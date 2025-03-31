'use client'

import { selectAccountInformation } from "@/lib/features/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";

export default function DetailsPage() {
  const account = useAppSelector(selectAccountInformation)
  if (!account) {
    return <h1>You haven't login</h1>;
  }
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "left",

    }}>
      <h1>Wallet details</h1>
      <p>Signature: {account.signature}</p>
      <p>Public Address: {account.publicAddress}</p>
      <p>Nonce: {account.nonce}</p>
      <p>Access Token: {account.accessToken}</p>
      <p>Xrip: {account.xrip}</p>
      <p>Device ID: {account.deviceId}</p>
    </div>
  );
}
