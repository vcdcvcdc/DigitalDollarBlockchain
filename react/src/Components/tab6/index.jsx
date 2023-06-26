import React, { useEffect, useState } from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";
import Typist from "react-typist";
import Step6 from "../step6";

function Tab6() {
  return (
    <Animator>
      <div className="text-box" id="login">
        <div className="scroll-content">
          <svg viewBox="0 -20 1320 70">
            <text x="50%" y="50%" textAnchor="middle">
              Testing Contracts:
            </text>
          </svg>
          <Step6 />
        </div>
      </div>
    </Animator>
  );
}

export default Tab6;
