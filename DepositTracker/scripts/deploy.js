// scripts/deploy.js
async function main() {
    const DepositTracker = await ethers.getContractFactory("DepositTracker");
    console.log("Deploying DepositTracker...");

    const depositTracker = await DepositTracker.deploy(); // Deploy the contract
    // No need to call .deployed() here

    console.log("DepositTracker deployed to:", depositTracker.address); // Log the deployed contract address
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });