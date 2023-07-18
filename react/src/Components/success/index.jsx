import React, { useState, useContext } from "react";
import "../success/dist/success.css";
import SuccessContext from "../../contexts/successContext";
function Success() {
  const { setSuccessPopup } = useContext(SuccessContext);

  return (
    <>
      <div className="popup">
        <div className="popup-content">
          <div
            className="close-btn pointer pr-5 pt-4"
            onClick={() => setSuccessPopup(false)}
          >
            Close
          </div>
          <div className="yas5">
            <div className="All">
              <svg className="svgWrapper">
                <path
                  d="M196.6,27.6C179.1,18.3,159.2,13,138,13C69,13,13,69,13,138s56,125,125,125s125-56,125-125 c0-8.5-0.9-16.8-2.5-24.9"
                  className="circleGray"
                ></path>
                <path
                  d="M196.6,27.6C179.1,18.3,159.2,13,138,13C69,13,13,69,13,138s56,125,125,125s125-56,125-125 c0-8.5-0.9-16.8-2.5-24.9"
                  className="circleLightBlue"
                ></path>
                <path
                  d="M196.6,27.6C179.1,18.3,159.2,13,138,13C69,13,13,69,13,138s56,125,125,125s125-56,125-125 c0-8.5-0.9-16.8-2.5-24.9"
                  className="circleDarkBlue"
                ></path>
                <polyline
                  points="72.5,123.5 131.5,179.5 284.5,18.5"
                  className="tick-gray"
                ></polyline>
                <polyline
                  points="72.5,123.5 131.5,179.5 284.5,18.5"
                  className="tick-B"
                ></polyline>
                <polyline
                  points="72.5,123.5 131.5,179.5 284.5,18.5"
                  className="tickC"
                ></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
