import { authenticateAdmin, authenticateUser } from './utilities/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const roleSelect = document.getElementById('role-select');
    const adminLoginDiv = document.getElementById('admin-login');
    const userLoginDiv = document.getElementById('user-login');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');

    // Function to update the visibility of login forms
    function updateLoginForms() {
        const selectedRole = roleSelect.value;
        adminLoginDiv.style.display = selectedRole === 'admin' ? 'block' : 'none';
        userLoginDiv.style.display = selectedRole === 'user' ? 'block' : 'none';
        errorMessage.textContent = ''; // Clear any previous error messages
    }

    // Initial setup of the login forms
    updateLoginForms();

    // Event listener for role selection
    roleSelect.addEventListener('change', updateLoginForms);

    loginButton.addEventListener('click', async () => {
        const selectedRole = roleSelect.value;

        if (selectedRole === 'admin') {
            const password = document.getElementById('admin-password').value;
            if (authenticateAdmin(password)) {
                window.location.href = 'admin-panel.html'; // Redirect to admin panel
            } else {
                errorMessage.textContent = 'Invalid admin password.';
            }
        } else if (selectedRole === 'user') {
            const code = document.getElementById('user-code').value;
            const phone = document.getElementById('user-phone').value;

            // Simulate user authentication (replace with API call)
            authenticateUser(code, phone)
                .then(isAuthenticated => {
                    if (isAuthenticated) {
                        console.log("User Authentication successfull");
                        // Redirect user to profile request for the very first time after login
                        window.location.href = 'user-request.html';

                        // You need to use your server-side logic to verify that user already have a profile
                        // If they already had the profile redirect them directly to the main user page.
                    } else {
                        errorMessage.textContent = 'Invalid user code or phone number.';
                    }
                })
                .catch(() => {
                    errorMessage.textContent = 'Error authenticating user.';
                });
        }
    });
});
