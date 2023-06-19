import React from 'react';

const Step3 = () => {
    return (
        <div>
            <h3>Step 3</h3>
            <p>
                KYC Part 1 (Automated Upon Launch): For testing
                purposes, apply the following command:
                <br />
                curl -X POST
                "https://backend.ddbc.dev/api/v1/account/add/address"
                <br />
                Note: Substitute &#123;address&#125; with your wallet
                address. If you prefer to avoid the command line, you
                can use https://reqbin.com/curl.
            </p>
        </div>
    );
}

export default Step3;

