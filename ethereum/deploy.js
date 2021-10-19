const hdWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("Web3");
const compileFactory = require("./../ethereum/build/CampaignFactory.json");

const provider = new hdWalletProvider(
  "receive chunk sugar century school coin lyrics fluid vessel december stone forget",
  "https://rinkeby.infura.io/v3/d74a4e3b04cc4061a37770132b6fd0b6"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("My account : ", accounts[0]);
  const result = await new web3.eth.Contract(compileFactory.abi)
    .deploy({
      data: compileFactory.evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: "3000000" });

  console.log("contract deployed on :", result.options.address);
};
deploy();
