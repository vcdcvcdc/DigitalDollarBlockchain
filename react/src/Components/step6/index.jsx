import React, { useState } from "react";
import axios from "axios";

const Step6 = () => {
  const [address, setAddress] = useState("");

  function addContractKyc(address) {
    if (address === "") {
      alert("Please enter a valid contract address");
    } else {
      const url = `https://backend.ddbc.dev/api/v1/account/add/${address}`;
      axios
        .post(url)
        .then((response) => {
          console.log("Contract successfully added");
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          // Handle any errors here
        });
    }
  }

  return (
    <div>
      <h3 className="pt-3">Contract Whitelisting</h3>
      <p className=" m-auto py-3 px-5">
        Contract whitelisting process, made easy for testing purposes, Paste
        your Deployed Contract address here and click submit:
      </p>

      <input
        type="text"
        placeholder="Enter your Contract address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="py-3">
        <button className="button-submit">Submit</button>
      </div>
    </div>
  );
};

export default Step6;
