import React from 'react';
import WealthWalletSDK from '../WealthWallet';

const Step1 = () => {
    return (
        <div>
            <h3>Create/Connect your wallet</h3>
            <p>For a fully automated KYC process, and KARMA/gas receival </p>
            <div className="pt-5">
                <WealthWalletSDK />
            </div>

        </div >
    );
}

export default Step1;

