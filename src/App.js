import React from 'react';
import { useWakeLock } from "use-wake-lock";
import './App.css';
import Player from './Components/Player';

const App = (props) => {
  const { toggleWakeLock, wakeLockActive } = useWakeLock();
  return (
    <>
      <Player toggleWakeLock={toggleWakeLock}/>
    </>
  );
}

export default App;
