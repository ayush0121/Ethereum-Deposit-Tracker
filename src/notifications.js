const fetch = require('node-fetch'); 
const logger = require('./logger'); 
require('dotenv').config(); 

function sendTelegramNotification(depositData) {
    const message = `New Deposit Recorded:\nSender: ${depositData.sender}\nAmount: ${depositData.amount} ETH\nHash: ${depositData.hash}`;
    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`;

    fetch(telegramUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send Telegram notification');
            }
            logger.info('Telegram notification sent successfully');
        })
        .catch(error => {
            logger.error('Error sending Telegram notification: ' + error.message);
        });
}

module.exports = { sendTelegramNotification };