export const getWalletAddress = async () => {
  const ethereum = window.ethereum;
  if (!ethereum) {
    alert("MetaMask not installed");
    return null;
  }

  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];

    return address;
  } catch (error: Error | any) {
    alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
  }
};

export const getSignature = async (message: string) => {
  const ethereum = window.ethereum;
  if (!ethereum) {
    alert("MetaMask not installed");
    return null;
  }

  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];

    const signature = await ethereum.request({
      method: "personal_sign",
      params: [message, address],
    });

    return signature;
  } catch (error: Error | any) {
    alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
  }
}
  
declare global {
  interface Window {
    ethereum: any;
  }
}