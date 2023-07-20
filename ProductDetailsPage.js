var cart = localStorage.getItem("cart");
var id = localStorage.getItem("id");

var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id:'+id ;
window.history.pushState({ path: newurl }, '', newurl);

var mArr = JSON.parse(localStorage.getItem("product"));
if(mArr === null)
var mArr = [];

var count = 0;


var cartItems = document.getElementById("number-of-items");
cartItems.innerHTML = cart;

function createProductDetails(obj) {
    var wrapper = document.createElement('div');
    wrapper.className = "wrapper";

    var imgDiv = document.createElement('div');
    imgDiv.className = "imgDiv";

    var image = document.createElement('img');
    image.src = obj.preview;
    image.className = "image";

    imgDiv.appendChild(image);

    var contentWrapper = document.createElement('div');
    contentWrapper.className = "content-wrapper";

    var productName = document.createElement('h1');
    productName.innerHTML = obj.name;

    var productBrand = document.createElement('p');
    productBrand.innerHTML = obj.brand;
    productBrand.className = "text-size-brand";

    var priceWrapper = document.createElement('div');
    priceWrapper.className = "price-wrapper";

    var productPriceHeading = document.createElement('p');
    productPriceHeading.innerHTML = "Price: Rs";

    var productPrice = document.createElement('p');
    productPrice.innerHTML = obj.price;
    productPrice.className = "price";

    var productDescriptionHeading = document.createElement('p');
    productDescriptionHeading.innerHTML = "Description";
    productDescriptionHeading.className = "text-size";

    var productDescription = document.createElement('p');
    productDescription.innerHTML = obj.description;
    productDescription.className = "description";

    var productPreviewHeading = document.createElement('p');
    productPreviewHeading.innerHTML = "Product Preview";
    productPreviewHeading.className = "text-size";

    var previewWrapper = document.createElement('div');
    previewWrapper.className = "preview-wrapper";

    var previewDiv = document.createElement('div');
        previewDiv.className = "preview-card";

    var photoArr = obj.photos;

    for(var j=0;j<photoArr.length;j++) {
        var previewImageWrapper = document.createElement('div');
        previewImageWrapper.className = "previewImage-wrapper";
        var previewImage = document.createElement('img');
        previewImage.id = "preview-image";
        previewImage.src = obj.photos[j];
        previewImageWrapper.appendChild(previewImage);

        previewDiv.appendChild(previewImageWrapper);
    }

    var button = document.createElement('button');
    button.className = "btn";
    button.innerHTML = "Add to Cart";

    priceWrapper.appendChild(productPriceHeading);
    priceWrapper.appendChild(productPrice);

    previewWrapper.appendChild(previewDiv);

    contentWrapper.appendChild(productName);
    contentWrapper.appendChild(productBrand);
    contentWrapper.appendChild(priceWrapper);
    contentWrapper.appendChild(productDescriptionHeading);
    contentWrapper.appendChild(productDescription);
    contentWrapper.appendChild(productPreviewHeading);
    contentWrapper.appendChild(previewWrapper);
    contentWrapper.appendChild(button);

    wrapper.appendChild(imgDiv);
    wrapper.appendChild(contentWrapper);

    button.onclick = function() {
        for(var z=0;z<mArr.length;z++) {
            if(mArr[z].id === obj.id) {
                var position = z;
                break;
            }
        }
        mObj = {"id":obj.id,
                "name":obj.name,
                "preview":obj.preview,
                "price":obj.price,
                "quantity":count}
                if(mObj.id === obj.id) {
                    count= ++count;
                    var payable = count*obj.price;
                    mObj.quantity = count;
                    mObj.payable = payable;
                }
        mArr[z] = mObj;
        localStorage.setItem("product", JSON.stringify(mArr));
        cart = ++cart;
        cartItems.innerHTML = cart;
        localStorage.setItem("cart", cart);
    }
    previewDiv.onclick = function(e) {
        previewDiv.style.border = "none";
        image.src = e.target.src;
        e.target.style.border = "2px solid teal";
    }

    return wrapper;
}

var xhttp = new XMLHttpRequest();
xhttp.open('Get', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
xhttp.onreadystatechange = function() {
    if(this.readyState === 4) {
        var data = JSON.parse(this.responseText);
        for(var i=0; i<data.length; i++) {
            if(data[i].id === localStorage.getItem("id"))
                main.appendChild(createProductDetails(data[i]));
        }
    }
}
xhttp.send();