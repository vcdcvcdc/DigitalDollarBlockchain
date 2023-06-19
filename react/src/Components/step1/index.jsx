import React from 'react';
import WealthWalletSDK from '../WealthWallet';

const Step1 = () => {
    return (
        <div>
            <h3>Step 1</h3>
            <p>
                {" "}
                Establish a Connection with an EVM Wallet: Initiate
                your DDBC testing by connecting with an EVM Wallet
                using the details below:
            </p>
            <p>
                EVM RPC:{" "}
                <a href="https://ddbc.dev ">https://ddbc.dev </a>
                <br />
                ChainID: 7777
                <br />
                Token: Karma
                <br />
                EVM Explorer:{" "}
                <a href="https://evm.explorer.ddbc.dev">
                    https://evm.explorer.ddbc.dev
                </a>
                <br />
                Establish a Connection with a Cosmos Wallet:
                <br />
                To connect with a Cosmos Wallet, use the information
                provided below:
                <br />
                <WealthWalletSDK />
            </p>
            <p>
                COSMOS RPC:{" "}
                <a href="http://3.137.200.25:26657 ">
                    http://3.137.200.25:26657
                </a>{" "}
                (visit this link, and it will auto-load in Keplr with
                a connected wallet) <br />
                Cosmos Explorer:
                <a href="https://ibc.explorer.ddbc.dev">
                    https://ibc.explorer.ddbc.dev
                </a>
            </p>
        </div>
    );
}

export default Step1;

