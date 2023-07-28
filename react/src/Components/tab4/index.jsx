import React from "react";
import { Animator } from "@arwes/react-animator";
import { Text } from "@arwes/react-text";
import dd from "../../images/icons/DD.svg";
import karma from "../../images/icons/Kamra.svg";
import rewards from "../../images/icons/Rewards.svg";
import experience from "../../images/icons/experience.svg";

function Tab4() {
  return (
    <Animator>
      <div className="text-box text-box-absolute" id="tokens">
        <div className="scroll-content">
          <svg viewBox="0 -20 1320 70">
            <text x="50%" y="50%" textAnchor="middle">
              Our Tokens
            </text>
          </svg>

          <div className="row">
            <div className="col-md-6 col-12">
              <div className="h-100">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="pr-3">
                    <img src={dd} alt="" />
                  </div>
                  <h3>Digital Dollar (DD)</h3>
                </div>
                <Text as="p" style={{ color: "#ddd" }}>
                  The DD combines the stability of the US Dollar with blockchain
                  technology. It is fully collateralized and backed 1:1 with
                  USD, ensuring stability and transparency. Users can rely on DD
                  as a secure and convenient digital currency. The Digital
                  Dollar Funds are never overleveraged, and public API access to
                  the Corporate Bank account guarantees that the Fiat Balance
                  matches the Digital Dollar total supply at all times.
                </Text>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="h-100">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="pr-3">
                    <img src={karma} alt="" />
                  </div>
                  <h3>Karma</h3>
                </div>
                <Text as="p" style={{ color: "#ddd" }}>
                  Alongside DD, we also employ Karma, a native token without
                  monetary value. It cannot be bought, sold, or transferred, but
                  rewards participants contributing to the platform. It serves
                  as a transaction fee and grants VIP access to certain benefits
                  within ecosystems such as communities or events.
                </Text>
              </div>
            </div>
            <div className="col-md-6 col-12 pt-md-3">
              <div className="h-100">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="pr-3">
                    <img src={rewards} alt="" />
                  </div>
                  <h3>Auditor Rewards</h3>
                </div>
                <Text as="p" style={{ color: "#ddd" }}>
                  To maintain the highest standards, we provide auditors and
                  review committee members with a portion of contract revenues,
                  further fortified by our robust infrastructure. In case of
                  contract failure, penalties apply, motivating meticulous
                  review and oversight
                </Text>
              </div>
            </div>
            <div className="col-md-6 col-12 pt-md-3">
              <div className="h-100">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="pr-3">
                    <img src={experience} alt="" />
                  </div>
                  <h3>Experience the Digital Dollar</h3>
                </div>
                <Text as="p" style={{ color: "#ddd" }}>
                  We are currently privately live, offering a sneak peek into
                  the future through our platform. Experience now the future
                  generation of digital currency, amplified by the DDBC.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Animator>
  );
}

export default Tab4;
