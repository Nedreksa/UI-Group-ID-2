// Ana JavaScript dosyası

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Login formu işleme
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Kayıt formu işleme
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Şifremi unuttum formu işleme
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Sepete ekleme butonları
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
    
    // İstek listesine ekleme butonları
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', handleAddToWishlist);
    });
    
    // Ürün miktarı ayarlama butonları
    const quantityControls = document.querySelectorAll('.quantity-control');
    quantityControls.forEach(control => {
        control.addEventListener('click', handleQuantityChange);
    });
});

// Giriş işlemi
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Gerçek bir backend olmadığı için direkt olarak giriş yapılmış ana sayfaya yönlendiriyoruz
    window.location.href = "logined-home.html";
}

// Kayıt işlemi
function handleSignup(event) {
    event.preventDefault();
    // Gerçek bir backend olmadığı için direkt olarak giriş yapılmış ana sayfaya yönlendiriyoruz
    window.location.href = "logined-home.html";
}

// Şifremi unuttum işlemi
function handleForgotPassword(event) {
    event.preventDefault();
    alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderilmiştir.");
    window.location.href = "login.html";
}

// Sepete ekleme
function handleAddToCart(event) {
    const productId = event.target.getAttribute('data-product-id');
    alert("Ürün sepete eklendi!");
}

// İstek listesine ekleme
function handleAddToWishlist(event) {
    const productId = event.target.getAttribute('data-product-id');
    alert("Ürün istek listesine eklendi!");
}

// Ürün miktarı değiştirme
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

// Sepet toplamlarını güncelleme
function updateCartTotals() {
    // Bu fonksiyon sepet sayfasında toplam tutarları günceller
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

// Oturumu kapatma
function logout() {
    window.location.href = "index.html";
}
