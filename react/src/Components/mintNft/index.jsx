import React, { useState, useContext } from "react";
import ddbc from "../../images/logo.jpeg";
import { ClipLoader } from "react-spinners";
import MintBtn from "../mintBtn";
import WWDetailsContext from "../../contexts/wwDetailsContext";
import contract from "../../data/contracts.json";
import { create as ipfsHttpClient } from "ipfs-http-client";

const MintNft = () => {
  const wwDetails = useContext(WWDetailsContext);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const [uploadIpfs, setUploadIpfs] = useState(false);
  const [metadata, setMetadata] = useState("");

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
          handleIpfsUpload(result.output[0]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        console.log("error", error);
      });
  }

  const projectId = process.env.REACT_APP_INFURA_IPFS_PROJECT_ID;
  const projectSecret = process.env.REACT_APP_INFURA_IPFS_PROJECT_SECRET;
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  const handleIpfsUpload = async (image) => {
    if (uploadIpfs) return;
    else if (uploadIpfs === false) setUploadIpfs(true);

    const metadata = await ipfs.add(
      JSON.stringify({
        name: "Digital Dollar NFT",
        description: promptMessage,
        image: image,
      })
    );
    console.log(
      "METADATA",
      "https://cloudflare-ipfs.com/ipfs/" + metadata.path
    );

    setMetadata("https://cloudflare-ipfs.com/ipfs/" + metadata.path);

    // you can upload again
    setUploadIpfs(false);
  };

  return (
    <div>
      <h3 className="pt-3">Mint Your First NFT on DDBC Using AI</h3>

      <div className="text-center pt-2">
        {loading ? (
          <>
            <div className="ddbc-mint py-5 m-auto">
              <ClipLoader size={75} color="#00ffc3" />
            </div>
          </>
        ) : imageUrl ? (
          <img className="ddbc-mint" src={imageUrl} alt="Generated NFT" />
        ) : (
          <img className="ddbc-mint" src={ddbc} alt="DDBC logo" />
        )}
        <input
          type="text"
          placeholder="Enter a prompt to generate an image for you to mint as an NFT with
          Wealth Wallet"
          value={promptMessage}
          onChange={(e) => setPromptMessage(e.target.value)}
        />
      </div>

      <div className="py-3 d-flex justify-content-center">
        <div className="px-3">
          <button onClick={getImage} className="button-submit">
            Generate
          </button>
        </div>
        <div className="px-3">
          <MintBtn
            wwDetails={wwDetails}
            contractAddress={contract.ddbc.nftFactory}
            metadata={metadata}
          />
        </div>
      </div>
    </div>
  );
};

export default MintNft;
