import React, { useState } from "react";
import ddbc from "../../images/logo.jpeg";
import { ClipLoader } from "react-spinners";

const MintNft = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");

  function getImage() {
    console.log("getImage");
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      key: "gefoSgufaEXppF3pOlYfJ0OVSop4mY9c0SqVnmeYhpBsclx8e9fPeCLm3P17",
      prompt: promptMessage,
      negative_prompt: null,
      width: "512",
      height: "512",
      samples: "1",
      num_inference_steps: "20",
      seed: null,
      guidance_scale: 7.5,
      safety_checker: "yes",
      multi_lingual: "no",
      panorama: "no",
      self_attention: "no",
      upscale: "no",
      embeddings_model: null,
      webhook: null,
      track_id: null,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://stablediffusionapi.com/api/v3/text2img", requestOptions)
      .then((response) => response.json()) // Parse response as JSON
      .then((result) => {
        console.log(result);
        if (
          result.status === "success" &&
          result.output &&
          result.output.length > 0
        ) {
          // Set the image URL in state
          setImageUrl(result.output[0]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        console.log("error", error);
      });
  }

  return (
    <div>
      <h3 className="pt-3">Mint Your First NFT on DDBC Using AI</h3>

      <div className="text-center pt-2">
        <input
          type="text"
          placeholder="Enter a prompt to generate an image for you to mint as an NFT with
          Wealth Wallet"
          value={promptMessage}
          onChange={(e) => setPromptMessage(e.target.value)}
        />
        {loading ? (
          <>
            <div className="ddbc-mint py-5">
              <ClipLoader size={75} color="#00ffc3" />
            </div>
          </>
        ) : imageUrl ? (
          <img className="ddbc-mint" src={imageUrl} alt="Generated NFT" />
        ) : (
          <img className="ddbc-mint" src={ddbc} alt="DDBC logo" />
        )}
      </div>

      <div className="py-3">
        <button onClick={getImage} className="button-submit">
          Generate
        </button>
      </div>
    </div>
  );
};

export default MintNft;
