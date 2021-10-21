import web3 from "./web3";
import compiledFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  "0xF64136dC4E11DCe268B8E2c3935CaCFFE32A724f"
);

export default instance;
