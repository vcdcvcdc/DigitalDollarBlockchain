import React, { Component } from "react";
import * as Tone from "tone";
import ChordProgression from "../Chords/ChordProgression";
import Piano from "../Piano/Piano";
import Kick from "../Drums/Kick";
import Snare from "../Drums/Snare";
import Hat from "../Drums/Hat";
import Noise from "../Drums/Noise";
import Keys from "../Chords/Keys";
import { fiveToFive } from "../Chords/MajorScale";
import intervalWeights from "../Chords/IntervalWeights";
import * as THREE from "three";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { RoughEase } from "gsap/EasePack";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Elastic, TweenMax, TimelineMax, Power4, Sine } from "gsap/gsap-core";
import WealthWalletSDK from "./WealthWallet";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step2 from "./step2";
import Step1 from "./step1";
gsap.registerPlugin(SplitText, ScrollTrigger);

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const cmp = new Tone.Compressor({
  threshold: -6,
  ratio: 3,
  attack: 0.5,
  release: 0.1,
});
const lpf = new Tone.Filter(2000, "lowpass");
const vol = new Tone.Volume(10);
Tone.Master.chain(cmp, lpf, vol);
Tone.Transport.bpm.value = 156;
Tone.Transport.swing = 1;
const color = {
  teal2: "#00ffc3",
  teal: "#59b29e",
  dark: "#0f0026",
  red: "#f63b4c",
  light: "#afe3d7",
};

