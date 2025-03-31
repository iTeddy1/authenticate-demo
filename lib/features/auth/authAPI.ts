const BASE_URL = process.env.NEXT_PUBLIC_FIREBASE_API_URL;

export interface WalletSigninDto {
  signature: string;
  nonce: string;
  publicAddress: string;
  chainId: number;
}

export interface GoogleSigninDto {
  token: string;
}

export const getSignMessage = async () => {
  const response = await fetch(`${BASE_URL}/auth/sign-message`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(res => res.json());
  console.log(response);
  return response;
};

export const signInWithWallet = async (request: WalletSigninDto) => {
  const response = await fetch(`${BASE_URL}/auth/sign-in/wallet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(request),
  }).then(res => res.json());
  console.log(response);
  return response;
};

export const signInWithGoogle = async (request: GoogleSigninDto) => {
  const response = await fetch(`${BASE_URL}/auth/sign-in/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(request),
  }).then(res => res.json());
  return response;
};

const authAPI = {
  getSignMessage,
  signInWithWallet,
  signInWithGoogle,
};

export default authAPI;
