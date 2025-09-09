const ADMIN_PASSWORDS = ["4451Se&9509", "4451seidkedi®", "44513362&Seid"];

export function authenticateAdmin(password) {
    return ADMIN_PASSWORDS.includes(password);
}

export function authenticateUser(code, phone) {
    // Mock authentication logic (replace with API call)
    return new Promise((resolve, reject) => {
        //Simulate a request to authenticate user
        //If it's invalid you must reject it
        //This function sends a mock boolean to simulate the server approval
        //Please note that for users to log they need to be authenticated and approved by any admin.
        setTimeout(() => {
            resolve(true)
        }, 1000)
    });
}
