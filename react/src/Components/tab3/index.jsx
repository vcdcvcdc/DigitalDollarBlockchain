import React, { useEffect, useState } from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";
import Typist from "react-typist";

function Tab3() {
  useEffect(() => {
    const audio = new Audio("https://next.arwes.dev/assets/sounds/type.webm");
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  return (
    <Animator>
      <div className="text-box" id="features">
        <div className="scroll-content">
          <svg viewBox="0 -20 1320 150">
            <text x="50%" y="30%" textAnchor="middle">
              Innovative Features
            </text>
            <text x="50%" y="80%" textAnchor="middle">
              of our Blockchain
            </text>
          </svg>
          <Text as="p" style={{ color: "#ddd" }}>
            <p>
              The Digital Dollar Blockchain (DDBC) offers an entirely he Digital
              Dollar Blockchain (DDBC) offers an entirely open-market platform,
              distinguished by its unique benefits. An important feature is that
              no tokens are owned by the platform proprietors. This ensures that
              the value of each digital dollar token (DD) is governed by the
              decisions and activities of users within the marketplace, devoid
              of influence from a concentrated ownership group. Each DD reflects
              the economic activities of its users, safeguarded against
              manipulation.
            </p>
            <p>
              Our non-profit status further differentiates us, positioning us to
              serve the common user. Our principal motivation is facilitating
              secure, effective, and fair transactions for all, rather than
              chasing profits. This democratization of financial services
              promotes wider user participation, enhancing the strength and
              flexibility of our platform.
            </p>
            <p>
              Our native token, Karma, introduces a groundbreaking method of
              managing transaction fees, popularly known as 'gas fees'. Rather
              than accruing costs with each transaction, users earn Karma
              points, which are used to cover transaction fees. This innovative
              model removes the deterrent of transaction costs, enabling free
              participation in economic activities. This feature particularly
              benefits those engaging in micro-transactions, who would otherwise
              be significantly impeded by gas fees.
            </p>
            <p>
              Additionally, our interoperability connections across multiple
              blockchains, providing users a seamless experience. This feature
              offers users the flexibility to transact across different
              ecosystems with ease.
            </p>
            <p>
              Moreover, DDBC's strict observance of regulatory compliance,
              transparency, and meticulous approval processes means users can
              trust the platform and feel assured about the safety of their
              transactions. This assurance is invaluable in the digital currency
              sphere, where trust is often a significant hurdle for potential
              users.
            </p>
            <p>
              The Digital Dollar Blockchain, thus, offers a unique platform
              amalgamating the advantages of blockchain technology with a
              user-centric design, delivering an accessible, transparent, and
              unrestricted marketplace. Its benefits are set to attract everyday
              users looking to engage with digital currencies without concerns
              about volatile values, high transaction costs, or complex
              processes.
            </p>
          </Text>
        </div>
      </div>
    </Animator>
  );
}

export default Tab3;
