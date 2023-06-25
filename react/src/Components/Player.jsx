import React, { Component } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WealthWalletSDK from "./WealthWallet";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step2 from "./step2";
import Step1 from "./step1";
import SpaceDomination from "./spaceDomination";
import DescriptionSection from "./descriptionSection";
import IntroSection from "./introSection";
gsap.registerPlugin(SplitText, ScrollTrigger);


class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progression: [],
      scale: [],
      progress: 0,

      contextStarted: false,

      scalePos: 0,
    };
  }


  render() {
    return (
      <>
      <IntroSection/>
        <div id="starfield"></div>
        <div id="app">
          <SpaceDomination />
         
          <section id="header">
            <div className="wrap">
              <div className="ui-inner-border t"></div>

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
                    
                    
                    <DescriptionSection/>

                    {/* STEPS TO GET STARTED */}
                    <div className="text-box" id="login">
                      <div className="scroll-content">
                        <svg viewBox="0 -20 1320 70">
                          <text x="50%" y="50%" textAnchor="middle">
                            Testing DDBC:
                          </text>
                        </svg>
                        <Step1 />
                        {/* <Step2/> */}
                        <Step3 />
                        {/* <Step4 /> */}
                        {/* <Step5 /> */}
                        <Step6 />
                      </div>
                    </div>
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
                        <div
                          className={"ui-batts " + n}
                          key={n + Math.random()}
                        >
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
                <ul id="menu">
                  <li>
                    <button
                      id="button"
                      onClick={() => {
                        const menu = document.getElementById("menu");
                        menu.classList.toggle("show");
                      }}
                    >
                      <span className="border"></span>
                      <div className="roulette"></div>
                    </button>
                    <ul>
                      <li>
                        <a href="#finance">Finance</a>
                      </li>
                      <li>
                        <a href="#mission">Mission</a>
                      </li>
                      <li>
                        <a href="#features">Features</a>
                      </li>
                      <li>
                        <a href="#commitment">Commitment</a>
                      </li>
                      <li>
                        <a href="#tokens">Tokens</a>
                      </li>
                      <li>
                        <a href="#login">Login/Register</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Player;
