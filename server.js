const express = require('express');
const { trackDeposits } = require('./tracker');
const web3 = require('./rpc');
const logger = require('./logger');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('frontend'));

app.get('/track', async (req, res) => {
    try {
        const latestBlock = await web3.eth.getBlockNumber();
        await trackDeposits(latestBlock);
        res.send('Tracking deposits...');
    } catch (error) {
        logger.error('Error in /track endpoint: ' + error.message);
        res.status(500).send('Error tracking deposits');
    }
});

app.get('/deposits', (req, res) => {
    try {
        const depositsLog = fs.readFileSync(path.join(__dirname, 'deposits.log'), 'utf-8');
        const deposits = depositsLog.split('\n').filter(line => line).map(line => JSON.parse(line));
        res.json(deposits);
    } catch (error) {
        logger.error('Error fetching deposits: ' + error.message);
        res.status(500).send('Error fetching deposits');
    }
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});