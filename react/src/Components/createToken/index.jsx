import React, { useState } from "react";

const CreateToken = () => {
  const [amount, setAmount] = useState("");
  const [symbol, setSymbol] = useState("");

  return (
    <div>
      <h3 className="pt-5">Create Your Custom Token on DDBC</h3>
      {/* <p className=" m-auto py-3 px-5">
        After you have created your token on the DDBC, you can import your token
        to the WealthWallet and start testing your token.
      </p> */}

      <div className="container">
        <div className="row pt-3">
          <div className="col-md-6 col-12">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => {
                const inputAmount = e.target.value;
                if (inputAmount >= 0) {
                  setAmount(inputAmount);
                }
              }}
            />
          </div>
          <div className="col-md-6 col-12">
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

      <div className="py-3">
        <button class="button-submit">Create</button>
      </div>
    </div>
  );
};

export default CreateToken;
