const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledCampaign = require("./../ethereum/build/Campaign.json");
const compiledFactory = require("./../ethereum/build/CampaignFactory.json");

let accounts;
let factory;
let campaignaddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "3000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  [campaignaddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignaddress);
});

describe("Campaign", () => {
  it("deploys p1", () => {
    assert.ok(factory);
  });

  it("deploys p2", () => {
    assert.ok(campaign);
  });
  it("people able to send money", async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: "200",
    });

    let res = await campaign.methods.approvers(accounts[1]).call();
    assert(res);
  });

  it("minimum paisa", async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: "50",
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("manager can create requests", async () => {
    await campaign.methods.createRequest("Buy kidney", "10", accounts[1]).send({
      from: accounts[0],
      gas: "1000000",
    });

    const res = await campaign.methods.requests(0).call();
    assert.strictEqual(res.recipient, accounts[1]);
  });
});
