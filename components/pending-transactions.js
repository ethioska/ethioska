import * as api from '../utilities/api.js';

export async function renderPendingTransactions(container) {
    const transactions = await api.fetchPendingTransactions();
    const pendingTransactionsHtml = `
        <h2>Pending Transactions</h2>
        ${transactions.length > 0 ? `
            <ul>
                ${transactions.map(transaction => `
                    <li>
                        Transaction ID: ${transaction.id}, User: ${transaction.user}, Date: ${transaction.date}, Status: ${transaction.status}
                        <button data-transaction-id="${transaction.id}" class="approve-button">Approve</button>
                    </li>
                `).join('')}
            </ul>
        ` : `<p>No pending transactions.</p>`}
    `;
    container.innerHTML = pendingTransactionsHtml;

    // Add event listeners to the "Approve" buttons
    const approveButtons = container.querySelectorAll('.approve-button');
    approveButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const transactionId = event.target.dataset.transactionId;
            approveTransaction(transactionId);
        });
    });
}

async function approveTransaction(transactionId) {
    const result = await api.approveTransaction(transactionId);
    if (result.success) {
        alert(`Transaction ${transactionId} approved successfully.`);
        // Refresh the pending transactions list
        const pendingTransactionsContainer = document.getElementById('pending-transactions');
        if (pendingTransactionsContainer) {
            renderPendingTransactions(pendingTransactionsContainer);
        }
    } else {
        alert(`Failed to approve transaction ${transactionId}.`);
    }
}
