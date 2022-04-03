const ToDO = artifacts.require('ToDo')

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(ToDO)
  const todo = await ToDO.deployed()

}
