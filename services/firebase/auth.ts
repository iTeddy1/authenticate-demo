import { auth, provider } from "./firebase";

export const signInWithGoogle = async () => {
  try {
    // Sign in with Google popup
    const result = await auth.signInWithPopup(provider);
    
    // Get the idToken from the result
    const idToken = await result?.user?.getIdToken();
    
    console.log("idToken:", idToken); // For debugging
    return idToken; // Return it to use elsewhere
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error; // Handle the error as needed
  }
};
export const signOutWithGoogle = async () => auth.signOut();
export const getCurrentUserToken = async () => await auth.currentUser?.getIdToken(true);
