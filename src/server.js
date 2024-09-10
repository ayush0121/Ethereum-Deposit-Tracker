const express = require('express');
const  ethers =require('ethers');

const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const logger = require('./logger'); 
const { getDeposits } = require('./fetchDeposits'); 
const { sendTelegramNotification } = require('./notifications'); 
require('dotenv').config(); 
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const contractAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa"; 
const contractABI = [

    "event DepositRecorded(uint256 blockNumber, uint256 blockTimestamp, uint256 fee, bytes32 hash, bytes pubkey, address sender, uint256 amount)"
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);


const app = express();
const PORT = 3000;


const web3 = new Web3(process.env.SEPOLIA_RPC_URL);
const BEACON_CONTRACT_ADDRESS = '0x00000000219ab540356cBB839Cbe05303d7705Fa'; 
const DEPOSIT_EVENT_SIGNATURE = web3.utils.sha3('DepositEvent(uint256,address,uint256)');


app.use(express.json());

app.get('/track', async (req, res) => {
    try {
        const latestBlock = await web3.eth.getBlockNumber();
        await trackDeposits(latestBlock);
        res.json({ message: 'Tracking deposits...' });
    } catch (error) {
        logger.error('Error in /track endpoint: ' + error.message);
        res.status(500).json({ error: 'Error tracking deposits' });
    }
});

async function trackDeposits(blockNumber) {
    try {
        const deposits = await getDeposits(blockNumber);
        deposits.forEach(deposit => {
            const depositData = {
                blockNumber: deposit.blockNumber,
                blockTimestamp: deposit.blockTimestamp,
                sender: deposit.sender,
                amount: deposit.amount,
                hash: deposit.hash,
                input: deposit.input
            };

            fs.appendFileSync(path.join(__dirname, '../deposits.log'), JSON.stringify(depositData) + '\n');
            logger.info(`Deposit recorded: ${JSON.stringify(depositData)}`); 

            sendTelegramNotification(depositData);
        });
    } catch (error) {
        logger.error(`Error tracking deposits for block ${blockNumber}: ${error.message}`);
    }
}

app.get('/deposits', (req, res) => {
    try {
        const depositsLog = fs.readFileSync(path.join(__dirname, '../deposits.log'), 'utf-8');
        const deposits = depositsLog.split('\n').filter(line => line).map(line => JSON.parse(line));
        res.json(deposits);
    } catch (error) {
        logger.error('Error fetching deposits: ' + error.message);
        res.status(500).json({ error: 'Error fetching deposits' });
    }
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});