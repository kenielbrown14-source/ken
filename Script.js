/* Full Name: Keniel Brown
    ID: 2403229
    Module: Web Programming (CIT2011)
    Assignment: Individual Assignment #2
*/

// IA#2 Q2d: Global cart array for logic
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
const STORAGE_KEY = 'shoppingCart'; 

// --- Event Handling and Validation ---

// IA#2 Q2c: Login Form Validation
function validateLogin(e) {
    e.preventDefault(); // IA#2 Q2b: Prevent form submission default
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let errorMsg = document.getElementById('login-error');
    
    if(user === "" || pass === "") {
        errorMsg.innerText = "Error: Username and Password cannot be empty.";
        return false;
    }
    // Success: Redirect to Products page
    alert("Login Successful! Welcome to AutoMotive Prime.");
    window.location.href = "products.html";
    return false; // Still return false to prevent default HTML action
}

// IA#2 Q2c: Register Form Validation
function validateRegister(e) {
    e.preventDefault();
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let errorMsg = document.getElementById('reg-error');
    
    if(fullname === "" || email === "" || !email.includes("@")) {
        errorMsg.innerText = "Error: Please fill all fields and enter a valid email.";
        return false;
    }
    alert("Registration Successful! Please log in.");
    window.location.href = "index.html";
    return false; 
}

// --- Cart and Arithmetic Logic ---

// IA#2 Q2d: Add Items to Cart
function addToCart(productName, price) {
    // Check if the item is already in the cart (simple version: always add new instance)
    let item = {
        name: productName,
        price: parseFloat(price),
        qty: 1
    };
    
    cart.push(item);
    // IA#2 Q2d: Save to local storage for persistence
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    alert(productName + " added to your booking list.");
}

// IA#2 Q2d: Load/Calculate Cart Totals and Display (DOM Manipulation)
function loadCart() {
    let cartTableBody = document.getElementById('cart-items');
    let subtotalDisplay = document.getElementById('subtotal');
    let taxDisplay = document.getElementById('tax');
    let totalDisplay = document.getElementById('total');

    // Check if we are on the cart page before proceeding
    if(!cartTableBody) return; 

    // IA#2 Q2a: Clear previous table content
    cartTableBody.innerHTML = ""; 
    let subtotal = 0;
    
    // IA#2 Q2d: Arithmetic Calculation Loop
    cart.forEach((item, index) => {
        subtotal += item.price * item.qty; // Calculate subtotal
        
        // IA#2 Q2a: Dynamically update table
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.qty}</td>
                <td><button onclick="removeItem(${index})" style="background-color: #d9534f; margin:0;">Remove</button></td>
            </tr>
        `;
        cartTableBody.innerHTML += row;
    });

    // IA#2 Q2d: Final Arithmetic Calculation (Tax & Total)
    let taxRate = 0.15; // 15% tax
    let tax = subtotal * taxRate;
    let total = subtotal + tax;

    // IA#2 Q2a: Update DOM with final results
    subtotalDisplay.innerText = subtotal.toFixed(2);
    taxDisplay.innerText = tax.toFixed(2);
    totalDisplay.innerText = total.toFixed(2);
}

// Clear All button logic
function clearCart() {
    cart = [];
    localStorage.removeItem(STORAGE_KEY);
    alert("All services cleared from your booking list.");
    loadCart(); // Reload the cart display
}

// Remove single item logic
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    loadCart();
}

// Checkout logic
function processCheckout(e) {
    e.preventDefault();
    alert("Payment Confirmed! Your vehicle service has been booked. Thank you for choosing AutoMotive Prime.");
    clearCart(); // Clear cart after successful checkout
    window.location.href = "products.html"; // Redirect to home/services
}

// Initial load check for the cart page
if (document.getElementById('cart-items')) {
    loadCart();
}