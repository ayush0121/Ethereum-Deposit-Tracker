require('dotenv').config();
require('@nomicfoundation/hardhat-ethers');

module.exports = {
    solidity: "0.8.0",
    networks: {
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/zHFwxK135DVFKuHINBsuJez6T6CEs1nZ",
            accounts: [`0x${process.env.PRIVATE_KEY}`]
        }
    }
};