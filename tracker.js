// tracker.js
const { getDeposits } = require('./fetchDeposits');
const fs = require('fs');
const path = require('path');
const web3 = require('./rpc');
const logger = require('./logger'); // Import the logger

async function trackDeposits(blockNumber) {
    try {
        const deposits = await getDeposits(blockNumber);

        deposits.forEach(deposit => {
            const depositData = {
                blockNumber: deposit.blockNumber,
                blockTimestamp: deposit.blockTimestamp,
                fee: web3.utils.fromWei(deposit.gasPrice, 'ether'),
                sender: deposit.sender,
                amount: deposit.amount,
                hash: deposit.hash,
                input: deposit.input
            };

            // Append deposit data to the log file
            fs.appendFileSync(path.join(__dirname, 'deposits.log'), JSON.stringify(depositData) + '\n');
            logger.info(`Deposit recorded: ${JSON.stringify(depositData)}`); // Log the deposit details
        });
    } catch (error) {
        logger.error(`Error tracking deposits for block ${blockNumber}: ${error.message}`);
    }
}

module.exports = { trackDeposits };