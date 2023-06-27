import React, { useState } from "react";
import { useWakeLock } from "use-wake-lock";
import "./dist/App.css";
import Player from "./Components/Player";
import WWDetailsContext from "./contexts/wwDetailsContext";

const App = (props) => {
  const { toggleWakeLock } = useWakeLock();
  const [wwDetails, setWwDetails] = useState();

  return (
    <>
      <WWDetailsContext.Provider
        value={{
          wwDetails: wwDetails,
          setWwDetails: setWwDetails,
        }}
      >
        <Player toggleWakeLock={toggleWakeLock} />
      </WWDetailsContext.Provider>
    </>
  );
};

export default App;
