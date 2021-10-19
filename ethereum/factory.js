import web3 from "./web3";
import compiledFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  "0xf94df1ec2e58fab130e6b2a61793b7f4a9da1f1e"
);

export default instance;
