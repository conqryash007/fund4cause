import Web3 from "web3";
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/4UA7f8bHykMEEFhQrzD5ywYgN3y9bxJB"
  );
  web3 = new Web3(provider);
}
export default web3;
