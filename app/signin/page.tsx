import ConnectWallet from "../components/get-info/connect-wallet";
import SignInGoogle from "../components/signin/signin-google";
import SignInWalletForm from "../components/signin/signin-wallet";

export default function SigninPage() {
  return (
    <>
      <h1>Sign in with wallet</h1>
      <SignInWalletForm />
      <h1>Sign in with Google</h1>
      <SignInGoogle />
    </>
  );
}
