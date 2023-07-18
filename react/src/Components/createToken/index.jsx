import React, { useState } from "react";
import CreateTokenBtn from "../createTokenBtn";

const CreateToken = () => {
  const [supply, setSupply] = useState("");
  const [symbol, setSymbol] = useState("");

  return (
    <>
      <div>
        <h3 className="pt-5">Create Your Custom Token on DDBC</h3>
        {/* <p className=" m-auto py-3 px-5">
        After you have created your token on the DDBC, you can import your token
        to the WealthWallet and start testing your token.
      </p> */}

        <div className="container">
          <div className="row pt-3">
            <div className="col-md-6 col-12 text-md-right">
              <input
                type="number"
                placeholder="Amount"
                value={supply}
                onChange={(e) => {
                  const inputAmount = e.target.value;
                  if (inputAmount >= 0) {
                    setSupply(inputAmount);
                  }
                }}
              />
            </div>
            <div className="col-md-6 col-12 text-md-left">
              <input
                type="text"
                placeholder="Symbol"
                value={symbol}
                maxLength="4"
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
          </div>
        </div>

        <CreateTokenBtn symbol={symbol} supply={supply} />
      </div>
    </>
  );
};

export default CreateToken;
