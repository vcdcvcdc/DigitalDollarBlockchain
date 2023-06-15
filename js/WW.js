console.log("test11");
// const { WealthWallet } = require("wealth-wallet-sdk");

const wallet = new WealthWallet();
console.log(wallet, "WW");

window.onload = function () {
  wallet.initialize(
    "staging",
    (payload) => {
      // payload = {success: true, message: "Wallet has been initialized"}
      // payload = {success: false, message: "Wallet initialization failed"}
    },
    () => {
      console.log("wallet closed");
    },

    (linkToken, provider, userAddress) => {
      console.log({ linkToken, provider, userAddress });
    }
  );
  function connectWallet() {
    wallet?.connectWallet(
      (details) => {
        console.log(details, "details");
      },
      () => {
        console.log("wallet connection failed");
      },
      {
        chainId: process.env.REACT_APP_CHAIN_ID,
        appPubKey: process.env.REACT_APP_PUBLIC_KEY,
      }
    );
  }

  function openWallet() {
    wallet.openWallet({
      chainId: process.env.REACT_APP_CHAIN_ID,
      token: wwDetails?.linkToken,
    });
  }

  connectWallet();
};
