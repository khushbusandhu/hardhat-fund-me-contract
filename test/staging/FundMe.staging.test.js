const { getNamedAccounts, network, ethers } = require("hardhat");
const { developementChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");
developementChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe;
      let deployer;
      const sendValue = ethers.parseEther("1"); // 1 ETH
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        const contracts = await deployments.fixture(["all"]);
        const signer = await ethers.getSigner(deployer);
        const fundMeAddress = contracts["FundMe"].address;
        fundMe = await ethers.getContractAt("FundMe", fundMeAddress, signer);
      });

      it("allows people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue });
        await fundMe.withdraw();
        const endingBalance = await ethers.provider.getBalance(fundMe.target);

        assert.equal(endingBalance.toString(), "0");
      });
    });
