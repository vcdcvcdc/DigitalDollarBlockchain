import React from "react";
import { Animator } from "@arwes/react-animator";
import ContactUs from "../contact-us";

function Tab6() {
  return (
    <Animator>
      <div className="text-box " id="login">
        <div className="scroll-content pt-md-5">
          <svg viewBox="0 -20 1320 70">
            <text x="50%" y="50%" textAnchor="middle">
              Contact Us
            </text>
          </svg>

          <ContactUs />
        </div>
      </div>
    </Animator>
  );
}

export default Tab6;
