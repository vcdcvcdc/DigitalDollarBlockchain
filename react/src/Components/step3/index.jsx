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
        getAllAccounts();
        // Handle the response here
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        // Handle any errors here
      });
  }

  function getAllAccounts() {
    const url = "https://backend.ddbc.dev/api/v1/account/get_all";

    axios
      .get(url)
      .then((response) => {
        console.log("Request successful", response?.data?.data);
        // Handle the response here
        const item = findItemWithAddress(
          response?.data?.data,
          wwDetails?.userAddress
        );
        console.log(item, "item");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        // Handle any errors here
      });
  }

  function findItemWithAddress(arr, targetAddress) {
    const foundItem = arr.find((item) => item.address === targetAddress);
    if (foundItem) {
      acceptAccount(foundItem);
      return foundItem;
    }

    return null; // If no item with the specified address is found
  }

  function acceptAccount(foundItem) {
    const url = `https://backend.ddbc.dev/api/v1/account/update/${foundItem?.id}`;
    const data = {
      status: 1, //-1 for rejected
    };

    axios
      .post(url, data)
      .then((response) => {
        console.log("accept account", response);
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
