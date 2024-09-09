// fetchDeposits.js
const web3 = require('./rpc');
const logger = require('./logger'); // Import the logger
const BEACON_CONTRACT_ADDRESS = '0x00000000219ab540356cBB839Cbe05303d7705Fa';
const DEPOSIT_EVENT_SIGNATURE = web3.utils.sha3('DepositEvent(uint256,address,uint256)');

async function getDeposits(blockNumber) {
    try {
        const block = await web3.eth.getBlock(blockNumber, true);
        const transactions = block.transactions;

        // Fetch logs for the deposit event
        const logs = await web3.eth.getPastLogs({
            fromBlock: blockNumber,
            toBlock: blockNumber,
            address: BEACON_CONTRACT_ADDRESS,
            topics: [DEPOSIT_EVENT_SIGNATURE]
        });

        // Process logs to extract deposit details
        const deposits = logs.map(log => {
            const decoded = web3.eth.abi.decodeLog([
                { type: 'uint256', name: 'amount' },
                { type: 'address', name: 'sender' },
                { type: 'uint256', name: 'timestamp' }
            ], log.data, log.topics);

            return {
                blockNumber: blockNumber,
                blockTimestamp: block.timestamp,
                sender: decoded.sender,
                amount: web3.utils.fromWei(decoded.amount, 'ether'),
                hash: log.transactionHash,
                input: log.input // This may contain the public key or other data
            };
        });

        return deposits;
    } catch (error) {
        logger.error(`Error fetching deposits for block ${blockNumber}: ${error.message}`);
        throw error; // Re-throw the error after logging it
    }
}

module.exports = { getDeposits };