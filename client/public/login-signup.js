const API_BASE_URL = 'http://localhost:3000/api/auth'; // Update this to your backend API URL

// Form toggling between login and signup
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginBtn.addEventListener('click', () => {
    toggleForm(loginForm, signupForm);
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
});

signupBtn.addEventListener('click', () => {
    toggleForm(signupForm, loginForm);
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
});

function toggleForm(showForm, hideForm) {
    showForm.classList.add('visible');
    hideForm.classList.remove('visible');
}

// Populate the birthday dropdowns (days and years)
const birthDaySelect = document.getElementById('signup-birth-day');
const birthYearSelect = document.getElementById('signup-birth-year');

// Populate days (1-31)
for (let i = 1; i <= 31; i++) {
    const dayOption = document.createElement('option');
    dayOption.value = i;
    dayOption.textContent = i;
    birthDaySelect.appendChild(dayOption);
}

// Populate years (1900 to current year)
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 1900; i--) {
    const yearOption = document.createElement('option');
    yearOption.value = i;
    yearOption.textContent = i;
    birthYearSelect.appendChild(yearOption);
}

// Signup Form Submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const month = document.getElementById('signup-birth-month').value;
    const day = document.getElementById('signup-birth-day').value;
    const year = document.getElementById('signup-birth-year').value;

    // Validate fields
    if (!username || !email || !password || !month || !day || !year) {
        alert('Please fill in all fields.');
        return;
    }

    const birthday = `${year}-${month}-${day}`;

    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, birthday }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Signup successful! Please log in.');
            document.getElementById('signup-form').reset();
            toggleForm(loginForm, signupForm); // Switch to login form
            loginBtn.classList.add('active');
            signupBtn.classList.remove('active');
        } else {
            alert(data.message || 'Signup failed.');
        }
    } catch (error) {
        console.error('Signup Error:', error);
        alert('An error occurred during signup.');
    }
});

// Login Form Submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Validate fields
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Welcome back, ${data.username}!`);
            // Store the token in localStorage or cookies
            localStorage.setItem('authToken', data.token);
        } else {
            alert(data.message || 'Login failed.');
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('An error occurred during login.');
    }
});
