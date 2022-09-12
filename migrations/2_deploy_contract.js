const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");


module.exports = async function (deployer) {
   //Token
   await deployer.deploy(Token);
   const token = await Token.deployed();

  //ethSwap
  await deployer.deploy(EthSwap,token.address);
  const ethSwap = await EthSwap.deployed();

  // transfer money to ethSwap address
  await token.transfer(ethSwap.address,'1000000000000000000000000');
};
