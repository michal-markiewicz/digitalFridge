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

    if (productName === '' || productExpirationDate === '')
    {
        return alert('Every input is required.');
    }
    else if (productName.length >= 16)
    {
        return alert('Product name must be no longer than 16 characters.');
    }

    const product = new Product(productName, productExpirationDate);

    saveProductToLocalStorage(product);
    createHtmlProductList();
}

const productsContainer = document.querySelector('#products-container');

productSubmitButton.addEventListener('click', addProduct);
productsContainer.addEventListener('click', removeProduct);

function removeProduct (e)
{
    if (e.target.className === 'product-remove-icon')
    {
        const productElement = e.target.parentElement.parentElement;
        const productID = productElement.getAttribute('data-id');

        let productListString = localStorage.getItem('Products');
        let productList = JSON.parse(productListString);

        function matchProductById (product)
        {
            return product.id == productID;
        }

        const productIndex = productList.findIndex(matchProductById);

        productList.splice(productIndex, 1);

        productListString = JSON.stringify(productList);
    
        localStorage.setItem('Products', productListString)
        createHtmlProductList();
    }
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
        <img src="img/delete-button.png" class="product-remove-icon" alt="Delete button" height="24" width="24">
    </div>
    `
}

function createHtmlProductList ()
{
    productsContainer.innerHTML = '';

    let productListString = localStorage.getItem('Products');
    if (productListString === null)
    {
        return 'no products in localStorage';
    }

    let productList = JSON.parse(productListString);

    function sortByDate (productOne, productTwo) 
    {
        let dateOne = new Date(productOne.expirationDate); 
        let dateTwo = new Date(productTwo.expirationDate);

        if (dateOne.getTime() < dateTwo.getTime()) 
        {
            // Sort productOne before productTwo
            return -1;
        }
        else if (dateOne.getTime() > dateTwo.getTime()) 
        {
            // Sort productTwo before productOne
            return 1;
        }
        else 
        {
            // Keep original order
            return 0;
        }
    }

    const productListSorted = productList.sort(sortByDate);

    productListSorted.forEach((product) => {
        addProductToHtml(product);
    })
}

createHtmlProductList();