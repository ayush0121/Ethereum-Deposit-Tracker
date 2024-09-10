document.getElementById('trackDepositsBtn').addEventListener('click', async () => {
    const notification = document.getElementById('notification');
    const depositList = document.getElementById('depositList');

    notification.textContent = '';
    depositList.innerHTML = '';

    try {
        const response = await fetch('http://localhost:3000/track');

        if (response.ok) {
            notification.textContent = 'Tracking deposits...';
            const depositsResponse = await fetch('http://localhost:3000/deposits'); 
            const deposits = await depositsResponse.json();

            deposits.forEach(deposit => {
                const li = document.createElement('li');
                li.textContent = `Sender: ${deposit.sender}, Amount: ${deposit.amount} ETH, Hash: ${deposit.hash}`;
                depositList.appendChild(li);
            });
        } else {
            notification.textContent = 'Error tracking deposits.';
        }
    } catch (error) {
        notification.textContent = 'Error: ' + error.message;
    }
});