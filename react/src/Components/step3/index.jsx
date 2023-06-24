import React, { useState, useContext } from "react";
import axios from "axios";
import WWDetailsContext from "../../contexts/wwDetailsContext";

const Step2 = () => {
  const [address, setAddress] = useState("");
  const { wwDetails } = useContext(WWDetailsContext);

  function addAccountKyc() {
    const url =
      "https://backend.ddbc.dev/api/v1/account/add/" + wwDetails?.userAddress;

    axios
      .post(url)
      .then((response) => {
        console.log("Request successful");
        // Handle the response here
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        // Handle any errors here
      });
  }

  return (
    <div>
      <h3>Step 2</h3>
      <p>
        KYC Part 1 (Automated Upon Launch): For testing purposes, Paste your
        address here and click submit:
        <input
          type="text"
          placeholder="Enter your wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div
          className="pointer py-3"
          onClick={addAccountKyc}
          style={{ color: "#00ffc3" }}
        >
          Submit
        </div>
      </p>
    </div>
  );
};

export default Step2;
