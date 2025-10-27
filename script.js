let isLogin = true;
//  &times; it represent the symbol for closeing the login page in html file
// islogin? its a boolean variable (?)means if true, (:)means else in html file
function openAuthModal() {
  document.getElementById("authModal").style.display = "block";
  // here block make the login page visible
}

function closeAuthModal() {
  document.getElementById("authModal").style.display = "none";
  // here none make the login page invisible
}

function toggleAuth() {
  isLogin = !isLogin;
  //  isLogin = !isLogin; This flips the value. If it was true, it becomes false, and vice versa.
  document.getElementById("modalTitle").innerText = isLogin ? "Login" : "Sign Up";
  document.getElementById("toggleText").innerHTML = isLogin
    ? `Don't have an account? <a href="#" onclick="toggleAuth()">Sign Up</a>`
    : `Already have an account? <a href="#" onclick="toggleAuth()">Login</a>`;
}

function handleAuth(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (isLogin) {
    // Dummy login check
    const user = JSON.parse(localStorage.getItem(username));
    if (user && user.password === password) {
      alert("Login successful!");
      closeAuthModal();
    } 
    else {
      alert("Invalid credentials.");
    }
  } else {
    // Signup - save user to localStorage
    localStorage.setItem(username, JSON.stringify({ password }));// here password stores the password
    // its like { password: "abc123" }
    alert("Signup successful! Please login.");
    toggleAuth();
    // JSON.stringify :it only stores string not object 
    //  localStorage:It's like a small storage space inside your browser that remembers things even after the page is closed or refreshed.
  }
}

// Close modal on outside click
window.onclick = function (event) {
  const modal = document.getElementById("authModal");
  const cartIcon = document.getElementById("cart-icon");

  if (event.target === modal) {
    closeAuthModal();
  }
  if (event.target === cartIcon) {
    return; // do nothing if user clicked the cart icon
  }
};


//cart code
// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// JSON.parse(...): Converts the stored JSON string into a JavaScript object (array).

// || []: If no cart is found, use an empty array as default.

document.querySelectorAll(".add-to-cart").forEach(button => { // add-to-cart is the class available to all the products
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.dataset.id;
    const name = this.dataset.name;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart`);
  });
});

const cartt = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

let total = 0;

function renderCart() {
  cartItemsContainer.innerHTML = "";
  total = 0;

  cartt.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
            <img src="${item.image}" class="cart-img" style="width:100px; height:auto;">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>$${item.price} × ${item.quantity}</p>
                <p><strong>Total:</strong> $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;

    cartItemsContainer.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalElement.textContent = total.toFixed(2);

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      cartt.splice(index, 1); // Remove item from array
      localStorage.setItem("cart", JSON.stringify(cartt)); // Update localStorage
      renderCart(); // Re-render cart
    });
  });
}

renderCart();



function toggleCart(e) {
  e.preventDefault(); // Stop page reload
  const cartSection = document.getElementById("cart-main");
  cartSection.style.display =
    cartSection.style.display === "none" ? "block" : "none";
}
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active');
}
