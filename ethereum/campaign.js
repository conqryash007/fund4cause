import web3 from "./web3";
import compileCamp from "./build/Campaign.json";

const con = async (addr) => {
  return new web3.eth.Contract(compileCamp.abi, addr);
};

export default con;
