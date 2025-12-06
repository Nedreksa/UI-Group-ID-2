// Page navigation and transitions

// Check login status
function checkLoginStatus() {
    // Since there's no backend, we use localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Get user name
function getUserName() {
    return localStorage.getItem('userName') || 'User';
}

// Redirect to logged in page
function redirectToLoggedInPage() {
    const currentPath = window.location.pathname;
    
    if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        window.location.href = 'logined-home.html';
    } else if (currentPath.endsWith('product.html')) {
        window.location.href = 'logined-product.html';
    }
}

// Redirect to logged out page
function redirectToLoggedOutPage() {
    const currentPath = window.location.pathname;
    
    if (currentPath.endsWith('logined-home.html')) {
        window.location.href = 'index.html';
    } else if (currentPath.endsWith('logined-product.html')) {
        window.location.href = 'product.html';
    } else if (currentPath.endsWith('cart.html') || 
               currentPath.endsWith('orders.html') || 
               currentPath.endsWith('wishlist.html')) {
        window.location.href = 'login.html';
    }
}

// Login
function login(email, password) {
    // Since there's no backend, we simulate login directly
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', email.split('@')[0]);
    window.location.href = 'logined-home.html';
}

// Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

// Update navigation based on login status
function updateNavigation(isLoggedIn) {
    const navLinks = document.getElementById('navLinks');
    const logoLink = document.querySelector('.logo');
    const categoriesNavLinks = document.querySelectorAll('.categories-nav a[href="index.html"]');
    
    if (!navLinks) return;
    
    if (isLoggedIn) {
        // Logged in navigation
        if (logoLink) logoLink.href = 'logined-home.html';
        
        // Update home links in categories nav
        categoriesNavLinks.forEach(link => {
            link.href = 'logined-home.html';
        });
        
        navLinks.innerHTML = `
            <a href="logined-home.html" class="home-link">Home</a>
            <a href="orders.html">
                <img src="images/account.png" alt="Orders">
                Orders
            </a>
            <a href="wishlist.html">
                <img src="images/favorited.png" alt="Favorites">
                Favorites
            </a>
            <a href="cart.html">
                <img src="images/trolley.png" alt="Cart">
                Cart
            </a>
            <a href="#" onclick="logout()">
                <img src="images/logout.png" alt="Logout">
            </a>
        `;
    } else {
        // Logged out navigation
        if (logoLink) logoLink.href = 'index.html';
        
        navLinks.innerHTML = `
            <a href="index.html" class="home-link">Home</a>
            <a href="login.html">
                <img src="images/account.png" alt="Orders">
                Orders
            </a>
            <a href="login.html">
                <img src="images/favorite.png" alt="Favorites">
                Favorites
            </a>
            <a href="login.html">
                <img src="images/trolley.png" alt="Cart">
                Cart
            </a>
            <a href="login.html" class="btn-primary">Sign In</a>
        `;
    }
}

// Functions to run when page loads
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = checkLoginStatus();
    const currentPath = window.location.pathname;
    
    // Update navigation for dynamic pages
    updateNavigation(isLoggedIn);
    
    // Redirect based on login status
    if (isLoggedIn) {
        // Prevent access to login/register pages when logged in
        if (currentPath.endsWith('login.html') || currentPath.endsWith('signup.html') || currentPath.endsWith('forgot-password.html')) {
            window.location.href = 'logined-home.html';
        }
        
        // Show correct pages for logged in users
        if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
            window.location.href = 'logined-home.html';
        } else if (currentPath.endsWith('product.html')) {
            window.location.href = 'logined-product.html';
        }
        
        // Display user name
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(element => {
            element.textContent = getUserName();
        });
    } else {
        // Prevent access to protected pages when not logged in
        if (currentPath.endsWith('logined-home.html') || 
            currentPath.endsWith('logined-product.html') || 
            currentPath.endsWith('cart.html') || 
            currentPath.endsWith('orders.html') || 
            currentPath.endsWith('wishlist.html')) {
            window.location.href = 'login.html';
        }
    }
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }
    
    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
        });
    }
    
    // Logout button handling
    const logoutButtons = document.querySelectorAll('[onclick="logout()"]');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            logout();
        });
    });
    
    // Product detail page navigation
    const productLinks = document.querySelectorAll('[href="#product-details"]');
    productLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            if (isLoggedIn) {
                window.location.href = 'logined-product.html';
            } else {
                window.location.href = 'product.html';
            }
        });
    });
    
    // Search functionality
    const searchForms = document.querySelectorAll('.search-bar');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = this.querySelector('input');
            if (searchInput && searchInput.value.trim()) {
                window.location.href = 'search.html?q=' + encodeURIComponent(searchInput.value.trim());
            }
        });
        
        const searchInput = form.querySelector('input');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter' && this.value.trim()) {
                    event.preventDefault();
                    window.location.href = 'search.html?q=' + encodeURIComponent(this.value.trim());
                }
            });
        }
    });
    
    // Handle favorite button clicks
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent product card click
            const img = this.querySelector('img');
            if (isLoggedIn) {
                // Toggle favorite status
                if (img.src.includes('favorite.png')) {
                    img.src = 'images/favorited.png';
                    img.alt = 'Remove from Favorites';
                } else {
                    img.src = 'images/favorite.png';
                    img.alt = 'Add to Favorites';
                }
            } else {
                // Redirect to login
                window.location.href = 'login.html';
            }
        });
    });
    
    // Make product cards clickable
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Don't navigate if clicking on a button
            if (event.target.closest('button')) {
                return;
            }
            
            // Navigate to product page based on login status
            if (isLoggedIn) {
                window.location.href = 'logined-product.html';
            } else {
                window.location.href = 'product.html';
            }
        });
    });
    
    // Prevent button clicks from triggering card click
    const cardButtons = document.querySelectorAll('.product-card button');
    cardButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});