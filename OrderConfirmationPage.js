var cartItems = document.getElementById("number-of-items");
cartItems.innerHTML = 0;

localStorage.setItem("cart", 0);
var product = localStorage.getItem("product");
localStorage.setItem("product","[]");