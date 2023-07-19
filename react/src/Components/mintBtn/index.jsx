import { useEffect } from "react";
import mintAbi from "../../data/ABI/mint.json";
import useWWTransaction from "../../hooks/useWWTransaction";

const MintBtn = (props) => {
  const { metadata, contractAddress, wwDetails } = props;

  const { writeWWTransaction } = useWWTransaction(
    contractAddress
      ? contractAddress
      : "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    mintAbi ? mintAbi : "abi",
    "mint",
    [
      wwDetails?.userAddress
        ? wwDetails?.userAddress
        : "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      metadata ? metadata : "metadata",
    ]
  );
  useEffect(() => {
    console.log(contractAddress, "contractAddress");
  }, [contractAddress]);

  return (
    <div>
      <button
        className="button-submit"
        disabled={!writeWWTransaction}
        onClick={async () => {
          console.log("transaaaaaaaaaactionnnnnnnnnnn", writeWWTransaction?.());
        }}
      >
        Mint
      </button>
    </div>
  );
};

export default MintBtn;