function resetStyle(selector, callback) {
  if (typeof selector === "string") {
    Array.from(document.querySelectorAll(selector)).forEach(
      (c, i) => (c.style = null)
    );
  } else {
    if (callback) {
      Array.from(selector).forEach(callback);
    } else {
      Array.from(selector).forEach((c, i) => (c.style = null));
    }
  }
}
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "C",
      progression: [],
      scale: [],
      progress: 0,

      pianoLoaded: false,
      kickLoaded: false,
      snareLoaded: false,
      hatLoaded: false,

      contextStarted: false,
      genChordsOnce: false,

      kickOff: false,
      snareOff: false,
      hatOff: false,
      melodyDensity: 0.33,
      melodyOff: false,

      scalePos: 0,
    };
    this.noise = Noise;
    this.chords = new Tone.Sequence(
      (time, note) => {
        this.playChord();
      },
      [""],
      "1n"
    );
    this.melody = new Tone.Sequence(
      (time, note) => {
        this.playMelody();
      },
      [""],
      "8n"
    );
    this.kickLoop = new Tone.Sequence(
      (time, note) => {
        if (!this.state.kickOff) {
          if (note === "C4" && Math.random() < 0.9) {
            this.kick.triggerAttack(note);
          } else if (note === "." && Math.random() < 0.1) {
            this.kick.triggerAttack("C4");
          }
        }
      },
      ["C4", "", "", "", "", "", "", "C4", "C4", "", ".", "", "", "", "", ""],
      "8n"
    );

    this.snareLoop = new Tone.Sequence(
      (time, note) => {
        if (!this.state.snareOff) {
          if (note !== "" && Math.random() < 0.8) {
            this.snare.triggerAttack(note);
          }
        }
      },
      ["", "C4"],
      "2n"
    );

    this.hatLoop = new Tone.Sequence(
      (time, note) => {
        if (!this.state.hatOff) {
          if (note !== "" && Math.random() < 0.8) {
            this.hat.triggerAttack(note);
          }
        }
      },
      ["C4", "C4", "C4", "C4", "C4", "C4", "C4", "C4"],
      "4n"
    );

    this.chords.humanize = true;
    this.melody.humanize = true;
    this.kickLoop.humanize = true;
    this.snareLoop.humanize = true;
    this.hatLoop.humanize = true;

    this.nextChord = this.nextChord.bind(this);
    this.playChord = this.playChord.bind(this);
    this.playMelody = this.playMelody.bind(this);
    this.generateProgression = this.generateProgression.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.pn = new Piano(() =>
      this.setState({ ...this.state, pianoLoaded: true })
    ).sampler;
    this.kick = new Kick(() =>
      this.setState({ ...this.state, kickLoaded: true })
    ).sampler;
    this.snare = new Snare(() =>
      this.setState({ ...this.state, snareLoaded: true })
    ).sampler;
    this.hat = new Hat(() =>
      this.setState({ ...this.state, hatLoaded: true })
    ).sampler;
    window.addEventListener("wheel", this.scrollTo);
    document
      .getElementById("description")
      .addEventListener("scrollend", this.manageSong);
    this.spaceWorld(document.getElementById("starfield"));
    this.introAnimation();
  }

  componentWillUnmount() {
    if (Tone.Transport.state === "started") {
      this.stop();
    }
  }

  manageSong = () => {
    if (
      this.state.pianoLoaded &&
      this.state.kickLoaded &&
      this.state.snareLoaded &&
      this.state.hatLoaded
    ) {
      if (!this.state.contextStarted) {
        Tone.start();
        this.setState({ ...this.state, contextStarted: true });
      }
    } else {
      return;
    }

    try {
      if (this.state.contextStarted) {
        this.generateProgression();
        this.setState({ ...this.state, progress: 0 });
        if (Tone.Transport.state !== "started") {
          this.start();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  scrollTo = (e) => {
    document.getElementById("description").scrollBy({
      top: e.deltaY,
      left: 0,
    });
  };

  introAnimation = () => {
    const duration = 4;
    // gsap.utils.toArray(".text-box").forEach(function (elem) {
    //     ScrollTrigger.create({
    //         trigger: elem,
    //         start: "top 55%",
    //         end: "bottom 50%",
    //         markers: true,
    //         onEnter: function () {
    //             console.log('here1')
    //             gsap.fromTo(
    //                 elem,
    //                 { y: 100, autoAlpha: 0 },
    //                 {
    //                     duration: 1.25,
    //                     y: 0,
    //                     autoAlpha: 1,
    //                     ease: "back",
    //                     overwrite: "auto"
    //                 }
    //             );
    //         },
    //         onLeave: function () {
    //             console.log('here2')

    //             gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    //         },
    //         onEnterBack: function () {
    //             console.log('here3')

    //             gsap.fromTo(
    //                 elem,
    //                 { y: -100, autoAlpha: 0 },
    //                 {
    //                     duration: 1.25,
    //                     y: 0,
    //                     autoAlpha: 1,
    //                     ease: "back",
    //                     overwrite: "auto"
    //                 }
    //             );
    //         },
    //         onLeaveBack: function () {
    //             console.log('here4')
    //             gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    //         }
    //     });
    // });
    // let descriptionSplit = new SplitText('#description', {
    //     type: "lines, words, chars",
    //     linesClass: "line line++",
    //     wordsClass: "word word++",
    //     charsClass: "char",
    // });
    // const words = descriptionSplit.words;

    // let descriptionSplit = new SplitText('h2', {
    //     type: "lines, words, chars",
    //     linesClass: "line line++",
    //     wordsClass: "word word++",
    //     charsClass: "char",
    // });
    // const words = descriptionSplit.words;

    // let descriptionSplit1 = new SplitText('h3', {
    //     type: "lines, words, chars",
    //     linesClass: "line line++",
    //     wordsClass: "word word++",
    //     charsClass: "char",
    // });
    // const words1 = descriptionSplit1.words;

    const easeOutElastic = Elastic.easeOut.config(1, 1);
    const section = document.getElementById("header");
    const button = document.getElementById("button");
    TweenMax.set([section, "#header", ".gui"], { autoAlpha: 0 });
    const sortTics = (selector) => {
      const tics = Array.from(document.querySelectorAll(selector));
      return {
        left: tics.filter((tic, i) => i < tics.length / 2).reverse(),
        right: tics.filter((tic, i) => i > (tics.length - 1) / 2),
      };
    };
    const ticsT = sortTics(".ui-tics.t .tic");
    const ticsB = sortTics(".ui-tics.b .tic");
    const borderXF = $(".gui .border-x.f");
    const borderXL = $(".gui .border-x.l");
    const textBox = $$(".ui-text .t-o");
    const textBoxTitleL = $$(".ui-text.l h5");
    const textBoxTitleR = $$(".ui-text.r h5");
    const curvedBorder = $(".ui-border-v2.t");

    new TimelineMax({
      onComplete: () => document.body.classList.add("intro-anim-complete"),
    })
      .delay(1)
      .set("body", { opacity: 1 })
      // Turn the opacity back up
      .add((_) => TweenMax.set([section, "#header", ".gui"], { autoAlpha: 1 }))
      .set(".gui .border-vert .dot", { autoAlpha: 0 }, 0)
      .from(
        ".gui .border-horz",
        duration,
        {
          scaleX: 0,
          ease: easeOutElastic,
        },
        0
      )
      .from(
        borderXF,
        duration,
        {
          rotation: "90deg",
          scaleX: 0,
          ease: easeOutElastic,
          onComplete() {
            borderXF.style = null;
          },
        },
        0
      )
      .from(
        borderXL,
        duration,
        {
          rotation: "-90deg",
          scaleX: 0,
          ease: easeOutElastic,
          onComplete() {
            borderXL.style = null;
          },
        },
        0
      )
      .from(
        ".gui .border-vert",
        duration,
        {
          scaleY: 0,
          ease: easeOutElastic,
        },
        0
      )
      .fromTo(
        "#header .ui-box",
        duration * 0.1,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          ease: easeOutElastic,
        },
        0
      )
      .staggerFromTo(
        ticsT.left,
        duration,
        {
          visibility: "hidden",
        },
        {
          visibility: "visible",
          ease: easeOutElastic,
        },
        0.05,
        0
      )
      .staggerFromTo(
        ticsT.right,
        duration,
        {
          visibility: "hidden",
        },
        {
          visibility: "visible",
          ease: easeOutElastic,
        },
        0.05,
        0
      )
      .staggerFromTo(
        ticsB.left,
        duration,
        {
          visibility: "hidden",
        },
        {
          visibility: "visible",
          ease: easeOutElastic,
        },
        0.05,
        0
      )
      .staggerFromTo(
        ticsB.right,
        duration,
        {
          visibility: "hidden",
        },
        {
          visibility: "visible",
          ease: easeOutElastic,
        },
        0.05,
        0
      )
      .fromTo(
        "#header .ui-fx",
        duration,
        {
          top: "40%",
          right: "40%",
          bottom: "40%",
          left: "40%",
        },
        {
          top: "0%",
          right: "0%",
          bottom: "0%",
          left: "0%",
          ease: easeOutElastic,
        },
        0
      )
      .set(".gui .ui-border", { transition: "none" }, 0)
      .fromTo(
        ".gui .ui-border",
        duration,
        {
          height: 0,
        },
        {
          height: "80vh",
          ease: easeOutElastic,
          onComplete() {
            resetStyle(".gui .ui-border");
          },
        },
        0
      )
      .from(
        ".ui-inner-border",
        duration / 4,
        {
          autoAlpha: 0,
          ease: easeOutElastic,
        },
        0
      )
      .fromTo(
        ".ui-fx .ui-inner-border",
        duration,
        {
          height: 0,
        },
        {
          height: "95%",
          ease: easeOutElastic,
        },
        0
      )
      .fromTo(
        ["#header .ui-inner-border.t", "#header .ui-inner-border.b"],
        duration,
        {
          width: 0,
          borderWidth: "0px",
        },
        {
          width: "40vw",
          borderWidth: "3px",
          ease: easeOutElastic,
        },
        0
      )
      .from(
        curvedBorder,
        duration,
        {
          y: -40,
        },
        0.4
      )

      // Caps, Borders, Details
      .to(
        ".gui .border-vert .dot",
        duration / 2,
        {
          autoAlpha: 1,
          ease: RoughEase.ease.config({
            points: 200,
            strength: 4,
            clamp: true,
            randomize: true,
          }),
        },

        duration * 0.66
      )
      .fromTo(
        [".gui .cap"],
        duration,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: RoughEase.ease.config({
            points: 200,
            strength: 4,
            clamp: true,
            randomize: true,
          }),
        },

        duration * 0.66
      )
      .fromTo(
        [".gui .batt"],
        duration,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: RoughEase.ease.config({
            points: 100,
            strength: 3,
            clamp: true,
            randomize: true,
          }),
        },

        duration * 0.66
      )
      .fromTo(
        ["#header .ui-corner"],
        duration,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: RoughEase.ease.config({
            points: 100,
            strength: 2,
            clamp: true,
            randomize: true,
          }),
        },

        duration * 0.66
      )

      // Left and Right, Top, Bottom Batts in Header
      .from(
        [".ui-batts.l .batt", ".ui-batts.r .batt"],
        duration / 2,
        {
          width: 0,
          ease: easeOutElastic,
        },
        duration / 2
      )
      .from(
        [".ui-batts.t .batt", ".ui-batts.b .batt"],
        duration / 2,
        {
          height: 0,
          ease: easeOutElastic,
        },
        duration / 2
      )

      // Circles
      .staggerFromTo(
        ".gui .ui-circles.l .circle",
        duration / 2,
        {
          visibility: "hidden",
          ease: Power4.easeInOut,
        },
        {
          visibility: "visible",
          ease: Power4.easeOut,
          onComplete() {
            resetStyle(".gui .ui-circles.l .circle");
          },
        },
        0.1,
        duration * 0.66
      )
      .staggerFromTo(
        ".gui .ui-circles.r .circle",
        duration / 2,
        {
          visibility: "hidden",
          ease: Power4.easeInOut,
        },
        {
          visibility: "visible",
          ease: Power4.easeOut,
          onComplete() {
            resetStyle(".gui .ui-circles.r .circle");
          },
        },
        0.1,
        duration * 0.66
      )

      // Title
      // .staggerFromTo(
      //     words,
      //     0.2,
      //     {
      //         visibility: "hidden",
      //         background: "rgba(0, 255, 195, 0.3)",
      //         // textShadow: `0 0 0 ${color.teal2}`,
      //         ease: Sine.easeIn,
      //     },
      //     {
      //         visibility: "visible",
      //         background: "rgba(0, 255, 195, 0)",
      //         // textShadow: `0 0 60px ${color.teal2}`,
      //         ease: Sine.easeOut,
      //     },
      //     0.03,
      //     duration * 0.33
      // )
      // .staggerFromTo(
      //     words1,
      //     0.2,
      //     {
      //         visibility: "hidden",
      //         background: "rgba(0, 255, 195, 0.3)",
      //         // textShadow: `0 0 0 ${color.teal2}`,
      //         ease: Sine.easeIn,
      //     },
      //     {
      //         visibility: "visible",
      //         background: "rgba(0, 255, 195, 0)",
      //         // textShadow: `0 0 60px ${color.teal2}`,
      //         ease: Sine.easeOut,
      //     },
      //     0.03,
      //     duration * 0.33
      // )
      // UI-Text
      .add("textBox", duration * 0.66)
      .staggerFromTo(
        textBox,
        5,
        {
          height: 0,
        },
        {
          height: 100,
          repeat: -1,
          repeatDelay: 3,
          yoyo: true,
          ease: Sine.easeOut,
        },
        4,
        "textBox"
      )
      .fromTo(
        [textBoxTitleL, textBoxTitleR],
        1,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          ease: Sine.easeOut,
        },
        "textBox"
      )
      .to(
        textBoxTitleL,
        2,
        {
          text: "Status: Ready",
          repeat: -1,
          repeatDelay: 5,
          yoyo: true,
          ease: Sine.easeOut,
        },
        "textBox"
      )
      .to(
        textBoxTitleR,
        2.4,
        {
          text: "LETS GO",
          repeat: -1,
          repeatDelay: 5,
          yoyo: true,
          ease: Sine.easeOut,
        },
        "textBox"
      )

      //button
      .from(
        button,
        0.3,
        {
          autoAlpha: 0,
        },
        2
      )
      .from(
        button,
        1,
        {
          scale: 1.5,
          autoAlpha: 0,
          ease: easeOutElastic,
          onComplete() {
            button.style = null;
          },
        },
        2
      );
  };

  spaceStars = (scene, farPlane = 1000) => {
    const geometry = new THREE.SphereGeometry(1, 1, 1);
    const material = new THREE.PointsMaterial({
      size: 5,
      opacity: 1,
      color: color.teal,
      transparent: true,
    });

    let starQty = 1000;
    for (let i = 0; i < starQty; i++) {
      const starVertex = new THREE.Vector3();
      starVertex.x = Math.random() * farPlane - farPlane * 0.5;
      starVertex.y = Math.random() * farPlane - farPlane * 0.5;
      starVertex.z = Math.random() * farPlane - farPlane * 0.5;
      geometry.vertices.push(starVertex);
    }

    const stars = new THREE.Points(geometry, material);

    scene.add(stars);

    return stars;
  };

  spaceWorld = (targetElement) => {
    let HEIGHT = window.innerHeight;
    let WIDTH = window.innerWidth;
    let aspectRatio = WIDTH / HEIGHT;
    let fieldOfView = 75;
    let nearPlane = 1;
    let farPlane = 5000;
    let mouseX = 100;
    let mouseY = 100;

    const scene = new THREE.Scene({ antialias: true });
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    const renderer = webGLSupport()
      ? new THREE.WebGLRenderer()
      : new THREE.CanvasRenderer();

    // Add objects to the scene
    // -------------------------------------------------------
    const stars = this.spaceStars(scene, farPlane);
    init();
    return {
      stars,
    };
    // Initialize and Animate, Functions Hoisted
    // --------------------------------------
    function render(t) {
      stars.rotation.x += (mouseX - stars.rotation.x) * 0.000015;
      stars.rotation.y += (mouseY - stars.rotation.y) * 0.000015;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    function colorHex(color) {
      return parseInt("0x" + color.replace(/#/g, "").toUpperCase());
    }

    function init() {
      targetElement.appendChild(renderer.domElement);
      camera.position.z = 1070 * 3.5;
      renderer.setClearColor(new THREE.Color(colorHex(color.dark)), 1);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(WIDTH, HEIGHT);

      window.addEventListener("resize", onWindowResize, false);
      document.addEventListener("mousemove", onMouseMove, false);
      animate();
    }

    function animate(t) {
      requestAnimationFrame(animate);
      render(t);
    }

    function webGLSupport() {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl"))
        );
      } catch (e) {
        return false;
      }
    }

    function onWindowResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.domElement.style.width = w + "px";
      renderer.domElement.style.height = h + "px";
    }

    function onMouseMove(e) {
      let windowHalfX = WIDTH / 2;
      let windowHalfY = HEIGHT / 2;
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;
    }
  };

  nextChord = () => {
    const nextProgress =
      this.state.progress === this.state.progression.length - 1
        ? 0
        : this.state.progress + 1;
    const nextKickOff = Math.random() < 0.15;
    const nextSnareOff = Math.random() < 0.2;
    const nextHatOff = Math.random() < 0.25;
    const nextMelodyDensity = Math.random() * 0.3 + 0.2;
    const nextMelodyOff = Math.random() < 0.25;

    if (this.state.progress === 4) {
      this.setState({
        ...this.state,
        progress: nextProgress,
        kickOff: nextKickOff,
        snareOff: nextSnareOff,
        hatOff: nextHatOff,
      });
    } else if (this.state.progress === 0) {
      this.setState({
        ...this.state,
        progress: nextProgress,
        kickOff: nextKickOff,
        snareOff: nextSnareOff,
        hatOff: nextHatOff,
        melodyDensity: nextMelodyDensity,
        melodyOff: nextMelodyOff,
      });
    } else {
      this.setState({
        ...this.state,
        progress: nextProgress,
      });
    }
  };

  playChord = () => {
    const chord = this.state.progression[this.state.progress];
    const root = Tone.Frequency(this.state.key + "3").transpose(
      chord.semitoneDist
    );
    const size = 4;
    const voicing = chord.generateVoicing(size);
    const notes = Tone.Frequency(root)
      .harmonize(voicing)
      .map((f) => Tone.Frequency(f).toNote());
    //this.pn.context._context.resume();
    this.pn.triggerAttackRelease(notes, "1n");
    this.nextChord();
  };

  playMelody = () => {
    // const chord = this.state.progression[this.state.progress];
    // const root = Tone.Frequency(this.state.key+"5").transpose(chord.semitoneDist);
    // const scale = chord.generateMode();
    // const notes = Tone.Frequency(root).harmonize(scale).map(f => Tone.Frequency(f).toNote());
    // const noteIdx = Math.floor(Math.random()*notes.length);
    // if(Math.random()<this.state.melodyDensity)
    //     this.pn.triggerAttack(notes[noteIdx]);

    if (this.state.melodyOff || !(Math.random() < this.state.melodyDensity)) {
      return;
    }

    const descendRange = Math.min(this.state.scalePos, 7) + 1;
    const ascendRange = Math.min(
      this.state.scale.length - this.state.scalePos,
      7
    );

    let descend = descendRange > 1;
    let ascend = ascendRange > 1;

    if (descend && ascend) {
      if (Math.random() > 0.5) {
        ascend = !descend;
      } else {
        descend = !ascend;
      }
    }

    let weights = descend
      ? intervalWeights.slice(0, descendRange)
      : intervalWeights.slice(0, ascendRange);

    const sum = weights.reduce((prev, curr) => prev + curr, 0);
    weights = weights.map((w) => w / sum);
    for (let i = 1; i < weights.length; i++) {
      weights[i] += weights[i - 1];
    }

    const randomWeight = Math.random();
    let scaleDist = 0;
    let found = false;
    while (!found) {
      if (randomWeight <= weights[scaleDist]) {
        found = true;
      } else {
        scaleDist++;
      }
    }

    const scalePosChange = descend ? -scaleDist : scaleDist;
    const newScalePos = this.state.scalePos + scalePosChange;

    this.setState({
      ...this.state,
      scalePos: newScalePos,
    });

    this.pn.triggerAttackRelease(this.state.scale[newScalePos], "2n");
  };

  generateProgression = () => {
    const scale = fiveToFive;
    const newKey = Keys[Math.floor(Math.random() * Keys.length)];
    const newScale = Tone.Frequency(newKey + "5")
      .harmonize(scale)
      .map((f) => Tone.Frequency(f).toNote());
    const newProgression = ChordProgression.generate(8);
    const newScalePos = Math.floor(Math.random() * scale.length);

    this.setState({
      ...this.state,
      key: newKey,
      progress: 0,
      progression: newProgression,
      scale: newScale,
      genChordsOnce: true,
      scalePos: newScalePos,
    });
  };

  toggle = () => {
    this.setState({ ...this.state, progress: 0 });
    if (Tone.Transport.state === "started") {
      this.noise.stop();
      Tone.Transport.stop();
      this.props.toggleWakeLock();
    } else {
      Tone.start();
      Tone.Transport.start();
      this.noise.start(0);
      this.chords.start(0);
      this.melody.start(0);
      this.kickLoop.start(0);
      this.snareLoop.start(0);
      this.hatLoop.start(0);
      this.props.toggleWakeLock();
    }
  };

  stop = () => {
    if (Tone.Transport.state === "started") {
      this.noise.stop();
      Tone.Transport.stop();
      this.props.toggleWakeLock();
    }
  };

  start = () => {
    if (Tone.Transport.state !== "started") {
      Tone.start();
      Tone.Transport.start();
      this.noise.start(0);
      this.chords.start(0);
      this.melody.start(0);
      this.kickLoop.start(0);
      this.snareLoop.start(0);
      this.hatLoop.start(0);
      this.props.toggleWakeLock();
    }
  };

  render() {
    return (
      <>
        <div id="starfield"></div>
        <div id="app">
          <div className="gui">
            <div className="ui-border-v2 t">
              <svg viewBox="0 0 620 30">
                <path
                  d="M628.587,25.19l-7.963-13.811h-0.008L617.525,6.03A12.244,12.244,0,0,0,607.74.994H409.994V0h198.43c4.149,0,8.2,2.1,9.748,4.781l2.949,5.089h0.028l8.086,14.062A12.237,12.237,0,0,0,639.03,29h80.976v0.006h77.735a12.243,12.243,0,0,0,9.784-5.037l3.091-5.348h0.008l7.963-13.811C820.142,2.113,824.192,0,828.345,0H1029.99V1H829.029a12.237,12.237,0,0,0-9.794,5.068L811.15,20.131h-0.029l-2.948,5.089C806.618,27.9,802.573,30,798.424,30H638.345C634.192,30,630.142,27.887,628.587,25.19Z"
                  transform="translate(-410)"
                ></path>
              </svg>
              <div className="batt"></div>
            </div>
            {["t", "b"].map(function (n) {
              return (
                <div
                  className={"ui-c-border " + n}
                  key={n + Math.random() + "border"}
                >
                  <svg viewBox="0 0 620 30">
                    <path
                      d="M628.587,25.19l-7.963-13.811h-0.008L617.525,6.03A12.244,12.244,0,0,0,607.74.994H409.994V0h198.43c4.149,0,8.2,2.1,9.748,4.781l2.949,5.089h0.028l8.086,14.062A12.237,12.237,0,0,0,639.03,29h80.976v0.006h77.735a12.243,12.243,0,0,0,9.784-5.037l3.091-5.348h0.008l7.963-13.811C820.142,2.113,824.192,0,828.345,0H1029.99V1H829.029a12.237,12.237,0,0,0-9.794,5.068L811.15,20.131h-0.029l-2.948,5.089C806.618,27.9,802.573,30,798.424,30H638.345C634.192,30,630.142,27.887,628.587,25.19Z"
                      transform="translate(-410)"
                    ></path>
                  </svg>
                  <span className="batt"></span>
                </div>
              );
            })}
            {["l", "r"].map(function (n) {
              return (
                <div className={"ui-border " + n} key={"UIBorder" + n}>
                  <i className="cap t"></i>
                  <i className="batt"></i>
                  <i className="cap b"></i>
                </div>
              );
            })}
            <div className="ui-cross">
              <div className="border-x f"></div>
              <div className="border-x l"></div>
              <div className="border-horz"></div>
              <div className="border-vert">
                {["t", "b"].map(function (n) {
                  return (
                    <div className={"dot " + n} key={n + Math.random() + "dot"}>
                      <div className="x-hair">
                        {[1, 2, 3, 4].map(function (n) {
                          return (
                            <div
                              className={"line"}
                              key={n * Math.random() + "line"}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {["l", "r"].map(function (n) {
              return (
                <div className={"ui-circles " + n} key={"UICircles" + n}>
                  {[1, 2, 3, 4, 5, 6].map(function (n) {
                    return (
                      <div
                        className={"circle"}
                        key={n * Math.random() + "circle"}
                      ></div>
                    );
                  })}
                </div>
              );
            })}
            <div className="ui-text r">
              <h5>SciFi Mission</h5>
              <div className="t-o">
                <svg viewBox="0 0 101 67">
                  <path
                    d="M767,453h-1v-1h4v1h-3Zm1-22h1v1h-1v-1Zm-7,0h5v1h-5v-1Zm-9,0h4v1h-4v-1Zm-7,0h5v1h-5v-1Zm-4,0h2v1h-2v-1Zm-3,0h2v1h-2v-1Zm-2,0h1v1h-1v-1Zm17,3H735v-1h18v1Zm-20-3h2v1h-2v-1Zm-15,0h14v1H718v-1Zm16,3H715v-1h19v1Zm-37-3h18v1H697v-1Zm17,3H694v-1h20v1Zm-29-1h7v1h-7v-1Zm-4-2h10v1H681v-1Zm-12,0h9v1h-9v-1Zm15,3H669v-1h15v1Zm0,2H669v-1h15v1Zm-4,2H669v-1h11v1Zm-9,2h-2v-1h2v1Zm5-1v1h-4v-1h4Zm2,3h-9v-1h9v1Zm-7,2h-2v-1h2v1Zm0,2h-2v-1h2v1Zm4,2h-6v-1h6v1Zm-2,2h-4v-1h4v1Zm3,2h-7v-1h7v1Zm23,2H669v-1h30v1Zm-28,2h-2v-1h2v1Zm3-1v1h-2v-1h2Zm4,0v1h-3v-1h3Zm5,0v1h-4v-1h4Zm10,0v1h-8v-1h8Zm4,0v1h-3v-1h3Zm20,3H669v-1h48v1Zm-32,2H669v-1h16v1Zm-13,2h-3v-1h3v1Zm5-1v1h-4v-1h4Zm5,0v1h-2v-1h2Zm4,1v-1h4v1h-4Zm0-3h9v1h-9v-1Zm12,0v1h-1v-1h1Zm3,0v1h-1v-1h1Zm4,0v1h-2v-1h2Zm4,0v1h-3v-1h3Zm0,5H669v-1h40v1Zm-34,2h-6v-1h6v1Zm-5,32h-1v-1h1v1Zm45-18H671v-1h44v1Zm-38,18h-5v-1h5v1Zm9,0h-4v-1h4v1Zm7,0h-5v-1h5v1Zm4,0h-2v-1h2v1Zm3,0h-2v-1h2v1Zm2,0h-1v-1h1v1Zm-10-13v1h-2v-1h2Zm-7,10h18v1H685v-1Zm20,3h-2v-1h2v1Zm15,0H706v-1h14v1Zm-16-3h19v1H704v-1Zm37,3H723v-1h18v1Zm-17-3h20v1H724v-1Zm29,1h-7v-1h7v1Zm4,2H747v-1h10v1Zm12-2H754v-1h15v1Zm0-2H754v-1h15v1Zm0-2H758v-1h11v1Zm0-2h-2v-1h2v1Zm-7,0v-1h4v1h-4Zm7-2h-9v-1h9v1Zm0-2h-2v-1h2v1Zm0-2h-2v-1h2v1Zm0-2h-6v-1h6v1Zm0-2h-4v-1h4v1Zm0-2h-7v-1h7v1Zm0-2H739v-1h30v1Zm0-2h-2v-1h2v1Zm-5,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm-5,0v-1h4v1h-4Zm-10,0v-1h8v1h-8Zm-4,0v-1h3v1h-3Zm28-2H721v-1h48v1Zm0-2H753v-1h16v1Zm0-2h-3v-1h3v1Zm-8,0v-1h4v1h-4Zm-5,0v-1h2v1h-2Zm-4-1v1h-4v-1h4Zm0,3h-9v-1h9v1Zm-12,0v-1h1v1h-1Zm-3,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm40-4H729v-1h40v1Zm0-2h-6v-1h6v1Zm-25-20H731v-1h13v1Zm-12,2h-2v-1h2v1Zm-1-10h-2v-1h2v1Zm-2,2h-2v-1h2v1Zm0,2H716v-1h13v1Zm-6-2v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm10-2H715v-1h12v1Zm-11,2H701v-1h15v1Zm-4-2H696v-1h16v1Zm-23,11h3v1h-3v-1Zm1-6h3v1h-3v-1Zm3,3h-3v-1h3v1Zm5,11h4v1h-4v-1Zm3-11h-6v-1h6v1Zm-3-2h-4v-1h4v1Zm3-2h-3v-1h3v1Zm0,1h4v1h-4v-1Zm2-2h7v1h-7v-1Zm7,3h-3v-1h3v1Zm-7,1h10v1H703v-1Zm0,2h8v1h-8v-1Zm0,10h7v1h-7v-1Zm3-8h13v1H706v-1Zm5,8h6v1h-6v-1Zm15-9v-1h2v1h-2Zm-5,0v-1h2v1h-2Zm-2,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm14-2H715v-1h14v1Zm-15,2h-2v-1h2v1Zm-1-7h2v1h-2v-1Zm8,3h-7v-1h7v1Zm-4,10h15v1H717v-1Zm6,4h-5v-1h5v1Zm-2,1v1h-3v-1h3Zm2,0h6v1h-6v-1Zm10,3H715v-1h18v1Zm-17,4h-2v-1h2v1Zm6,1h2v1h-2v-1Zm33-5h-3v-1h3v1Zm-20,0v-1h15v1H735Zm-4-3h23v1H731v-1Zm27,2v1h-2v-1h2Zm-41,4h45v1H717v-1Zm10,2h1v1h-1v-1Zm-2,4h2v1h-2v-1Zm-5,2v1h-3v-1h3Zm-5,2h5v1h-5v-1Zm2,11h-2v-1h2v1Zm-8,7h2v1h-2v-1Zm0-2h13v1H709v-1Zm6,2v1h-2v-1h2Zm3,0v1h-2v-1h2Zm3,0v1h-2v-1h2Zm-10,2h12v1H711v-1Zm11-2h15v1H722v-1Zm4,2h16v1H726v-1Zm15-4h12v1H741v-1Zm7,4h4v1h-4v-1Zm2-2h7v1h-7v-1Zm10-1h-3v-1h3v1Zm-6-2v-1h5v1h-5Zm-1,0h-4v-1h4v1Zm-3-3h10v1H750v-1Zm12-3h-2v-1h2v1Zm-9-1h2v1h-2v-1Zm3,0h2v1h-2v-1Zm-7,3v-1h8v1h-8Zm-31-1h1v1h-1v-1Zm8,1h-2v-1h2v1Zm-9,3h7v1h-7v-1Zm6,2h2v1h-2v-1Zm4-5v-1h8v1h-8Zm-2,1h10v1H725v-1Zm3,2h3v1h-3v-1Zm0,2h7v1h-7v-1Zm5-2h4v1h-4v-1Zm4-2h6v1h-6v-1Zm0,4h3v1h-3v-1Zm3-2h4v1h-4v-1Zm0-6h4v1h-4v-1Zm0,3h-4v-1h12v1h-8Zm5,1h3v1h-3v-1Zm1-4h3v1h-3v-1Zm-1,6h3v1h-3v-1Zm-24-3v-1h2v1h-2Zm-2-3h13v1H719v-1Zm8-8v1h-6v-1h6Zm8,0v1h-7v-1h7Zm5,1h-4v-1h4v1Zm22,6H719v-1h43v1Zm4,6h-5v-1h5v1Zm-8-3h6v1h-6v-1Zm-15,11v-1h4v1h-4Zm-2-3h7v1h-7v-1Zm-32,3h-2v-1h2v1Zm-2-8H694v-1h13v1Zm1-2h-2v-1h2v1Zm4-1v1h-2v-1h2Zm11,3H709v-1h14v1Zm-8-14h-6v-1h6v1Zm-10-3h18v1H705v-1Zm-2,1H688v-1h15v1Zm-23,0v-1h5v1h-5Zm41-4H676v-1h45v1Zm-10-2h-1v-1h1v1Zm2-4h-2v-1h2v1Zm-15-12h-4v-1h4v1Zm-8-2v-1h12v1H690Zm7-6H685v-1h12v1Zm-7-4h-4v-1h4v1Zm-2,2h-7v-1h7v1Zm-10,1h3v1h-3v-1Zm6,2v1h-5v-1h5Zm1,0h4v1h-4v-1Zm-5,6h2v1h-2v-1Zm5,1h-2v-1h2v1Zm-4-3h8v1h-8v-1Zm7-1H678v-1h10v1Zm-12,4v-1h2v1h-2Zm-4-5h5v1h-5v-1Zm8,3h-6v-1h6v1Zm15-11v1h-4v-1h4Zm2,3h-7v-1h7v1Zm51,5v1h-2v-1h2Zm16,10H736v-1h28v1Zm5,45h-9v-1h9v1Z"
                    transform="translate(-669 -431)"
                  ></path>
                </svg>
                <svg viewBox="0 0 101 67">
                  <path
                    d="M767,453h-1v-1h4v1h-3Zm1-22h1v1h-1v-1Zm-7,0h5v1h-5v-1Zm-9,0h4v1h-4v-1Zm-7,0h5v1h-5v-1Zm-4,0h2v1h-2v-1Zm-3,0h2v1h-2v-1Zm-2,0h1v1h-1v-1Zm17,3H735v-1h18v1Zm-20-3h2v1h-2v-1Zm-15,0h14v1H718v-1Zm16,3H715v-1h19v1Zm-37-3h18v1H697v-1Zm17,3H694v-1h20v1Zm-29-1h7v1h-7v-1Zm-4-2h10v1H681v-1Zm-12,0h9v1h-9v-1Zm15,3H669v-1h15v1Zm0,2H669v-1h15v1Zm-4,2H669v-1h11v1Zm-9,2h-2v-1h2v1Zm5-1v1h-4v-1h4Zm2,3h-9v-1h9v1Zm-7,2h-2v-1h2v1Zm0,2h-2v-1h2v1Zm4,2h-6v-1h6v1Zm-2,2h-4v-1h4v1Zm3,2h-7v-1h7v1Zm23,2H669v-1h30v1Zm-28,2h-2v-1h2v1Zm3-1v1h-2v-1h2Zm4,0v1h-3v-1h3Zm5,0v1h-4v-1h4Zm10,0v1h-8v-1h8Zm4,0v1h-3v-1h3Zm20,3H669v-1h48v1Zm-32,2H669v-1h16v1Zm-13,2h-3v-1h3v1Zm5-1v1h-4v-1h4Zm5,0v1h-2v-1h2Zm4,1v-1h4v1h-4Zm0-3h9v1h-9v-1Zm12,0v1h-1v-1h1Zm3,0v1h-1v-1h1Zm4,0v1h-2v-1h2Zm4,0v1h-3v-1h3Zm0,5H669v-1h40v1Zm-34,2h-6v-1h6v1Zm-5,32h-1v-1h1v1Zm45-18H671v-1h44v1Zm-38,18h-5v-1h5v1Zm9,0h-4v-1h4v1Zm7,0h-5v-1h5v1Zm4,0h-2v-1h2v1Zm3,0h-2v-1h2v1Zm2,0h-1v-1h1v1Zm-10-13v1h-2v-1h2Zm-7,10h18v1H685v-1Zm20,3h-2v-1h2v1Zm15,0H706v-1h14v1Zm-16-3h19v1H704v-1Zm37,3H723v-1h18v1Zm-17-3h20v1H724v-1Zm29,1h-7v-1h7v1Zm4,2H747v-1h10v1Zm12-2H754v-1h15v1Zm0-2H754v-1h15v1Zm0-2H758v-1h11v1Zm0-2h-2v-1h2v1Zm-7,0v-1h4v1h-4Zm7-2h-9v-1h9v1Zm0-2h-2v-1h2v1Zm0-2h-2v-1h2v1Zm0-2h-6v-1h6v1Zm0-2h-4v-1h4v1Zm0-2h-7v-1h7v1Zm0-2H739v-1h30v1Zm0-2h-2v-1h2v1Zm-5,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm-5,0v-1h4v1h-4Zm-10,0v-1h8v1h-8Zm-4,0v-1h3v1h-3Zm28-2H721v-1h48v1Zm0-2H753v-1h16v1Zm0-2h-3v-1h3v1Zm-8,0v-1h4v1h-4Zm-5,0v-1h2v1h-2Zm-4-1v1h-4v-1h4Zm0,3h-9v-1h9v1Zm-12,0v-1h1v1h-1Zm-3,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm40-4H729v-1h40v1Zm0-2h-6v-1h6v1Zm-25-20H731v-1h13v1Zm-12,2h-2v-1h2v1Zm-1-10h-2v-1h2v1Zm-2,2h-2v-1h2v1Zm0,2H716v-1h13v1Zm-6-2v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm10-2H715v-1h12v1Zm-11,2H701v-1h15v1Zm-4-2H696v-1h16v1Zm-23,11h3v1h-3v-1Zm1-6h3v1h-3v-1Zm3,3h-3v-1h3v1Zm5,11h4v1h-4v-1Zm3-11h-6v-1h6v1Zm-3-2h-4v-1h4v1Zm3-2h-3v-1h3v1Zm0,1h4v1h-4v-1Zm2-2h7v1h-7v-1Zm7,3h-3v-1h3v1Zm-7,1h10v1H703v-1Zm0,2h8v1h-8v-1Zm0,10h7v1h-7v-1Zm3-8h13v1H706v-1Zm5,8h6v1h-6v-1Zm15-9v-1h2v1h-2Zm-5,0v-1h2v1h-2Zm-2,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm14-2H715v-1h14v1Zm-15,2h-2v-1h2v1Zm-1-7h2v1h-2v-1Zm8,3h-7v-1h7v1Zm-4,10h15v1H717v-1Zm6,4h-5v-1h5v1Zm-2,1v1h-3v-1h3Zm2,0h6v1h-6v-1Zm10,3H715v-1h18v1Zm-17,4h-2v-1h2v1Zm6,1h2v1h-2v-1Zm33-5h-3v-1h3v1Zm-20,0v-1h15v1H735Zm-4-3h23v1H731v-1Zm27,2v1h-2v-1h2Zm-41,4h45v1H717v-1Zm10,2h1v1h-1v-1Zm-2,4h2v1h-2v-1Zm-5,2v1h-3v-1h3Zm-5,2h5v1h-5v-1Zm2,11h-2v-1h2v1Zm-8,7h2v1h-2v-1Zm0-2h13v1H709v-1Zm6,2v1h-2v-1h2Zm3,0v1h-2v-1h2Zm3,0v1h-2v-1h2Zm-10,2h12v1H711v-1Zm11-2h15v1H722v-1Zm4,2h16v1H726v-1Zm15-4h12v1H741v-1Zm7,4h4v1h-4v-1Zm2-2h7v1h-7v-1Zm10-1h-3v-1h3v1Zm-6-2v-1h5v1h-5Zm-1,0h-4v-1h4v1Zm-3-3h10v1H750v-1Zm12-3h-2v-1h2v1Zm-9-1h2v1h-2v-1Zm3,0h2v1h-2v-1Zm-7,3v-1h8v1h-8Zm-31-1h1v1h-1v-1Zm8,1h-2v-1h2v1Zm-9,3h7v1h-7v-1Zm6,2h2v1h-2v-1Zm4-5v-1h8v1h-8Zm-2,1h10v1H725v-1Zm3,2h3v1h-3v-1Zm0,2h7v1h-7v-1Zm5-2h4v1h-4v-1Zm4-2h6v1h-6v-1Zm0,4h3v1h-3v-1Zm3-2h4v1h-4v-1Zm0-6h4v1h-4v-1Zm0,3h-4v-1h12v1h-8Zm5,1h3v1h-3v-1Zm1-4h3v1h-3v-1Zm-1,6h3v1h-3v-1Zm-24-3v-1h2v1h-2Zm-2-3h13v1H719v-1Zm8-8v1h-6v-1h6Zm8,0v1h-7v-1h7Zm5,1h-4v-1h4v1Zm22,6H719v-1h43v1Zm4,6h-5v-1h5v1Zm-8-3h6v1h-6v-1Zm-15,11v-1h4v1h-4Zm-2-3h7v1h-7v-1Zm-32,3h-2v-1h2v1Zm-2-8H694v-1h13v1Zm1-2h-2v-1h2v1Zm4-1v1h-2v-1h2Zm11,3H709v-1h14v1Zm-8-14h-6v-1h6v1Zm-10-3h18v1H705v-1Zm-2,1H688v-1h15v1Zm-23,0v-1h5v1h-5Zm41-4H676v-1h45v1Zm-10-2h-1v-1h1v1Zm2-4h-2v-1h2v1Zm-15-12h-4v-1h4v1Zm-8-2v-1h12v1H690Zm7-6H685v-1h12v1Zm-7-4h-4v-1h4v1Zm-2,2h-7v-1h7v1Zm-10,1h3v1h-3v-1Zm6,2v1h-5v-1h5Zm1,0h4v1h-4v-1Zm-5,6h2v1h-2v-1Zm5,1h-2v-1h2v1Zm-4-3h8v1h-8v-1Zm7-1H678v-1h10v1Zm-12,4v-1h2v1h-2Zm-4-5h5v1h-5v-1Zm8,3h-6v-1h6v1Zm15-11v1h-4v-1h4Zm2,3h-7v-1h7v1Zm51,5v1h-2v-1h2Zm16,10H736v-1h28v1Zm5,45h-9v-1h9v1Z"
                    transform="translate(-669 -431)"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="ui-text l">
              <h5>Space Domination</h5>
              <div className="t-o">
                <svg viewBox="0 0 101 67">
                  <path
                    d="M767,453h-1v-1h4v1h-3Zm1-22h1v1h-1v-1Zm-7,0h5v1h-5v-1Zm-9,0h4v1h-4v-1Zm-7,0h5v1h-5v-1Zm-4,0h2v1h-2v-1Zm-3,0h2v1h-2v-1Zm-2,0h1v1h-1v-1Zm17,3H735v-1h18v1Zm-20-3h2v1h-2v-1Zm-15,0h14v1H718v-1Zm16,3H715v-1h19v1Zm-37-3h18v1H697v-1Zm17,3H694v-1h20v1Zm-29-1h7v1h-7v-1Zm-4-2h10v1H681v-1Zm-12,0h9v1h-9v-1Zm15,3H669v-1h15v1Zm0,2H669v-1h15v1Zm-4,2H669v-1h11v1Zm-9,2h-2v-1h2v1Zm5-1v1h-4v-1h4Zm2,3h-9v-1h9v1Zm-7,2h-2v-1h2v1Zm0,2h-2v-1h2v1Zm4,2h-6v-1h6v1Zm-2,2h-4v-1h4v1Zm3,2h-7v-1h7v1Zm23,2H669v-1h30v1Zm-28,2h-2v-1h2v1Zm3-1v1h-2v-1h2Zm4,0v1h-3v-1h3Zm5,0v1h-4v-1h4Zm10,0v1h-8v-1h8Zm4,0v1h-3v-1h3Zm20,3H669v-1h48v1Zm-32,2H669v-1h16v1Zm-13,2h-3v-1h3v1Zm5-1v1h-4v-1h4Zm5,0v1h-2v-1h2Zm4,1v-1h4v1h-4Zm0-3h9v1h-9v-1Zm12,0v1h-1v-1h1Zm3,0v1h-1v-1h1Zm4,0v1h-2v-1h2Zm4,0v1h-3v-1h3Zm0,5H669v-1h40v1Zm-34,2h-6v-1h6v1Zm-5,32h-1v-1h1v1Zm45-18H671v-1h44v1Zm-38,18h-5v-1h5v1Zm9,0h-4v-1h4v1Zm7,0h-5v-1h5v1Zm4,0h-2v-1h2v1Zm3,0h-2v-1h2v1Zm2,0h-1v-1h1v1Zm-10-13v1h-2v-1h2Zm-7,10h18v1H685v-1Zm20,3h-2v-1h2v1Zm15,0H706v-1h14v1Zm-16-3h19v1H704v-1Zm37,3H723v-1h18v1Zm-17-3h20v1H724v-1Zm29,1h-7v-1h7v1Zm4,2H747v-1h10v1Zm12-2H754v-1h15v1Zm0-2H754v-1h15v1Zm0-2H758v-1h11v1Zm0-2h-2v-1h2v1Zm-7,0v-1h4v1h-4Zm7-2h-9v-1h9v1Zm0-2h-2v-1h2v1Zm0-2h-2v-1h2v1Zm0-2h-6v-1h6v1Zm0-2h-4v-1h4v1Zm0-2h-7v-1h7v1Zm0-2H739v-1h30v1Zm0-2h-2v-1h2v1Zm-5,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm-5,0v-1h4v1h-4Zm-10,0v-1h8v1h-8Zm-4,0v-1h3v1h-3Zm28-2H721v-1h48v1Zm0-2H753v-1h16v1Zm0-2h-3v-1h3v1Zm-8,0v-1h4v1h-4Zm-5,0v-1h2v1h-2Zm-4-1v1h-4v-1h4Zm0,3h-9v-1h9v1Zm-12,0v-1h1v1h-1Zm-3,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm40-4H729v-1h40v1Zm0-2h-6v-1h6v1Zm-25-20H731v-1h13v1Zm-12,2h-2v-1h2v1Zm-1-10h-2v-1h2v1Zm-2,2h-2v-1h2v1Zm0,2H716v-1h13v1Zm-6-2v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm10-2H715v-1h12v1Zm-11,2H701v-1h15v1Zm-4-2H696v-1h16v1Zm-23,11h3v1h-3v-1Zm1-6h3v1h-3v-1Zm3,3h-3v-1h3v1Zm5,11h4v1h-4v-1Zm3-11h-6v-1h6v1Zm-3-2h-4v-1h4v1Zm3-2h-3v-1h3v1Zm0,1h4v1h-4v-1Zm2-2h7v1h-7v-1Zm7,3h-3v-1h3v1Zm-7,1h10v1H703v-1Zm0,2h8v1h-8v-1Zm0,10h7v1h-7v-1Zm3-8h13v1H706v-1Zm5,8h6v1h-6v-1Zm15-9v-1h2v1h-2Zm-5,0v-1h2v1h-2Zm-2,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm14-2H715v-1h14v1Zm-15,2h-2v-1h2v1Zm-1-7h2v1h-2v-1Zm8,3h-7v-1h7v1Zm-4,10h15v1H717v-1Zm6,4h-5v-1h5v1Zm-2,1v1h-3v-1h3Zm2,0h6v1h-6v-1Zm10,3H715v-1h18v1Zm-17,4h-2v-1h2v1Zm6,1h2v1h-2v-1Zm33-5h-3v-1h3v1Zm-20,0v-1h15v1H735Zm-4-3h23v1H731v-1Zm27,2v1h-2v-1h2Zm-41,4h45v1H717v-1Zm10,2h1v1h-1v-1Zm-2,4h2v1h-2v-1Zm-5,2v1h-3v-1h3Zm-5,2h5v1h-5v-1Zm2,11h-2v-1h2v1Zm-8,7h2v1h-2v-1Zm0-2h13v1H709v-1Zm6,2v1h-2v-1h2Zm3,0v1h-2v-1h2Zm3,0v1h-2v-1h2Zm-10,2h12v1H711v-1Zm11-2h15v1H722v-1Zm4,2h16v1H726v-1Zm15-4h12v1H741v-1Zm7,4h4v1h-4v-1Zm2-2h7v1h-7v-1Zm10-1h-3v-1h3v1Zm-6-2v-1h5v1h-5Zm-1,0h-4v-1h4v1Zm-3-3h10v1H750v-1Zm12-3h-2v-1h2v1Zm-9-1h2v1h-2v-1Zm3,0h2v1h-2v-1Zm-7,3v-1h8v1h-8Zm-31-1h1v1h-1v-1Zm8,1h-2v-1h2v1Zm-9,3h7v1h-7v-1Zm6,2h2v1h-2v-1Zm4-5v-1h8v1h-8Zm-2,1h10v1H725v-1Zm3,2h3v1h-3v-1Zm0,2h7v1h-7v-1Zm5-2h4v1h-4v-1Zm4-2h6v1h-6v-1Zm0,4h3v1h-3v-1Zm3-2h4v1h-4v-1Zm0-6h4v1h-4v-1Zm0,3h-4v-1h12v1h-8Zm5,1h3v1h-3v-1Zm1-4h3v1h-3v-1Zm-1,6h3v1h-3v-1Zm-24-3v-1h2v1h-2Zm-2-3h13v1H719v-1Zm8-8v1h-6v-1h6Zm8,0v1h-7v-1h7Zm5,1h-4v-1h4v1Zm22,6H719v-1h43v1Zm4,6h-5v-1h5v1Zm-8-3h6v1h-6v-1Zm-15,11v-1h4v1h-4Zm-2-3h7v1h-7v-1Zm-32,3h-2v-1h2v1Zm-2-8H694v-1h13v1Zm1-2h-2v-1h2v1Zm4-1v1h-2v-1h2Zm11,3H709v-1h14v1Zm-8-14h-6v-1h6v1Zm-10-3h18v1H705v-1Zm-2,1H688v-1h15v1Zm-23,0v-1h5v1h-5Zm41-4H676v-1h45v1Zm-10-2h-1v-1h1v1Zm2-4h-2v-1h2v1Zm-15-12h-4v-1h4v1Zm-8-2v-1h12v1H690Zm7-6H685v-1h12v1Zm-7-4h-4v-1h4v1Zm-2,2h-7v-1h7v1Zm-10,1h3v1h-3v-1Zm6,2v1h-5v-1h5Zm1,0h4v1h-4v-1Zm-5,6h2v1h-2v-1Zm5,1h-2v-1h2v1Zm-4-3h8v1h-8v-1Zm7-1H678v-1h10v1Zm-12,4v-1h2v1h-2Zm-4-5h5v1h-5v-1Zm8,3h-6v-1h6v1Zm15-11v1h-4v-1h4Zm2,3h-7v-1h7v1Zm51,5v1h-2v-1h2Zm16,10H736v-1h28v1Zm5,45h-9v-1h9v1Z"
                    transform="translate(-669 -431)"
                  ></path>
                </svg>
                <svg viewBox="0 0 101 67">
                  <path
                    d="M767,453h-1v-1h4v1h-3Zm1-22h1v1h-1v-1Zm-7,0h5v1h-5v-1Zm-9,0h4v1h-4v-1Zm-7,0h5v1h-5v-1Zm-4,0h2v1h-2v-1Zm-3,0h2v1h-2v-1Zm-2,0h1v1h-1v-1Zm17,3H735v-1h18v1Zm-20-3h2v1h-2v-1Zm-15,0h14v1H718v-1Zm16,3H715v-1h19v1Zm-37-3h18v1H697v-1Zm17,3H694v-1h20v1Zm-29-1h7v1h-7v-1Zm-4-2h10v1H681v-1Zm-12,0h9v1h-9v-1Zm15,3H669v-1h15v1Zm0,2H669v-1h15v1Zm-4,2H669v-1h11v1Zm-9,2h-2v-1h2v1Zm5-1v1h-4v-1h4Zm2,3h-9v-1h9v1Zm-7,2h-2v-1h2v1Zm0,2h-2v-1h2v1Zm4,2h-6v-1h6v1Zm-2,2h-4v-1h4v1Zm3,2h-7v-1h7v1Zm23,2H669v-1h30v1Zm-28,2h-2v-1h2v1Zm3-1v1h-2v-1h2Zm4,0v1h-3v-1h3Zm5,0v1h-4v-1h4Zm10,0v1h-8v-1h8Zm4,0v1h-3v-1h3Zm20,3H669v-1h48v1Zm-32,2H669v-1h16v1Zm-13,2h-3v-1h3v1Zm5-1v1h-4v-1h4Zm5,0v1h-2v-1h2Zm4,1v-1h4v1h-4Zm0-3h9v1h-9v-1Zm12,0v1h-1v-1h1Zm3,0v1h-1v-1h1Zm4,0v1h-2v-1h2Zm4,0v1h-3v-1h3Zm0,5H669v-1h40v1Zm-34,2h-6v-1h6v1Zm-5,32h-1v-1h1v1Zm45-18H671v-1h44v1Zm-38,18h-5v-1h5v1Zm9,0h-4v-1h4v1Zm7,0h-5v-1h5v1Zm4,0h-2v-1h2v1Zm3,0h-2v-1h2v1Zm2,0h-1v-1h1v1Zm-10-13v1h-2v-1h2Zm-7,10h18v1H685v-1Zm20,3h-2v-1h2v1Zm15,0H706v-1h14v1Zm-16-3h19v1H704v-1Zm37,3H723v-1h18v1Zm-17-3h20v1H724v-1Zm29,1h-7v-1h7v1Zm4,2H747v-1h10v1Zm12-2H754v-1h15v1Zm0-2H754v-1h15v1Zm0-2H758v-1h11v1Zm0-2h-2v-1h2v1Zm-7,0v-1h4v1h-4Zm7-2h-9v-1h9v1Zm0-2h-2v-1h2v1Zm0-2h-2v-1h2v1Zm0-2h-6v-1h6v1Zm0-2h-4v-1h4v1Zm0-2h-7v-1h7v1Zm0-2H739v-1h30v1Zm0-2h-2v-1h2v1Zm-5,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm-5,0v-1h4v1h-4Zm-10,0v-1h8v1h-8Zm-4,0v-1h3v1h-3Zm28-2H721v-1h48v1Zm0-2H753v-1h16v1Zm0-2h-3v-1h3v1Zm-8,0v-1h4v1h-4Zm-5,0v-1h2v1h-2Zm-4-1v1h-4v-1h4Zm0,3h-9v-1h9v1Zm-12,0v-1h1v1h-1Zm-3,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm-4,0v-1h3v1h-3Zm40-4H729v-1h40v1Zm0-2h-6v-1h6v1Zm-25-20H731v-1h13v1Zm-12,2h-2v-1h2v1Zm-1-10h-2v-1h2v1Zm-2,2h-2v-1h2v1Zm0,2H716v-1h13v1Zm-6-2v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm-3,0v-1h2v1h-2Zm10-2H715v-1h12v1Zm-11,2H701v-1h15v1Zm-4-2H696v-1h16v1Zm-23,11h3v1h-3v-1Zm1-6h3v1h-3v-1Zm3,3h-3v-1h3v1Zm5,11h4v1h-4v-1Zm3-11h-6v-1h6v1Zm-3-2h-4v-1h4v1Zm3-2h-3v-1h3v1Zm0,1h4v1h-4v-1Zm2-2h7v1h-7v-1Zm7,3h-3v-1h3v1Zm-7,1h10v1H703v-1Zm0,2h8v1h-8v-1Zm0,10h7v1h-7v-1Zm3-8h13v1H706v-1Zm5,8h6v1h-6v-1Zm15-9v-1h2v1h-2Zm-5,0v-1h2v1h-2Zm-2,0v-1h1v1h-1Zm-4,0v-1h2v1h-2Zm14-2H715v-1h14v1Zm-15,2h-2v-1h2v1Zm-1-7h2v1h-2v-1Zm8,3h-7v-1h7v1Zm-4,10h15v1H717v-1Zm6,4h-5v-1h5v1Zm-2,1v1h-3v-1h3Zm2,0h6v1h-6v-1Zm10,3H715v-1h18v1Zm-17,4h-2v-1h2v1Zm6,1h2v1h-2v-1Zm33-5h-3v-1h3v1Zm-20,0v-1h15v1H735Zm-4-3h23v1H731v-1Zm27,2v1h-2v-1h2Zm-41,4h45v1H717v-1Zm10,2h1v1h-1v-1Zm-2,4h2v1h-2v-1Zm-5,2v1h-3v-1h3Zm-5,2h5v1h-5v-1Zm2,11h-2v-1h2v1Zm-8,7h2v1h-2v-1Zm0-2h13v1H709v-1Zm6,2v1h-2v-1h2Zm3,0v1h-2v-1h2Zm3,0v1h-2v-1h2Zm-10,2h12v1H711v-1Zm11-2h15v1H722v-1Zm4,2h16v1H726v-1Zm15-4h12v1H741v-1Zm7,4h4v1h-4v-1Zm2-2h7v1h-7v-1Zm10-1h-3v-1h3v1Zm-6-2v-1h5v1h-5Zm-1,0h-4v-1h4v1Zm-3-3h10v1H750v-1Zm12-3h-2v-1h2v1Zm-9-1h2v1h-2v-1Zm3,0h2v1h-2v-1Zm-7,3v-1h8v1h-8Zm-31-1h1v1h-1v-1Zm8,1h-2v-1h2v1Zm-9,3h7v1h-7v-1Zm6,2h2v1h-2v-1Zm4-5v-1h8v1h-8Zm-2,1h10v1H725v-1Zm3,2h3v1h-3v-1Zm0,2h7v1h-7v-1Zm5-2h4v1h-4v-1Zm4-2h6v1h-6v-1Zm0,4h3v1h-3v-1Zm3-2h4v1h-4v-1Zm0-6h4v1h-4v-1Zm0,3h-4v-1h12v1h-8Zm5,1h3v1h-3v-1Zm1-4h3v1h-3v-1Zm-1,6h3v1h-3v-1Zm-24-3v-1h2v1h-2Zm-2-3h13v1H719v-1Zm8-8v1h-6v-1h6Zm8,0v1h-7v-1h7Zm5,1h-4v-1h4v1Zm22,6H719v-1h43v1Zm4,6h-5v-1h5v1Zm-8-3h6v1h-6v-1Zm-15,11v-1h4v1h-4Zm-2-3h7v1h-7v-1Zm-32,3h-2v-1h2v1Zm-2-8H694v-1h13v1Zm1-2h-2v-1h2v1Zm4-1v1h-2v-1h2Zm11,3H709v-1h14v1Zm-8-14h-6v-1h6v1Zm-10-3h18v1H705v-1Zm-2,1H688v-1h15v1Zm-23,0v-1h5v1h-5Zm41-4H676v-1h45v1Zm-10-2h-1v-1h1v1Zm2-4h-2v-1h2v1Zm-15-12h-4v-1h4v1Zm-8-2v-1h12v1H690Zm7-6H685v-1h12v1Zm-7-4h-4v-1h4v1Zm-2,2h-7v-1h7v1Zm-10,1h3v1h-3v-1Zm6,2v1h-5v-1h5Zm1,0h4v1h-4v-1Zm-5,6h2v1h-2v-1Zm5,1h-2v-1h2v1Zm-4-3h8v1h-8v-1Zm7-1H678v-1h10v1Zm-12,4v-1h2v1h-2Zm-4-5h5v1h-5v-1Zm8,3h-6v-1h6v1Zm15-11v1h-4v-1h4Zm2,3h-7v-1h7v1Zm51,5v1h-2v-1h2Zm16,10H736v-1h28v1Zm5,45h-9v-1h9v1Z"
                    transform="translate(-669 -431)"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <section id="header">
            <div className="wrap">
              {/* {
                                ["t", "b"].map(function (n) {
                                    return (
                                        <div className={"ui-inner-border " + n} key={"UIInnerBorder" + n}>
                                            {
                                                n === "b" && <button id="button" htmlFor="menu-toggle">
                                                    <span className="border"></span>
                                                    <div className="roulette"></div>
                                                </button>
                                            }
                                        </div>
                                    )
                                })
                            } */}
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
                    <div className="text-box" id="finance">
                      <div className="scroll-content">
                        {/* <h2>
                                                    Transforming Finance: Digital Dollar Blockchain
                                                </h2> */}
                        <svg viewBox="0 -20 1320 150">
                          <text x="50%" y="30%" textAnchor="middle">
                            Transforming Finance:
                          </text>
                          <text x="50%" y="80%" textAnchor="middle">
                            Digital Dollar Blockchain
                          </text>
                        </svg>
                        <p>
                          The Digital Dollar Blockchain Corporation (DDBC) is
                          rewriting the narrative of financial technology,
                          pioneering an integration with the digital universe.
                          Our cutting-edge blockchain, crafted for optimum
                          security, lucidity, and ease of access, revolutionizes
                          digital currency transactions, making them as simple
                          as sending a text. Our primary offering, the Digital
                          Dollar (DD), offers the constancy of the USD within
                          the digital world, redefining the dynamics of digital
                          currencies. Experience the evolution of finance--
                          amplified.
                        </p>
                      </div>
                    </div>
                    <div className="text-box" id="mission">
                      <div className="scroll-content">
                        {/* <h2>Our Mission</h2> */}
                        <svg viewBox="0 -20 1320 70">
                          <text x="50%" y="50%" textAnchor="middle">
                            Our Mission
                          </text>
                        </svg>
                        <p>
                          Our aspiration is a future where digital currencies
                          are standard, and financial operations are as
                          effortless as sending a message. DDBC leads this
                          transformation, prioritizing superior standards of
                          regulatory compliance, risk mitigation, and security.
                          We are not merely engineering a digital currency; we
                          are nurturing trust in a digital universe,
                          interconnected modern necessity.
                        </p>
                      </div>
                    </div>
                    <div className="text-box" id="features">
                      <div className="scroll-content">
                        {/* <h2>Innovative Features of our Blockchain</h2> */}
                        <svg viewBox="0 -20 1320 150">
                          <text x="50%" y="30%" textAnchor="middle">
                            Innovative Features
                          </text>
                          <text x="50%" y="80%" textAnchor="middle">
                            of our Blockchain
                          </text>
                        </svg>
                        <p>
                          The Digital Dollar Blockchain (DDBC) offers an
                          entirely he Digital Dollar Blockchain (DDBC) offers an
                          entirely open-market platform, distinguished by its
                          unique benefits. An important feature is that no
                          tokens are owned by the platform proprietors. This
                          ensures that the value of each digital dollar token
                          (DD) is governed by the decisions and activities of
                          users within the marketplace, devoid of influence from
                          a concentrated ownership group. Each DD reflects the
                          economic activities of its users, safeguarded against
                          manipulation.
                        </p>
                        <p>
                          Our non-profit status further differentiates us,
                          positioning us to serve the common user. Our principal
                          motivation is facilitating secure, effective, and fair
                          transactions for all, rather than chasing profits.
                          This democratization of financial services promotes
                          wider user participation, enhancing the strength and
                          flexibility of our platform.
                        </p>
                        <p>
                          Our native token, Karma, introduces a groundbreaking
                          method of managing transaction fees, popularly known
                          as 'gas fees'. Rather than accruing costs with each
                          transaction, users earn Karma points, which are used
                          to cover transaction fees. This innovative model
                          removes the deterrent of transaction costs, enabling
                          free participation in economic activities. This
                          feature particularly benefits those engaging in
                          micro-transactions, who would otherwise be
                          significantly impeded by gas fees.
                        </p>
                        <p>
                          Additionally, our interoperability connections across
                          multiple blockchains, providing users a seamless
                          experience. This feature offers users the flexibility
                          to transact across different ecosystems with ease.
                        </p>
                        <p>
                          Moreover, DDBC's strict observance of regulatory
                          compliance, transparency, and meticulous approval
                          processes means users can trust the platform and feel
                          assured about the safety of their transactions. This
                          assurance is invaluable in the digital currency
                          sphere, where trust is often a significant hurdle for
                          potential users.
                        </p>
                        <p>
                          The Digital Dollar Blockchain, thus, offers a unique
                          platform amalgamating the advantages of blockchain
                          technology with a user-centric design, delivering an
                          accessible, transparent, and unrestricted marketplace.
                          Its benefits are set to attract everyday users looking
                          to engage with digital currencies without concerns
                          about volatile values, high transaction costs, or
                          complex processes.
                        </p>
                      </div>
                    </div>
                    <div className="text-box" id="commitment">
                      <div className="scroll-content">
                        {/* <h2 className="bheader text-center ">Our Commitment</h2> */}
                        <svg viewBox="0 -20 1320 70">
                          <text x="50%" y="50%" textAnchor="middle">
                            Our Commitment
                          </text>
                        </svg>
                        <p>
                          In striving to create a secure and transparent digital
                          currency ecosystem, we comply with rigorous
                          operational guidelines:
                        </p>
                        <p>
                          <strong> Sole Existence:</strong> DD is exclusively
                          present on our blockchain, guarding against fraudulent
                          activities and enjoying the benefits of multiple
                          blockchains. Collateralized Agreements: We guarantee
                          appropriate collateral for all smart contracts,
                          minimizing default risk and leveraging advanced smart
                          contract abilities. Thorough Approval Procedures: All
                          smart contracts are meticulously audited, insured,
                          assigned a risk rating, and displayed publicly,
                          fortified by our robust infrastructure. Ecosystem
                          Enhancement: Every contract aims to add value to the
                          DDBC ecosystem and contribute to the growth of the our
                          connected network. Transparency: While contracts can
                          be private, their safety is ensured during audits, and
                          our connection to cross-channel communication.
                        </p>
                      </div>
                    </div>
                    <div className="text-box" id="tokens">
                      <div className="scroll-content">
                        {/* <h2 className="bheader text-center ">Our Tokens</h2> */}
                        <svg viewBox="0 -20 1320 70">
                          <text x="50%" y="50%" textAnchor="middle">
                            Our Tokens
                          </text>
                        </svg>
                        <h3>Digital Dollar (DD)</h3>
                        <p>
                          The DD is a digital asset uniting the stability of the
                          US Dollar with the prowess of blockchain technology.
                          Fully collateralized and backed 1:1 with USD, DD
                          promises stability and transparency, offering users a
                          dependable, secure, and convenient digital currency.
                          The Digital Dollar Funds are never overleveraged, and
                          public API access to the Corporate Bank account
                          assures that the Fiat Balance matches the Digital
                          Dollar total supply at all times..
                        </p>
                        <h3>Karma</h3>
                        <p>
                          Alongside DD, we also employ Karma, a native token
                          without monetary value. It cannot be bought, sold, or
                          transferred, but rewards participants contributing to
                          the platform. It serves as a transaction fee and
                          grants VIP access to certain benefits within
                          ecosystems such as communities or events.
                        </p>
                        <h3>Auditor Rewards</h3>
                        <p>
                          To maintain the highest standards, we provide auditors
                          and review committee members with a portion of
                          contract revenues, further fortified by our robust
                          infrastructure. In case of contract failure, penalties
                          apply, motivating meticulous review and oversight
                        </p>
                        <h3>Experience the Digital Dollar</h3>
                        <p>
                          We are currently privately live, offering a sneak peek
                          into the future through our platformk. Experience now
                          the future generation of digital currency, amplified
                          by the DDBC.
                        </p>
                      </div>
                    </div>
                    <div className="text-box" id="login">
                      <div className="scroll-content">
                        {/* <h2 className="bheader text-center">Testing DDBC:</h2> */}
                        <svg viewBox="0 -20 1320 70">
                          <text x="50%" y="50%" textAnchor="middle">
                            Testing DDBC:
                          </text>
                        </svg>
                        <Step1 />
                        {/* <Step2/> */}
                        <Step3 />
                        <Step4 />
                        <Step5 />
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
