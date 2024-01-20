const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const {
  networkConfig,
  developementChains,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    const ethUsdaggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdaggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  const args = [ethUsdPriceFeedAddress];

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmation || 1,
  });
  if (
    !developementChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, [ethUsdPriceFeedAddress]);
  }
};

module.exports.tags = ["all", "fundme"];
