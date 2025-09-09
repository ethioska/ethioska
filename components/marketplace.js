import * as api from '../utilities/api.js';

export async function renderMarketplace(container) {
    const groups = await api.fetchMarketplaceGroups();
    const marketplaceHtml = `
        <h2>Marketplace</h2>
        <div class="marketplace">
            ${groups.map(group => `
                <div class="group-card">
                    <h3>${group.name}</h3>
                    <p>${group.description}</p>
                    <button data-group-id="${group.id}" class="wait-button">Please Wait For Me</button>
                </div>
            `).join('')}
        </div>
    `;
    container.innerHTML = marketplaceHtml;

    // Attach event listeners to the "Please Wait For Me" buttons
    const waitButtons = container.querySelectorAll('.wait-button');
    waitButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const groupId = event.target.dataset.groupId;
            initiatePurchase(groupId);
        });
    });
}

function initiatePurchase(groupId) {
    alert(`Initiating purchase for group ${groupId}.  (Mock functionality -  Implement actual purchase logic.)`);
    // Implement your actual purchase logic here (e.g., show a modal, redirect to a payment page, etc.)
}
