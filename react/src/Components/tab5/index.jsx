import React, { useEffect, useState } from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";
import Typist from "react-typist";
import Step1 from "../step1";
import Step2 from "../step2";

function Tab5() {
  return (
    <Animator>
      <div className="text-box tab-center" id="login">
        <div className="scroll-content">
          <svg viewBox="0 -20 1320 70">
            <text x="50%" y="50%" textAnchor="middle">
              Testing DDBC:
            </text>
          </svg>
          <Step1 />
          <Step2 />
        </div>
      </div>
    </Animator>
  );
}

export default Tab5;
