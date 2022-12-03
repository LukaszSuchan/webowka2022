var products = undefined;

async function load(){
    await loadProducts();
    products.forEach(e => {
        writeTreeView(e.category, e.products);
    })

    products.forEach(e => {
        document.getElementById(e.category+"-label").addEventListener("click", function(){
            var categoryProducts = document.getElementById(e.category+"-products")
            if(categoryProducts.style.display == "block"){
                categoryProducts.style.display="none";
                this.innerHTML = `<i class="chevron fa-solid fa-chevron-right"></i>`;
            } else {
                categoryProducts.style.display="block";
                this.innerHTML = `<i class="chevron fa-solid fa-chevron-down"></i>`;
            }
            
        });
    })
}

async function loadProducts() {
    let productsA = await (await fetch('resources/productsA.json')).json();
    // let productsB = await (await fetch('recources/productsB.json')).json();
    products = productsA.categories;
}


function writeTreeView(category, products) {
    var categoriesElement = document.getElementById("categories");
    console.log(categoriesElement);
    categoriesElement.innerHTML +=
        `
    <li class="category-list" id="${category}-list">
        <span id="${category}-label"><i class="chevron fa-solid fa-chevron-right"></i></span>
        <input type="checkbox" id="ch-${category}">
        <span>${category}</span>
        <ul id="${category}-products" class="products" style="display: none">
        </ul>
    </li>
    `;

    var productsElement = document.getElementById(category + "-products");
    products.forEach(element => {
        productsElement.innerHTML +=
            `
    <li id="${element.nazwa}-product">
        <input type="checkbox" id="ch-${element.nazwa}">
        <span>${element.nazwa}</span>
    </li>
    `;
    });


    console.log(category);
}

window.onload = load;