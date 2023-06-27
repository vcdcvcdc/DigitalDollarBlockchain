import React, { useState } from "react";
import { useWakeLock } from "use-wake-lock";
import "./dist/App.css";
import Player from "./Components/Player";
import WWDetailsContext from "./contexts/wwDetailsContext";
import SuccessContext from "./contexts/successContext";

const App = (props) => {
  const { toggleWakeLock } = useWakeLock();
  const [wwDetails, setWwDetails] = useState();
  const [successPopup, setSuccessPopup] = useState(false);

  return (
    <>
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
    </>
  );
};

export default App;
