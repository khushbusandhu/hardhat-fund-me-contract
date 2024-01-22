const { getNamedAccounts, ethers, deployments } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);
  const contracts = await deployments.fixture(["all"]);
  const fundmeAddress = contracts["FundMe"].address;
  const fundMe = await ethers.getContractAt("FundMe", fundmeAddress, signer);
  console.log("withdrawing funds.....");
  const transactionResponse = await fundMe.withdraw();

  await transactionResponse.wait(1);
  console.log("back to zero:(");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
