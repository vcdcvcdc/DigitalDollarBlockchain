import React from 'react';

const Step6 = () => {
    return (
        <div>
            <h3>Step 6</h3>
            <p>
                Initiate a contract. However, remember that it will
                not allow transactions until you execute the following
                command: <br />
                curl -X POST
                "https://backend.ddbc.dev/api/v1/account/add/&#123;contract&#125;"
            </p>
        </div>
    );
}

export default Step6;

