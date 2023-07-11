import React from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";

function Tab3() {
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
            <h3 className="pt-3">User Empowered</h3>
            <p>
              The Digital Dollar Blockchain (DDBC) is an open-market platform with unique benefits.
              Unlike other platforms, DDBC doesn't have token ownership by proprietors. This ensures
              that the value of each Digital Dollar token (DD) is determined by user decisions and
              activities, preventing manipulation.
            </p>
            <h3 className="pt-3">Fair Finance</h3>
            <p>
              As a non-profit, we prioritize secure, fair transactions, serving the common user.
              We focus on democratizing financial services over chasing profits, encouraging
              wider user participation and enhancing platform flexibility.
            </p>
            <h3 className="pt-3">Fee-Free Economy</h3>
            <p>
              Introducing Karma, our native token that revolutionizes transaction
              fees. With the innovative 'gas fee' management, users earn Karma points
              instead of incurring costs for each transaction, effectively covering
              the fees. This groundbreaking model eliminates transaction costs, enabling
              free participation in economic activities. It especially benefits micro-transaction
              users who would otherwise face significant obstacles due to gas fees.
            </p>
            <h3 className="pt-3">Connecting Blockchains</h3>
            <p>
              Additionally, our interoperability connections across multiple
              blockchains, providing users a seamless experience. This feature
              offers users the flexibility to transact across different
              ecosystems with ease.
            </p>
            <h3 className="pt-3">Building Trust</h3>
            <p>
              Moreover, DDBC's strict observance of regulatory compliance,
              transparency, and meticulous approval processes means users can
              trust the platform and feel assured about the safety of their
              transactions. This assurance is invaluable in the digital currency
              sphere, where trust is often a significant hurdle for potential
              users.
            </p>
            <h3 className="pt-3">Hassle-Free Digital Engagement</h3>
            <p>
              The Digital Dollar Blockchain is a user-centric platform that combines
              blockchain advantages. It offers an accessible, transparent marketplace,
              attracting everyday users seeking hassle-free engagement with digital currencies.
              Say goodbye to volatile values, high costs, and complexity as our platform addresses
              these concerns effectively.
            </p>
          </Text>
        </div>
      </div>
    </Animator>
  );
}

export default Tab3;
