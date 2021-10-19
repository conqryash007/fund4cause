const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
const { readFileSync } = require("fs");

const buildPath = path.join(__dirname,"/build");
fs.removeSync(buildPath);
const campaignPath = path.join(__dirname,"/contract/Campaign.sol");
const source = readFileSync(campaignPath,"utf-8");

let input = {
    language: "Solidity",
    sources: {
      "Campaign.sol": {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

let output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Campaign.sol"];
  fs.ensureDirSync(buildPath);

for(let contract in output){
    fs.outputJSONSync(
        path.join(buildPath,contract+".json"),
        output[contract]
    );
}