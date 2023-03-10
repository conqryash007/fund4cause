import web3 from "./web3";
import compiledFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  "0x0597f75a4ce00F0D450d3d0dc6EC7898b5C313c2"
);

export default instance;
