//create a new component called ContentTabs
import React, { useState } from "react";
//import the css file
import "../contentTabs/dist/contentTabs.css";

import DescriptionSection from "../descriptionSection";
import HeaderMenu from "../headerMenu";
import { createBleepsManager } from "@arwes/bleeps";
import Success from "../success";

//create a new component called ContentTabs
const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const playSound = () => {
    const audio = new Audio("https://next.arwes.dev/assets/sounds/click.mp3");
    audio.play();
  };

  const playSoundText = () => {
    const audio = new Audio("https://next.arwes.dev/assets/sounds/type.webm");
    audio.play();
  };

  return (
    <>
      <div></div>
      <section id="header">
        <div className="wrap">
          <div className="ui-inner-border t"></div>
          {/* HEADER TABS TOP  */}
          <div className="header-tabs-top text-center">
            <div className="row">
              <div className="col">
                <div
                  className={
                    (activeTab === "tab1" ? "active" : "") + " pointer tab-btn"
                  }
                  onClick={() => {
                    playSound();
                    setActiveTab("tab1");
                    playSoundText();
                  }}
                >
                  IDENTITY
                </div>
              </div>
              <div className="col">
                <div
                  className={
                    (activeTab === "tab2" ? "active" : "") + " pointer tab-btn"
                  }
                  onClick={() => {
                    setActiveTab("tab2");
                    playSound();
                    playSoundText();
                  }}
                >
                  MISSION
                </div>
              </div>
              <div className="col">
                <div
                  className={
                    (activeTab === "tab3" ? "active" : "") + " pointer tab-btn"
                  }
                  onClick={() => {
                    setActiveTab("tab3");
                    playSound();
                    playSoundText();
                  }}
                >
                  INNOVATIONS
                </div>
              </div>
            </div>
          </div>

          <div className="ui-grid">
            <div className="ui-box">

              {activeTab === "tab1" && (
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
              )}


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

          {/* HEADER TABS BOTTOM  */}
          <div className="header-tabs-bottom text-center">
            <div className="row align-items-center">
              <div className="col">
                <div
                  className={
                    (activeTab === "tab4" ? "active" : "") + " pointer tab-btn"
                  }
                  onClick={() => {
                    playSound();
                    setActiveTab("tab4");
                    playSoundText();
                  }}
                >
                  TOKENS
                </div>
              </div>
              <div className="col">
                <div
                  className={
                    (activeTab === "tab5" ? "active" : "") + " pointer tab-btn"
                  }
                  onClick={() => {
                    setActiveTab("tab5");
                    playSound();
                  }}
                >
                  DDBC
                </div>
              </div>
              <div className="col">
                <div
                  className={
                    (activeTab === "tab6" ? "active" : "") + " pointer tab-btn"
                  }
                  onClick={() => {
                    setActiveTab("tab6");
                    playSound();
                  }}
                >
                  CONTRACTS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ContentTabs;
