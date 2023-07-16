//create a new component called ContentTabs
import React, { useState, useContext } from "react";
//import the css file
import "../contentTabs/dist/contentTabs.css";
import SuccessContext from "../../contexts/successContext";
import HeaderMenu from "../headerMenu";
import Success from "../success";

import Tab1 from "../tab1";
import Tab2 from "../tab2";
import Tab3 from "../tab3";
import Tab4 from "../tab4";
import Tab5 from "../tab5";
import Tab6 from "../tab6";

//create a new component called ContentTabs
const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const { successPopup } = useContext(SuccessContext);

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
                {successPopup && <Success />}
                {successPopup && console.log("successPopup", successPopup)}
                {/* TRANSFORMING FINANCE  */}
                {activeTab === "tab1" && <Tab1 />}
                {/* MISSION/COMMITMENT  */}
                {activeTab === "tab2" && <Tab2 />}
                {/* INNOVATIVE FEATURES  */}
                {activeTab === "tab3" && <Tab3 />}
                {/* OUR TOKENS  */}
                {activeTab === "tab4" && <Tab4 />}

                {/* Testing DDBC  */}
                {activeTab === "tab5" && <Tab5 />}
                {/* Contracts */}
                {activeTab === "tab6" && <Tab6 />}
              </div>
            </div>
          </div>
          <div className="ui-inner-border b"></div>

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
                  DIGITAL DOLAR
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
                  CONTACT US
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
