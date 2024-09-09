const Web3 = require('web3');
require('dotenv').config();

// Create a new instance of Web3 with a provider
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.SEPOLIA_RPC_URL));

// Export the Web3 instance for use in other files
module.exports = web3;
