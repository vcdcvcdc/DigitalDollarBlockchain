import React, { useEffect } from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";
import Typist from "react-typist";

function Tab1() {
  //   useEffect(() => {
  //     const audio = new Audio("https://next.arwes.dev/assets/sounds/type.webm");
  //     audio.play();

  //     return () => {
  //       audio.pause();
  //       audio.currentTime = 0;
  //     };
  //   }, []);

  //   const handleTypingDone = () => {
  //     const audio = new Audio("https://next.arwes.dev/assets/sounds/type.webm");
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };

  return (
    <Animator>
      <div className="text-box" id="finance">
        <div className="scroll-content">
          <svg viewBox="0 -20 1320 150">
            <text x="50%" y="30%" textAnchor="middle">
              Transforming Finance:
            </text>
            <text x="50%" y="80%" textAnchor="middle">
              Digital Dollar Blockchain
            </text>
          </svg>
          <Text as="p" style={{ color: "#ddd" }}>
            {/* <Typist avgTypingDelay={20} onTypingDone={handleTypingDone}> */}
            The Digital Dollar Blockchain Corporation (DDBC) is rewriting the
            narrative of financial technology, pioneering an integration with
            the digital universe. Our cutting-edge blockchain, crafted for
            optimum security, lucidity, and ease of access, revolutionizes
            digital currency transactions, making them as simple as sending a
            text. Our primary offering, the Digital Dollar (DD), offers the
            constancy of the USD within the digital world, redefining the
            dynamics of digital currencies. Experience the evolution of
            finance-- amplified.
            {/* </Typist> */}
          </Text>
        </div>
      </div>
    </Animator>
  );
}

export default Tab1;
