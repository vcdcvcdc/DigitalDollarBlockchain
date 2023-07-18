import React, { useState } from "react";
import { useWakeLock } from "use-wake-lock";
import "./dist/App.css";
import "./dist/custom.css";
import Player from "./Components/Player";
import WWDetailsContext from "./contexts/wwDetailsContext";
import SuccessContext from "./contexts/successContext";
import WWInstanceContext from "./contexts/wwInstanceContext";

const App = (props) => {
  const { toggleWakeLock } = useWakeLock();
  const [wwDetails, setWwDetails] = useState();
  const [wwInstance, setWwInstance] = useState();
  const [successPopup, setSuccessPopup] = useState(false);

  return (
    <>
      <WWInstanceContext.Provider
        value={{
          wwInstance: wwInstance,
          setWwInstance: setWwInstance,
        }}
      >
        <WWDetailsContext.Provider
          value={{
            wwDetails: wwDetails,
            setWwDetails: setWwDetails,
          }}
        >
          <SuccessContext.Provider
            value={{
              successPopup: successPopup,
              setSuccessPopup: setSuccessPopup,
            }}
          >
            <Player toggleWakeLock={toggleWakeLock} />
          </SuccessContext.Provider>
        </WWDetailsContext.Provider>
      </WWInstanceContext.Provider>
    </>
  );
};

export default App;
