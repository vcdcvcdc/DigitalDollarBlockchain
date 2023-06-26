//create a new component called ContentTabs
import React, { useState } from "react";
//import the css file
import "../contentTabs/dist/contentTabs.css";

import DescriptionSection from "../descriptionSection";
import HeaderMenu from "../headerMenu";
import { createBleepsManager } from "@arwes/bleeps";

//create a new component called ContentTabs
const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const playSound = () => {
    const audio = new Audio("https://next.arwes.dev/assets/sounds/click.mp3");
    audio.play();
  };

  return (
    <>
      <div></div>
      <section id="header">
        <div className="wrap">
          <div className="ui-inner-border t"></div>
          <div className="header-tabs text-center">
            <div className="row">
              <div className="col">
                <div
                  className="pointer"
                  onClick={() => {
                    playSound();
                    setActiveTab("tab1");
                  }}
                >
                  test 1
                </div>
              </div>
              <div className="col">
                <div
                  className="pointer"
                  onClick={() => {
                    setActiveTab("tab2");
                    playSound();
                  }}
                >
                  test 2
                </div>
              </div>
              <div className="col">
                <div
                  className="pointer"
                  onClick={() => {
                    setActiveTab("tab3");
                    playSound();
                  }}
                >
                  test 3
                </div>
              </div>
            </div>
          </div>
          <div className="ui-grid">
            <div className="ui-box">
              <div className="text-container">
                <svg>
                  <symbol id="s-text">
                    <text textAnchor="middle" x="50%" y="80%">
                      Digital Dollar
                    </text>
                  </symbol>
                  <g className="g-ants">
                    <use xlinkHref="#s-text" className="text-copy"></use>
                    <use xlinkHref="#s-text" className="text-copy"></use>
                    <use xlinkHref="#s-text" className="text-copy"></use>
                    <use xlinkHref="#s-text" className="text-copy"></use>
                    <use xlinkHref="#s-text" className="text-copy"></use>
                  </g>
                </svg>
              </div>

              <div id="description">
                <DescriptionSection
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                />
              </div>

              <div className="ui-fx">
                <div className="ui-inner-border l"></div>
                <div className="ui-inner-border r"></div>
                {[1, 2, 3, 4].map(function (n) {
                  return (
                    <span
                      className={"ui-corner"}
                      key={n * Math.random()}
                    ></span>
                  );
                })}

                {["l", "r", "t", "b"].map(function (n) {
                  return (
                    <div className={"ui-batts " + n} key={n + Math.random()}>
                      {[1, 2].map(function (n) {
                        return (
                          <span
                            className={"batt"}
                            key={n * Math.random()}
                          ></span>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="ui-inner-border b">
            <HeaderMenu />
          </div>
        </div>
      </section>
    </>
  );
};
export default ContentTabs;
