

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', handleAddToWishlist);
    });
    
    const quantityControls = document.querySelectorAll('.quantity-control');
    quantityControls.forEach(control => {
        control.addEventListener('click', handleQuantityChange);
    });

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePayment);
        
        // Input formatting for better UX
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, ''); 
                value = value.replace(/(.{4})/g, '$1 ').trim(); 
                e.target.value = value;
            });
        }
        
        const cardExpiryInput = document.getElementById('cardExpiry');
        if (cardExpiryInput) {
            cardExpiryInput.addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }
    }




});

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    window.location.href = "logined-home.html";
}

function handleSignup(event) {
    event.preventDefault();
    window.location.href = "logined-home.html";
}

function handleForgotPassword(event) {
    event.preventDefault();
    alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderilmiştir.");
    window.location.href = "login.html";
}

function handleAddToCart(event) {
    const productId = event.target.getAttribute('data-product-id');
    alert("Product added to the cart!");
}

function handleAddToWishlist(event) {
    const productId = event.target.getAttribute('data-product-id');
    alert("Product added to the wishlist!");
}

function handleQuantityChange(event) {
    const action = event.target.getAttribute('data-action');
    const inputElement = event.target.parentElement.querySelector('.quantity-input');
    let currentValue = parseInt(inputElement.value);
    
    if (action === 'increase') {
        currentValue++;
    } else if (action === 'decrease' && currentValue > 1) {
        currentValue--;
    }
    
    inputElement.value = currentValue;
    updateCartTotals();
}

function updateCartTotals() {
    
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const productPrices = document.querySelectorAll('.product-price');
    
    let totalAmount = 0;
    
    quantityInputs.forEach((input, index) => {
        const quantity = parseInt(input.value);
        const priceText = productPrices[index].textContent;
        const price = parseFloat(priceText.replace('₺', '').trim());
        
        totalAmount += quantity * price;
    });
    
    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
        totalElement.textContent = '₺' + totalAmount.toFixed(2);
    }
}


function logout() {
    window.location.href = "index.html";
}

function handlePayment(event) {
    event.preventDefault(); 
    
   
    const btn = document.querySelector('.checkout-button');
    
    if (btn) {
        btn.textContent = "Processing...";
        btn.disabled = true;
    }
    
    setTimeout(() => {
        alert("Payment Successful! Your order has been confirmed.");
        
        localStorage.removeItem('cartItems'); 
        
        window.location.href = "cart.html";
        
    }, 1500); 
}