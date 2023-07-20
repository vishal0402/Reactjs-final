$(document).ready(function() {
    $('#multiple-items').slick({
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        // variableWidth: true
      });
    });

function createClothCard(obj) {
    var clothCardWrapper = document.createElement('div');
    clothCardWrapper.className = "card-wrapper";

    var clothPics = document.createElement('img');
    clothPics.className = "img";
    clothPics.src = obj.preview;

    var clothName = document.createElement('h4');
    clothName.className = "name";
    clothName.innerHTML = obj.name;

    var clothBrand = document.createElement('p');
    clothBrand.className = "para";
    clothBrand.innerHTML = obj.brand;

    var clothPrice = document.createElement('p');
    clothPrice.className = "price"
    clothPrice.innerHTML = 'Rs ' + obj.price;

    clothCardWrapper.appendChild(clothPics);
    clothCardWrapper.appendChild(clothName);
    clothCardWrapper.appendChild(clothBrand);
    clothCardWrapper.appendChild(clothPrice);

    clothCardWrapper.onclick = function() {
        localStorage.setItem('id', obj.id);
        location.assign("ProductDetailsPage.html");
    }

    return clothCardWrapper;
}
function createAccessoryCard(obj) {
    var accessoryCardWrapper = document.createElement('div');
    accessoryCardWrapper.className = "card-wrapper";
    
    var accessoryPics = document.createElement('img');
    accessoryPics.className = "img";
    accessoryPics.src = obj.preview;
    
    var accessoryName = document.createElement('h4');
    accessoryName.className = "name";
    accessoryName.innerHTML = obj.name;
    
    var accessoryBrand = document.createElement('p');
    accessoryBrand.className = "para";
    accessoryBrand.innerHTML = obj.brand;
    
    var accessoryPrice = document.createElement('p');
    accessoryPrice.className = "price"
    accessoryPrice.innerHTML = 'Rs ' + obj.price;
    
    accessoryCardWrapper.appendChild(accessoryPics);
    accessoryCardWrapper.appendChild(accessoryName);
    accessoryCardWrapper.appendChild(accessoryBrand);
    accessoryCardWrapper.appendChild(accessoryPrice);

    accessoryCardWrapper.onclick = function() {
        localStorage.setItem('id', obj.id);
        location.assign("ProductDetailsPage.html");
    }

    return accessoryCardWrapper;
}
var cart = localStorage.getItem("cart");

if(cart === undefined || cart === null) {
    cart = 0;
}

var cartItems = document.getElementById("number-of-items");
cartItems.innerHTML = cart;

localStorage.setItem("cart", cartItems.innerHTML);

var clothSection = document.getElementById('cloth-section');
var accessorySection = document.getElementById('accessory-section');

var xhttp = new XMLHttpRequest();
xhttp.open('Get', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
xhttp.onreadystatechange = function() {
    if(this.readyState === 4) {
        var data = JSON.parse(this.responseText);
        for(var i=0; i<data.length; i++) {
            if(data[i].isAccessory === false)
                clothSection.appendChild(createClothCard(data[i]));
            else
                accessorySection.appendChild(createAccessoryCard(data[i]));
        }
    }
}
xhttp.send();