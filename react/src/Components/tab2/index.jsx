import React, { useEffect, useState } from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";
import Typist from "react-typist";

function Tab2() {
  return (
    <Animator>
      <div className="text-box" id="mission">
        <div className="scroll-content">
          <svg viewBox="0 -20 1320 70">
            <text x="50%" y="50%" textAnchor="middle">
              Our Mission
            </text>
          </svg>
          <Text as="p" style={{ color: "#ddd" }}>
            Our aspiration is a future where digital currencies are standard,
            and financial operations are as effortless as sending a message.
            DDBC leads this transformation, prioritizing superior standards of
            regulatory compliance, risk mitigation, and security. We are not
            merely engineering a digital currency; we are nurturing trust in a
            digital universe, interconnected modern necessity.
          </Text>
          <svg viewBox="0 -20 1320 70">
            <text x="50%" y="50%" textAnchor="middle">
              Our Commitment
            </text>
          </svg>
          <Text as="p" style={{ color: "#ddd" }}>
            <p>
              In striving to create a secure and transparent digital currency
              ecosystem, we comply with rigorous operational guidelines:
            </p>
            <p>
              <strong> Sole Existence:</strong> DD is exclusively present on our
              blockchain, guarding against fraudulent activities and enjoying
              the benefits of multiple blockchains. Collateralized Agreements:
              We guarantee appropriate collateral for all smart contracts,
              minimizing default risk and leveraging advanced smart contract
              abilities. Thorough Approval Procedures: All smart contracts are
              meticulously audited, insured, assigned a risk rating, and
              displayed publicly, fortified by our robust infrastructure.
              Ecosystem Enhancement: Every contract aims to add value to the
              DDBC ecosystem and contribute to the growth of the our connected
              network. Transparency: While contracts can be private, their
              safety is ensured during audits, and our connection to
              cross-channel communication.
            </p>
          </Text>
        </div>
      </div>
    </Animator>
  );
}

export default Tab2;
