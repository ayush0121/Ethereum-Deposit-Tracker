// server.js
const express = require('express');
const { trackDeposits } = require('./tracker');
const web3 = require('./rpc');
const logger = require('./logger'); // Import the logger
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/track', async (req, res) => {
    try {
        const latestBlock = await web3.eth.getBlockNumber();
        await trackDeposits(latestBlock);
        res.send('Tracking deposits...');
    } catch (error) {
        logger.error(`Error in /track endpoint: ${error.message}`);
        res.status(500).send('Error tracking deposits');
    }
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});