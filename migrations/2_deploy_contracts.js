var ERC721Mintable = artifacts.require("./eth-contracts/contracts/ERC721Mintable.sol");
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {  
  deployer.dep
  deployer.deploy(Verifier)
    .then(() => {
        return deployer.deploy(SolnSquareVerifier, Verifier.address);
    });
  };