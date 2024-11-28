// Sidebar functionality
const sidebar = document.getElementById('sidebar');
const hamburgerIcon = document.querySelector('.hamburger-icon');

// Function to toggle the sidebar visibility
function toggleSidebar() {
    sidebar.classList.toggle('visible');
    console.log('Sidebar toggled'); // Debugging log
}

// Attach event listener to the hamburger icon
if (hamburgerIcon) {
    hamburgerIcon.addEventListener('click', toggleSidebar);
} else {
    console.error('Hamburger icon not found');
}

// Create menu functionality
const createMenu = document.getElementById('create-menu');
const createButton = document.querySelector('.create-btn');

// Function to toggle the Create menu
function toggleCreateMenu(event) {
    event.stopPropagation(); // Prevents menu from closing immediately
    if (createMenu) {
        createMenu.classList.toggle('visible');
        console.log('Create menu toggled');
    } else {
        console.error('Create menu not found');
    }
}

// Attach event listener to the Create button
if (createButton) {
    createButton.addEventListener('click', toggleCreateMenu);
} else {
    console.error('Create button not found');
}

// Event listener to close the Create menu when clicking outside
document.addEventListener('click', (event) => {
    if (createMenu && !createMenu.contains(event.target) && !createButton.contains(event.target)) {
        createMenu.classList.remove('visible');
        console.log('Clicked outside, Create menu closed');
    }
});
