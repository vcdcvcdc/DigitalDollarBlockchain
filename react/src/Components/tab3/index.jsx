import React from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";

import dd from "../../images/icons/DD.svg";
import trust from "../../images/icons/Trust.svg";
import fair from "../../images/icons/FairFinance.svg";
import empowered from "../../images/icons/Empowered.svg";
import digital from "../../images/icons/DigitalEngagement.svg";
import blockchains from "../../images/icons/Blockchains.svg";
import freeFee from "../../images/icons/FreeFee.svg";

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
            <div className="row py-4 ">
              <div className="col-md-8 col-12 order-md-0 order-1">
                <h5 className="py-3 text-md-left">Fee-Free Economy</h5>
                <p className="text-md-left">
                  Introducing Karma, our native token that revolutionizes
                  transaction fees. With the innovative 'gas fee' management,
                  users earn Karma points instead of incurring costs for each
                  transaction, effectively covering the fees. This
                  groundbreaking model eliminates transaction costs, enabling
                  free participation in economic activities. It especially
                  benefits micro-transaction users who would otherwise face
                  significant obstacles due to gas fees.
                </p>
              </div>
              <div className="col-md-4 col-12 order-md-1 order-0">
                <img
                  src={freeFee}
                  alt="Fee Free"
                  className="img-fluid floating-image"
                />
              </div>
            </div>

            <div className="row py-4 ">
              <div className="col-md-4 col-12">
                <img
                  src={digital}
                  alt="Hassle-Free Digital Engagement"
                  className="img-fluid floating-image"
                />
              </div>
              <div className="col-md-8 col-12">
                <h5 className="py-3 text-md-right">
                  Hassle-Free Digital Engagement
                </h5>
                <p className="text-md-right">
                  The Digital Dollar Blockchain is a user-centric platform that
                  combines blockchain advantages. It offers an accessible,
                  transparent marketplace, attracting everyday users seeking
                  hassle-free engagement with digital currencies. Say goodbye to
                  volatile values, high costs, and complexity as our platform
                  addresses these concerns effectively.
                </p>
              </div>
            </div>

            <div className="row py-4 ">
              <div className="col-md-8 col-12 order-md-0 order-1">
                <h5 className="py-3 text-md-left">Building Trust</h5>
                <p className="text-md-left">
                  Moreover, DDBC's strict observance of regulatory compliance,
                  transparency, and meticulous approval processes means users
                  can trust the platform and feel assured about the safety of
                  their transactions. This assurance is invaluable in the
                  digital currency sphere, where trust is often a significant
                  hurdle for potential users.
                </p>
              </div>
              <div className="col-md-4 col-12 order-md-1 order-0">
                <img
                  src={trust}
                  alt="trust"
                  className="img-fluid floating-image"
                />
              </div>
            </div>

            <div className="row py-4 ">
              <div className="col-md-4 col-12">
                <img
                  src={fair}
                  alt="fair finance"
                  className="img-fluid floating-image"
                />
              </div>
              <div className="col-md-8 col-12">
                <h5 className="py-3 text-md-right">Fair Finance</h5>
                <p className="text-md-right">
                  As a non-profit, we prioritize secure, fair transactions,
                  serving the common user. We focus on democratizing financial
                  services over chasing profits, encouraging wider user
                  participation and enhancing platform flexibility.
                </p>
              </div>
            </div>

            <div className="row py-4 ">
              <div className="col-md-8 col-12 order-md-0 order-1">
                <h5 className="py-3 text-md-left">User Empowered</h5>
                <p className="text-md-left">
                  The Digital Dollar Blockchain (DDBC) is an open-market
                  platform with unique benefits. Unlike other platforms, DDBC
                  doesn't have token ownership by proprietors. This ensures that
                  the value of each Digital Dollar token (DD) is determined by
                  user decisions and activities, preventing manipulation.
                </p>
              </div>
              <div className="col-md-4 col-12 order-md-1 order-0">
                <img
                  src={empowered}
                  alt="User Empowered"
                  className="img-fluid floating-image"
                />
              </div>
            </div>

            <div className="row py-4 ">
              <div className="col-md-4 col-12">
                <img
                  src={blockchains}
                  alt="Connecting Blockchains"
                  className="img-fluid floating-image"
                />
              </div>
              <div className="col-md-8 col-12">
                <h5 className="py-3 text-md-right">Connecting Blockchains</h5>
                <p className="text-md-right">
                  Additionally, our interoperability connections across multiple
                  blockchains, providing users a seamless experience. This
                  feature offers users the flexibility to transact across
                  different ecosystems with ease.
                </p>
              </div>
            </div>
          </Text>
        </div>
      </div>
    </Animator>
  );
}

export default Tab3;
