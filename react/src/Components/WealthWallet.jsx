import React, { useContext } from "react";
import { WealthWallet } from "wealth-wallet-sdk";
import { useEffect, useState, useMemo } from "react";
import WWDetailsContext from "../contexts/wwDetailsContext";

import wwIcon from "../images/WW_icon.svg";
import wwIconBorder from "../images/WW_icon_with_border.svg";

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
            <span
              className="btn btn-primary bg-orange pointer"
              onClick={() =>
                wealthWallet.openWallet({
                  chainId: process.env.REACT_APP_CHAIN_ID,
                  token: wwDetails?.linkToken,
                })
              }
            >
              <img src={wwIconBorder} alt="OPEN WALLET" />
            </span>
          </>
        </>
      ) : (
        <span
          className="btn btn-primary bg-orange pointer"
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
          <img
            src={wwIcon}
            alt="CONNECT WALLET"
          />
        </span>
      )}
    </>
  );
}

export default WealthWalletSDK;
