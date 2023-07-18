import { useContext } from "react";
import Web3 from "web3";
import WWDetailsContext from "../../contexts/wwDetailsContext";
import WWInstanceContext from "../../contexts/wwInstanceContext";

function useWWTransaction(contractAddress, contractAbi, functionName, args) {
  const { wwDetails } = useContext(WWDetailsContext);
  const { wwInstance } = useContext(WWInstanceContext);

  const value = 0;

  const web3 = new Web3(wwDetails?.provider);
  const contract = new web3.eth.Contract(
    JSON.parse(JSON.stringify(contractAbi)),
    contractAddress
  );
  const data = contract?.methods[functionName](...args)?.encodeABI();

  async function writeWWTransaction(redirectUrl) {
    const tx = await wwInstance?.sendTransaction(
      {
        chainId: process.env.REACT_APP_CHAIN_ID,
        token: wwDetails?.linkToken,
        refreshToken: wwDetails?.refreshToken,
        transactionObject: {
          to: contractAddress,
          value: value, // only for payable methods
          data,
          isTransfer: false, // (default: true) send true only if the call is an erc20 transfer
          abi: contractAbi, // (optional) only needed if you want to comvert the data to human readable form
        },
      },

      (txDetails, error) => {
        if (error) {
          throw new Error(`Error occured, ${error}, ${txDetails}`);
        }
        if (txDetails.transactionHash) {
          console.log("🚀 ~ txnDetails:", txDetails);
        }
        console.log("txDetails", txDetails);
        console.log("error", error);

        console.log(
          "https://evm.explorer.ddbc.dev/tx/" + txDetails?.transactionHash
        );
      }
    );
    console.log(tx, "data");
    console.log(wwInstance, "wwInstance");

    // const receipt = await wwInstance?.awaitTransactionMined(
    //   tx?.transactionHash
    // );
    // console.log(receipt, "receipt");

    return "";
  }

  return { writeWWTransaction };
}

export default useWWTransaction;
