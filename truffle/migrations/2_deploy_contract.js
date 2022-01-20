const KycStorage = artifacts.require('KycStorage.sol');

module.exports = function(deployer){
	deployer.deploy(KycStorage);
};
