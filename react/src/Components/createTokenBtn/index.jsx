import { useContext } from "react";
import contract from "../../data/contracts.json";
import createTokenABI from "../../data/ABI/tokenFactory.json";
import useWWTransaction from "../../hooks/useWWTransaction";
import WWDetailsContext from "../../contexts/wwDetailsContext";
import { BigNumber } from "bignumber.js";

const CreateTokenBtn = (props) => {
  const { symbol, supply } = props;
  const { wwDetails } = useContext(WWDetailsContext);

  // Convert supply to a valid number before using it to create BigNumber
  const parsedSupply = supply ? parseFloat(supply) : 1000;

  const { writeWWTransaction } = useWWTransaction(
    contract.ddbc.tokenFactory ? contract.ddbc.tokenFactory : "",
    createTokenABI ? createTokenABI : "",
    "deploy20Contract",
    [
      "DDBC Test Token",
      symbol ? symbol : "",
      new BigNumber((parsedSupply * 10 ** 18).toString()),
      wwDetails?.userAddress
        ? wwDetails?.userAddress
        : "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    ]
  );

  return (
    <>
      <div className="py-3">
        <button
          disabled={!writeWWTransaction}
          className="button-submit"
          onClick={async () => {
            console.log("creating your token", writeWWTransaction?.());
          }}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateTokenBtn;
