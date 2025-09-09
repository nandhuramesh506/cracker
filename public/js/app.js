// Slider functionality
let index = 0;

function reloadSlider() {
    let slides = document.querySelectorAll('.slider .list .item');
    let dots = document.querySelectorAll('.slider .dot');

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    let width = slides[index].clientWidth;
    document.querySelector('.slider .list').style.left = `-${index * width}px`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

document.querySelector('.next').onclick = function() {
    index++;
    reloadSlider();
};

document.querySelector('.prev').onclick = function() {
    index--;
    reloadSlider();
};

setInterval(function() {
    index++;
    reloadSlider();
}, 5000); // Auto-slide every 5 seconds

document.querySelectorAll('.slider .dot').forEach((dot, idx) => {
    dot.onclick = function() {
        index = idx;
        reloadSlider();
    };
});

// Navbar section navigation
function setActiveSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

document.getElementById('homeLink').onclick = function() {
    setActiveSection('homeSection');
};

document.getElementById('aboutLink').onclick = function() {
    setActiveSection('aboutSection');
};

document.getElementById('crackerlistLink').onclick = function() {
    setActiveSection('crackerlistSection');
};

document.getElementById('contactLink').onclick = function() {
    setActiveSection('contactSection');
};

// Toggle Add to Cart section
document.getElementById('addToCartLink').onclick = function() {
    let cartSection = document.getElementById('addToCartSection');
    cartSection.classList.toggle('active');
};

document.querySelector('.add-to-cart .close').onclick = function() {
    document.getElementById('addToCartSection').classList.remove('active');
};

// Cart functionality
let cart = [];

function updateCart() {
    const cartList = document.querySelector('.listCart');
    const totalQuantityEl = document.getElementById('totalQuantity');
    const totalPriceEl = document.getElementById('totalPrice');
    const checkoutButton = document.querySelector('.add-to-cart .checkout');

    cartList.innerHTML = ''; // Clear existing items
    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        checkoutButton.disabled = true; // Disable checkout if cart is empty
    } else {
        checkoutButton.disabled = false; // Enable checkout if cart has items
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h6>${item.name}</h6>
            <div class="price">Rs ${item.price * item.quantity}</div>
            <div class="quantity">
                <span class="decrement">-</span>
                <span>${item.quantity}</span>
                <span class="increment">+</span>
            </div>
        `;
        cartList.appendChild(cartItem);

        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

        cartItem.querySelector('.increment').onclick = function() {
            item.quantity++;
            updateCart();
        };

        cartItem.querySelector('.decrement').onclick = function() {
            if (item.quantity > 0) {
                item.quantity--;
            }
            updateCart();
        };
    });

    totalQuantityEl.textContent = totalQuantity;
    totalPriceEl.textContent = totalPrice;

    let packingCharges = (totalPrice * 0.02).toFixed(2);
    document.getElementById('packingChargesDisplay').textContent = packingCharges;

    let totalAmount = (parseFloat(totalPrice) + parseFloat(packingCharges)).toFixed(2);
    document.getElementById('totalAmountDisplay').textContent = totalAmount;
}

// Handling Add to Cart and Order button click
document.querySelectorAll('.quantityInput').forEach((input, index) => {
    input.addEventListener('input', function() {
        const item = {
            img: document.querySelectorAll('.listProduct .item img')[index].src,
            name: document.querySelectorAll('.listProduct .item h3')[index].innerText,
            price: parseFloat(document.querySelectorAll('.listProduct .item .totalPriceValue')[index].innerText),
            quantity: parseInt(input.value)
        };

        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

        if (existingItemIndex > -0) {
            cart[existingItemIndex].quantity = item.quantity;
        } else {
            cart.push(item);
        }

        updateCart();
        document.getElementById('addToCartLink').querySelector('span').innerText = cart.length;
    });
});

// Checkout functionality
document.querySelector('.add-to-cart .checkout').onclick = function() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to proceed.');
        return;
    }

    document.getElementById('addToCartSection').classList.remove('active');
    setActiveSection('cartSection');
};

// Order form submission handling
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        state: document.getElementById('state').value,
        totalQuantity: document.getElementById('totalQuantity').innerText,
        totalPrice: document.getElementById('totalPrice').innerText,
        packingCharges: document.getElementById('packingChargesDisplay').innerText,
        totalAmount: document.getElementById('totalAmountDisplay').innerText,
    };

    fetch('http://localhost:8000/submit-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem placing the order. Please try again.');
    });
});

// Initialize total and packing charges on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});
