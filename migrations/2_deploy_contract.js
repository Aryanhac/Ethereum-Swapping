const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");


module.exports = async function (deployer) {
  //ethSwap
  await deployer.deploy(EthSwap);
  const ethSwap = await EthSwap.deployed();

  //Token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // transfer money to ethSwap address
  await token.transfer(ethSwap.address,'1000000000000000000000000');
};
