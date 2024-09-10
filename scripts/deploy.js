const { ethers } = require("hardhat");

async function main() {
    const DepositTracker = await ethers.getContractFactory("DepositTracker");
    console.log("Deploying DepositTracker...");

  
    const depositTracker = await DepositTracker.deploy(); 
    console.log("DepositTracker deployed to:", depositTracker.address); 
  

     
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });