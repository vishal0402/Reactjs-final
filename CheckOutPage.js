var mArr = JSON.parse(localStorage.getItem("product"));

var cart = localStorage.getItem("cart");
var id = localStorage.getItem("id");
var totalPrice = 0;

var cartItems = document.getElementById("number-of-items");

localStorage.setItem("cart", cart);
cartItems.innerHTML = cart;

var CheckoutPage = document.createElement('h1');
CheckoutPage.className = "checkout-text";
CheckoutPage.innerHTML = "Checkout";

var totalItems = document.createElement('h3');
totalItems.className = "item-name";
if(cart === 1)
totalItems.innerHTML = "Total Item: 1";
else
totalItems.innerHTML = "Total Items: " + cart;

var header = document.getElementById('header');

header.appendChild(CheckoutPage);
header.appendChild(totalItems);

function createCartItems(obj) {
var wrapper = document.createElement('div');
wrapper.className = "wrapper";

var itemWrapper = document.createElement('div');
itemWrapper.className = "item-wrapper";

var imageWrapper = document.createElement('div');
imageWrapper.className = "image-wrapper";
var itemImage = document.createElement('img');
itemImage.className = "item-image";
itemImage.src = obj.preview;

var contentWrapper = document.createElement('div');
contentWrapper.className = "content-wrapper";
var itemName = document.createElement('h3');
itemName.className = "item-name";
itemName.innerHTML = obj.name;

var quantity = document.createElement('p');
quantity.id = "quantity";
quantity.innerHTML ="x" + obj.quantity;

var itemPrice = document.createElement('p');
itemPrice.innerHTML = "Amount: Rs " + obj.payable;
totalPrice = totalPrice + obj.payable;

imageWrapper.appendChild(itemImage);
contentWrapper.appendChild(itemName);
contentWrapper.appendChild(quantity);
contentWrapper.appendChild(itemPrice);

itemWrapper.appendChild(imageWrapper);
itemWrapper.appendChild(contentWrapper);

wrapper.appendChild(itemWrapper);

var total = document.getElementById('total-amount');
total.innerHTML = totalPrice;

return wrapper;
}

var button = document.getElementById('btn');

button.onclick = function() {
    location.assign("OrderConfirmationPage.html");
}

var mainDiv = document.getElementById('main');

for(var i=0;i<mArr.length;i++) {
    mainDiv.appendChild(createCartItems(mArr[i]));
}