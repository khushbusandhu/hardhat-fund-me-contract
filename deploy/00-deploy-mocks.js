const { network, network } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployements }) => {
  const { deploy, logs } = deployements;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
};
