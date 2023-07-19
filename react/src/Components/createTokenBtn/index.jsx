import { useContext } from "react";
import contract from "../../data/contracts.json";
import createTokenABI from "../../data/ABI/tokenFactory.json";
import useWWTransaction from "../../hooks/useWWTransaction";
import WWDetailsContext from "../../contexts/wwDetailsContext";
import { BigNumber } from "bignumber.js";

const CreateTokenBtn = (props) => {
  const { symbol, supply } = props;
  const { wwDetails } = useContext(WWDetailsContext);

  const { writeWWTransaction } = useWWTransaction(
    contract.ddbc.tokenFactory ? contract.ddbc.tokenFactory : "",
    createTokenABI ? createTokenABI : "",
    "deploy20Contract",
    [
      "DDBC Test Token",
      symbol ? symbol : "",
      new BigNumber((supply * 10 ** 18).toString() ? (supply * 10 ** 18).toString() : (1000 * 10 ** 18).toString()),
      wwDetails?.userAddress ? wwDetails?.userAddress : "",
    ]
  );

  return (
    <>
      <div className="py-3">
        <button
          disabled={!writeWWTransaction}
          className="button-submit"
          onClick={async () => {
            console.log(
              "creating your token",
              writeWWTransaction?.()
            );
          }}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateTokenBtn;
