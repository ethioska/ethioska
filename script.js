import { sendToTelegram } from './utilities/api.js';
import { isAdmin, isUser } from './utilities/auth.js'; // Import auth functions

document.addEventListener('DOMContentLoaded', () => {
    const roleSelect = document.getElementById('role');
    const adminLoginDiv = document.getElementById('admin-login');
    const userLoginDiv = document.getElementById('user-login');
    const loginButton = document.getElementById('login-button');

    // Show/Hide Login Fields
    roleSelect.addEventListener('change', () => {
        const selectedRole = roleSelect.value;
        adminLoginDiv.style.display = selectedRole === 'admin' ? 'block' : 'none';
        userLoginDiv.style.display = selectedRole === 'user' ? 'block' : 'none';
    });

    loginButton.addEventListener('click', async () => {
        const selectedRole = roleSelect.value;

        if (selectedRole === 'admin') {
            const adminCode = document.getElementById('admin-code').value;
            const adminData = {
                type: 'admin_login',
                code: adminCode
            };

            try {
                const response = await sendToTelegram(adminData);
                if (response.ok && response.result) { // Check API success
                    sessionStorage.setItem('isAdmin', 'true');
                    window.location.href = 'components/group-management.js';
                    // alert('Admin login successful!'); // Remove alert
                } else {
                    alert('Admin login failed. Check the code.');
                }
            } catch (error) {
                console.error('Admin login error:', error);
                alert('Admin login failed. Check the code.');
            }

        } else if (selectedRole === 'user') {
          const username = document.getElementById('username').value;
          const phoneNumber = document.getElementById('phoneNumber').value;
          const userCode = document.getElementById('user-code').value;
          const userData = {
              type: 'user_login',
              username: username,
              phoneNumber: phoneNumber,
              code: userCode,
          };

          try {
            const response = await sendToTelegram(userData);

              if (response.ok && response.result) { // check if the api calls success
                sessionStorage.setItem('isUser', 'true');
                sessionStorage.setItem('username', username);
                window.location.href = 'components/marketplace.js';
                // alert('User login successful!'); // Remove the alert
              } else {
                alert('User login failed. Check your credentials.'); // Show an error message
              }

          } catch (error) {
            console.error('User login error:', error);
            alert('User login failed. Please try again.');
          }
        }
    });
});
