import React, { useContext } from "react";
import { Animator } from "@arwes/react-animator";
import WWDetailsContext from "../../contexts/wwDetailsContext";
import Step1 from "../step1";
import Step2 from "../step2";
import Step6 from "../step6";
import CreateToken from "../createToken";
import MintNft from "../mintNft";
import WealthWalletSDK from "../WealthWallet";

function Tab5() {
  const { wwDetails } = useContext(WWDetailsContext);
  return (
    <>
      {wwDetails ? (
        <>
          <Animator>
            <div className="text-box " id="login">
              <div className="scroll-content">
                <svg viewBox="0 -20 1320 70">
                  <text x="50%" y="50%" textAnchor="middle">
                    Testing Contracts:
                  </text>
                </svg>
                <MintNft />
                <CreateToken />
                {/* <Step6 /> */}
              </div>
              <div className="open-ww">
                <WealthWalletSDK />
              </div>
            </div>
          </Animator>
        </>
      ) : (
        <>
          <Animator>
            <div className="text-box tab-center" id="login">
              <div className="scroll-content">
                <svg viewBox="0 -20 1320 70">
                  <text x="50%" y="50%" textAnchor="middle">
                    Testing DDBC:
                  </text>
                </svg>
                <Step1 />
                <Step2 />
              </div>
            </div>
          </Animator>
        </>
      )}
    </>
  );
}

export default Tab5;
