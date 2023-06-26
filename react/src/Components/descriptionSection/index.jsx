import React, { useState } from "react";

import Step6 from "../step6";
import Step1 from "../step1";
import Step2 from "../step2";
import Tab1 from "../tab1";

const DescriptionSection = (props) => {
  const { activeTab, setActiveTab } = props;

  return (
    <>
      {/* TRANSFORMING FINANCE  */}
      {activeTab === "tab1" && <Tab1 />}
      {/* MISSION  */}
      {activeTab === "tab2" && (
        <div className="text-box" id="mission">
          <div className="scroll-content">
            <svg viewBox="0 -20 1320 70">
              <text x="50%" y="50%" textAnchor="middle">
                Our Mission
              </text>
            </svg>
            <p>
              Our aspiration is a future where digital currencies are standard,
              and financial operations are as effortless as sending a message.
              DDBC leads this transformation, prioritizing superior standards of
              regulatory compliance, risk mitigation, and security. We are not
              merely engineering a digital currency; we are nurturing trust in a
              digital universe, interconnected modern necessity.
            </p>
          </div>
        </div>
      )}
      {/* INNOVATIVE FEATURES  */}
      {activeTab === "tab3" && (
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
          </div>
        </div>
      )}
      {/* OUR COMMITMENT  */}
      {activeTab === "tab4" && (
        <div className="text-box" id="commitment">
          <div className="scroll-content">
            <svg viewBox="0 -20 1320 70">
              <text x="50%" y="50%" textAnchor="middle">
                Our Commitment
              </text>
            </svg>
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
          </div>
        </div>
      )}

      {/* OUR TOKENS  */}
      {activeTab === "tab5" && (
        <div className="text-box" id="tokens">
          <div className="scroll-content">
            <svg viewBox="0 -20 1320 70">
              <text x="50%" y="50%" textAnchor="middle">
                Our Tokens
              </text>
            </svg>
            <h3>Digital Dollar (DD)</h3>
            <p>
              The DD is a digital asset uniting the stability of the US Dollar
              with the prowess of blockchain technology. Fully collateralized
              and backed 1:1 with USD, DD promises stability and transparency,
              offering users a dependable, secure, and convenient digital
              currency. The Digital Dollar Funds are never overleveraged, and
              public API access to the Corporate Bank account assures that the
              Fiat Balance matches the Digital Dollar total supply at all
              times..
            </p>
            <h3>Karma</h3>
            <p>
              Alongside DD, we also employ Karma, a native token without
              monetary value. It cannot be bought, sold, or transferred, but
              rewards participants contributing to the platform. It serves as a
              transaction fee and grants VIP access to certain benefits within
              ecosystems such as communities or events.
            </p>
            <h3>Auditor Rewards</h3>
            <p>
              To maintain the highest standards, we provide auditors and review
              committee members with a portion of contract revenues, further
              fortified by our robust infrastructure. In case of contract
              failure, penalties apply, motivating meticulous review and
              oversight
            </p>
            <h3>Experience the Digital Dollar</h3>
            <p>
              We are currently privately live, offering a sneak peek into the
              future through our platformk. Experience now the future generation
              of digital currency, amplified by the DDBC.
            </p>
          </div>
        </div>
      )}
      {/* STEPS TO GET STARTED */}
      {activeTab === "tab6" && (
        <div className="text-box" id="login">
          <div className="scroll-content">
            <svg viewBox="0 -20 1320 70">
              <text x="50%" y="50%" textAnchor="middle">
                Testing DDBC:
              </text>
            </svg>
            <Step1 />
            <Step2 />
            <Step6 />
          </div>
        </div>
      )}
    </>
  );
};

export default DescriptionSection;
