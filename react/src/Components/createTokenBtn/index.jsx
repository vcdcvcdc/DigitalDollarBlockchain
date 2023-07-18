import { useContext } from "react";
import contract from "../../data/contracts.json";
import createTokenABI from "../../data/ABI/tokenFactory.json";
import useWWTransaction from "../../hooks/useWWTransaction";
import WWDetailsContext from "../../contexts/wwDetailsContext";
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
      (supply * 10 ** 18).toString() ? (supply * 10 ** 18).toString() : 2,
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
              "transaaaaaaaaaactionnnnnnnnnnn",
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
