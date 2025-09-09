import { renderMarketplace } from './components/marketplace.js';
import { renderPendingTransactions } from './components/pending-transactions.js';
import { renderCompletedTransactions } from './components/completed-transactions.js';
import { renderGroupManagement } from './components/group-management.js';
import { renderAdminProfile } from './components/admin-profile.js';
import * as api from './utilities/api.js';

document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content');
    const marketplaceButton = document.getElementById('marketplace-button');
    const pendingTransactionsButton = document.getElementById('pending-transactions-button');
    const completedTransactionsButton = document.getElementById('completed-transactions-button');
    const groupManagementButton = document.getElementById('group-management-button');
    const userList = document.getElementById('user-list')

    // Function to fetch users
    const fetchUsers = async () => {
        const userListResponse = await api.fetchUserList();

        const userListDiv = document.createElement('div');
        userListDiv.innerHTML = `<h1> User List </h1>`;

        userListResponse.map((user) => {
            const userCard = document.createElement("div");
            userCard.innerHTML = `
                <div>
                    Name: ${user.name}
                </div>
                <div>
                    Age: ${user.age}
                </div>
                <div>
                    Email: ${user.email}
                </div>
                <button id="approve-${user.id}" data-user-id="${user.id}" onclick="approveUser(${user.id}, true)">Approve</button>
                <button id="reject-${user.id}" data-user-id="${user.id}" onclick="approveUser(${user.id}, false)">Reject</button>
            `
            userListDiv.appendChild(userCard);
        })
        contentContainer.appendChild(userListDiv)
    };
    fetchUsers()

    // Function to handle user approval status
    window.approveUser = async (userId, approved) => {
        await api.approveUserList(userId, approved)
    }

    const sendUserData = async () => {
        const data = new FormData(document.querySelector("#userProfileForm"))

        api.sendDataToAdmins(data)
    }

    // Function to load content based on button clicked
    function loadContent(contentType) {
        contentContainer.innerHTML = ''; // Clear existing content
        switch (contentType) {
            case 'marketplace':
                renderMarketplace(contentContainer);
                break;
            case 'pendingTransactions':
                renderPendingTransactions(contentContainer);
                break;
            case 'completedTransactions':
                renderCompletedTransactions(contentContainer);
                break;
            case 'groupManagement':
                renderGroupManagement(contentContainer);
                break;
            default:
                contentContainer.innerHTML = '<p>Select an option from the menu.</p>';
        }
    }

    // Event listeners for menu buttons
    marketplaceButton.addEventListener('click', () => loadContent('marketplace'));
    pendingTransactionsButton.addEventListener('click', () => loadContent('pendingTransactions'));
    completedTransactionsButton.addEventListener('click', () => loadContent('completedTransactions'));
    groupManagementButton.addEventListener('click', () => loadContent('groupManagement'));
    userList.addEventListener('click', () => fetchUsers())

    // Load default content on page load (e.g., marketplace)
    loadContent('marketplace');
});
