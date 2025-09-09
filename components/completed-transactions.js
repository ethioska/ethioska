import * as api from '../utilities/api.js';

export async function renderCompletedTransactions(container) {
    const transactions = await api.fetchCompletedTransactions();
    const completedTransactionsHtml = `
        <h2>Completed Transactions</h2>
        ${transactions.length > 0 ? `
            <ul>
                ${transactions.map(transaction => `
                    <li>
                        Transaction ID: ${transaction.id}, User: ${transaction.user}, Date: ${transaction.date}, Status: ${transaction.status}
                    </li>
                `).join('')}
            </ul>
        ` : `<p>No completed transactions.</p>`}
    `;
    container.innerHTML = completedTransactionsHtml;
}
