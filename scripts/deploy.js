const { ethers } = require("hardhat");

async function main(){
    const hello = await ethers.getContractFactory("hello");
    
    const hello_world = await hello.deploy("HELLO WORLD!");
    console.log("Contract Deployed to address: " + hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });