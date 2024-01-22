const { default: Ethers } = require("@typechain/ethers-v6");
const { getNamedAccounts, ethers, deployments } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);
  const contracts = await deployments.fixture(["all"]);
  const fundMeAddress = contracts["FundMe"].address;
  const fundMe = await ethers.getContractAt("FundMe", fundMeAddress, signer);
  console.log("funding....");
  const transactionResponse = await fundMe.fund({
    value: ethers.parseEther("0.1"),
  });
  await transactionResponse.wait(1);
  console.log("funding compeleted");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
