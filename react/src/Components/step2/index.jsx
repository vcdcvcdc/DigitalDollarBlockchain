import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import WWDetailsContext from "../../contexts/wwDetailsContext";
import SuccessContext from "../../contexts/successContext";
import Success from "../success";

const Step2 = () => {
  const { wwDetails } = useContext(WWDetailsContext);
  const { successPopup, setSuccessPopup } = useContext(SuccessContext);
  // const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    if (wwDetails?.userAddress) {
      checkAccountStatus(wwDetails?.userAddress);
    }
  }, [wwDetails?.userAddress]);

  function checkAccountStatus(address) {
    const url = "https://backend.ddbc.dev/api/v1/account/get_all";

    axios
      .get(url)
      .then((response) => {
        const item = response?.data?.data?.find(
          (item) => item.address === address
        );

        if (item?.status === 1) {
        } else {
          addAccountKyc(address);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        // Handle any errors here
      });
  }

  function addAccountKyc(address) {
    const url = `https://backend.ddbc.dev/api/v1/account/add/${address}`;

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
    const foundItem = arr?.find((item) => item?.address === targetAddress);
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
        console.log("accept account congrats", response);
        // alert("Congratulations! You have been whitelisted!");
        setSuccessPopup(true);
        // Handle the response here
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        // Handle any errors here
      });
  }

  return <></>;
};

export default Step2;
