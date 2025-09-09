// utilities/api.js
const BOT_TOKEN = '8315309757:AAFCCMI_h0szMfV3DqMHi8AVaPMTRsHW-qw'; // Your bot's token
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

export async function sendToTelegram(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: '6726975094',  // Replace with your chat ID (or user ID to send direct message)
                text: JSON.stringify(data, null, 2)  // Send data as JSON
            })
        });

        return await response.json();

    } catch (error) {
        console.error('Error sending to Telegram:', error);
        throw error;  // Re-throw to allow the caller to handle the error
    }
}
