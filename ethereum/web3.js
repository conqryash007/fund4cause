import Web3 from "web3";
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/d74a4e3b04cc4061a37770132b6fd0b6"
  );
  web3 = new Web3(provider);
}
export default web3;
