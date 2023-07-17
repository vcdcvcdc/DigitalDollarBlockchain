import React, { useState } from "react";
import ddbc from "../../images/logo.jpeg";

const MintNft = () => {
  return (
    <div>
      <h3 className="pt-3">Mint Your First NFT on DDBC</h3>

      <div className="text-center pt-3">
        <img className="ddbc-mint" src={ddbc} />
      </div>

      <div className="py-3">
        <button className="button-submit">Mint</button>
      </div>
    </div>
  );
};

export default MintNft;
