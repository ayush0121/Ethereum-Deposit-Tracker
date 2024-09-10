const { getDeposits } = require('./fetchDeposits');
const fs = require('fs');
const path = require('path');
const logger = require('./logger'); 

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
        });
    } catch (error) {
        logger.error(`Error tracking deposits for block ${blockNumber}: ${error.message}`);
    }
}
module.exports = { trackDeposits };