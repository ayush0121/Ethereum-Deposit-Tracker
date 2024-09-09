require('dotenv').config();
require('@nomicfoundation/hardhat-ethers');

module.exports = {
    solidity: "0.8.0",
    networks: {
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL,
            accounts: [`0x${process.env.PRIVATE_KEY}`]
        }
    }
};