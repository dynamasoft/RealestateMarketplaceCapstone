const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
require("dotenv").config();

const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;
const NUM_CREATURES = 10;
const NUM_LOOTBOXES = 4;
const DEFAULT_OPTION_ID = 0;
const LOOTBOX_OPTION_ID = 2;

var proof = {
  proof: {
    a: [
      "0x1ba0df5159c4c75da8a30d34e28b0a2242b9634aed77c9b41b979e6081ed5033",
      "0x04a81e18c8c57362b000213bce6d533055ba4f830dc76abf9c5bf37907ffbdd0",
    ],
    b: [
      [
        "0x272c1132c59a11b904df2e3921eaf7b40ce948a1a24e9b36dd6e2e04cc3e9560",
        "0x1535e1e6c5cb4d685ef68595487910d68d8813765f422b977b53e32f8c53fc94",
      ],
      [
        "0x26e8a26d9bd754c038c42bb9b5b32b91a0c1463aba53b03eb8e224f1230f853a",
        "0x2c080f65faca972f26229da56b338fc12d62261f8626ec42659bc1090e7a983d",
      ],
    ],
    c: [
      "0x08c833d09a989255fa84bd16e9b4374fbf2c59f92f8b67298771b72c03e56f7f",
      "0x2f85944aef8c9f217463077e0d8f85fdf5546b3b570820ade0cf9c95a3feb440",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

//proof json
const a = proof["proof"]["a"];
const b = proof["proof"]["b"];
const c = proof["proof"]["c"];
const correctProofInput = proof["inputs"];

//console.log(process.env);
console.log("nft contract address:" + NFT_CONTRACT_ADDRESS);

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

debugger;
const NFT_ABI = require("../build/contracts/SolnSquareVerifier.json");
console.log("NFT ABI:" + NFT_ABI);

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_optionId",
        type: "uint256",
      },
      {
        name: "_toAddress",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";

  const provider = new HDWalletProvider(
    MNEMONIC,
    isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  );

  console.log("1");

  const web3Instance = new web3(provider);
  console.log("2");

  if (FACTORY_CONTRACT_ADDRESS) {
    const factoryContract = new web3Instance.eth.Contract(
      FACTORY_ABI,
      FACTORY_CONTRACT_ADDRESS,
      { gasLimit: "1000000" }
    );

    console.log("1");

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_CREATURES; i++) {
      const result = await factoryContract.methods
        .mint(i, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted creature. Transaction: " + result.transactionHash);
    }

    // Lootboxes issued directly to the owner.
    for (var i = 0; i < NUM_LOOTBOXES; i++) {
      const result = await factoryContract.methods
        .mint(LOOTBOX_OPTION_ID, OWNER_ADDRESS)
        .send({ from: OWNER_ADDRESS });
      console.log("Minted lootbox. Transaction: " + result.transactionHash);
    }
  } else if (NFT_CONTRACT_ADDRESS) {
    console.log("4");
    try {
      debugger;
      const nftContract = new web3Instance.eth.Contract(
        NFT_ABI.abi,
        NFT_CONTRACT_ADDRESS,
        { gasLimit: "1000000" }
      );

      console.log("before the loop");

      // Creatures issued directly to the owner.
      for (var i = 1; i <= NUM_CREATURES; i++) {
        console.log("minting: " + i);

        try {
          const result = await nftContract.methods
            .mint(OWNER_ADDRESS, i)
            .send({ from: OWNER_ADDRESS });

          console.log(
            "Minted creature. Transaction: " + result.transactionHash
          );
        } catch (error) {
          debugger;
          console.log(error);
        }
      }
    } catch (error) {
      debugger;
    }
  } else {

    
    console.error(
      "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
    );
  }
}

main();
