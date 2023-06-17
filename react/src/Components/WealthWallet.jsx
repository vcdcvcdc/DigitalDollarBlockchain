import React, { useContext } from "react";
import { WealthWallet } from "wealth-wallet-sdk";
import { useEffect, useState, useMemo } from "react";
import WWDetailsContext from "../contexts/wwDetailsContext";
// import WWInstanceContext from "../../contexts/wwInstanceContext";

function WealthWalletSDK({ options }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const { wwDetails, setWwDetails } = useContext(WWDetailsContext);
  //   const { setWwInstance } = useContext(WWInstanceContext);
  const [wealthWallet, setWealthWallet] = useState(null);

  useEffect(() => {
    const tempWealthWallet = new WealthWallet();
    tempWealthWallet.initialize(
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
    // setWwInstance(tempWealthWallet);
    setWealthWallet(tempWealthWallet);
  }, []);

  useEffect(() => {
    console.log(wwDetails, "wwDetails");
  }, [wwDetails]);
  return (
    <>
      {walletConnected ? (
        <>
          <>
            <button
              className="btn btn-primary bg-orange"
              // onClick={() => openWallet()}
              onClick={() =>
                wealthWallet.openWallet({
                  chainId: process.env.REACT_APP_CHAIN_ID,
                  token: wwDetails?.linkToken,
                })
              }
            >
              Open Wallet
            </button>
          </>
        </>
      ) : (
        <button
          className="btn btn-primary bg-orange"
          onClick={() =>
            wealthWallet?.connectWallet(
              (details) => {
                setWwDetails(details);
                setWalletConnected(true);
              },
              () => {
                setWalletConnected(false);
              },
              {
                chainId: process.env.REACT_APP_CHAIN_ID,
                appPubKey: process.env.REACT_APP_PUBLIC_KEY,
              }
            )
          }
        >
          Connect
        </button>
      )}
    </>
  );
}

export default WealthWalletSDK;
