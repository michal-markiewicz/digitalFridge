"use strict";

function Product(name, expirationDate)
{
    this.id = Math.round(Math.random() * 1e9);
    this.name = name;
    this.expirationDate = expirationDate;
}

const productSubmitButton = document.querySelector('#submit-product');
const productNameInput = document.querySelector('#product-name');
const productExpirationDateInput = document.querySelector('#product-expiration-date');

function addProduct (e)
{
    e.preventDefault();

    const productName = productNameInput.value;
    const productExpirationDate = productExpirationDateInput.value;
    const product = new Product(productName, productExpirationDate);

    saveProductToLocalStorage(product);
    addProductToHtml(product);
}

function saveProductToLocalStorage (productObj)
{
    if (localStorage.getItem('Products') === null)
    {
        localStorage.setItem('Products', '[]');
    }

    let productListString = localStorage.getItem('Products');
    let productList = JSON.parse(productListString);
    
    productList.push(productObj);
    productListString = JSON.stringify(productList);

    localStorage.setItem('Products', productListString)
}

function addProductToHtml (productObj)
{
    const htmlProductContainer = document.querySelector('#products-container');
    
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.setAttribute("data-id", productObj.id);

    htmlProductContainer.appendChild(productElement);
    productElement.innerHTML = `
    <div class="product-name">
        <span>${productObj.name}</span>
    </div>

    <div class="product-expiration-date">
        <span>${productObj.expirationDate}</span>
    </div>

    <div class="product-remove">
        <img src="img/delete-button.png" alt="Delete button" height="24" width="24">
    </div>
    `
}

productSubmitButton.addEventListener('click', addProduct);


