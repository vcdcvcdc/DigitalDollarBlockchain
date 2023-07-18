import React, { useState } from "react";
import twitter from "../../images/twitter-icon.svg";
import telegram from "../../images/telegram-icon.svg";

const ContactUs = () => {
  return (
    <>
      <div>
        <h3 className="pt-md-5 pt-3">
          Contact us to explore the future of digital finance.
        </h3>
        {/* <p className=" m-auto py-3 px-5">
        After you have created your token on the DDBC, you can import your token
        to the WealthWallet and start testing your token.
      </p> */}

        <div className="container">
          <form action="https://formspree.io/f/xrgwbgrd" method="POST">
            <div className="row pt-3">
              <div className="col-md-6 col-12 text-md-right">
                <input
                  required
                  className="w-75"
                  type="text"
                  placeholder="Name"
                  name="name"
                />
                <input
                  required
                  name="email"
                  className="w-75"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="col-md-6 col-12 text-md-left pt-md-2">
                <textarea
                  required
                  className="w-75 text-area-contact-us pt-2 pl-2"
                  name="message"
                  placeholder="Message"
                />
              </div>
            </div>
            <div className="py-3">
              <button type="submit" className="button-submit">
                Submit
              </button>
            </div>
          </form>

          <div className="row justify-content-center pt-4 pb-5">
            <div className="col-12 text-center d-flex justify-content-center">
              <a
                href="https://twitter.com/DigitalDollarAs"
                target="_blank"
                className="circle-socials pointer"
              >
                <img src={twitter} alt="twitter" />
              </a>
              <a
                href="https://t.me/digitaldollarblockchain"
                target="_blank"
                className="circle-socials pointer"
              >
                <img
                  src={telegram}
                  style={{ maxWidth: "35px" }}
                  alt="telegram"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
