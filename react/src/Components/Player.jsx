import React, { Component } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpaceDomination from "./spaceDomination";
import IntroSection from "./introSection";
import ContentTabs from "./contentTabs";
import Success from "./success";
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
        <IntroSection />
        <div id="starfield"></div>
        <div id="app">
          <SpaceDomination />
          <ContentTabs />
        </div>
      </>
    );
  }
}

export default Player;
