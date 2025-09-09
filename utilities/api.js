// mockAPI.js
const mockUsers = [
    {
        id: 1,
        name: "Sami",
        age: 28,
        email: "sami@example.com",
    },
    {
        id: 2,
        name: "Sali",
        age: 24,
        email: "sali@example.com",
    }
]
const mockTransactions = [
    {
        id: 1,
        groupId: 1,
        user: 'John Doe',
        date: '2024-01-01',
        status: 'Pending',
        screenshot: 'example.jpg'
    }
];

export async function fetchMarketplaceGroups() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Group A", description: "Description for Group A" },
                { id: 2, name: "Group B", description: "Description for Group B" }
            ]);
        }, 500);
    });
}

export async function fetchPendingTransactions() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockTransactions);
        }, 500);
    });
}

export async function fetchCompletedTransactions() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockTransactions.filter(t => t.status === 'Completed')); // Simulate filtering
        }, 500);
    });
}

export async function approveTransaction(transactionId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Transaction ${transactionId} approved`);
            resolve({ success: true }); // Simulate success response
        }, 500);
    });
}

export async function fetchUserList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUsers);
        }, 500);
    });
}

export async function approveUserList(userId, approved) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`User ${userId} approval status is ${approved}`);
            resolve({ success: true }); // Simulate success response
        }, 500);
    });
}

export async function sendDataToAdmins(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Data sent to admins:', data);
            resolve({ success: true });
        }, 500);
    });
}
