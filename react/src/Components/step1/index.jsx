import React from "react";
import WealthWalletSDK from "../WealthWallet";

const Step1 = () => {
  return (
    <div>
      <h3 className="pt-3">Connect / Create a WealthWallet Now</h3>
      <p>
        For a fully automated KYC process, and KARMA/gas receival click on the
        Wallet below to start
      </p>
      <div className="pt-5">
        <WealthWalletSDK />
      </div>
    </div>
  );
};

export default Step1;
