var products = undefined;
var mainListProducts = new Set();
async function load() {
    await loadProducts();
    products.forEach(e => {
        writeTreeView(e.category, e.products);
    });

    products.forEach(e => {
        var categoryProducts = document.getElementById(e.category + "-products")
        document.getElementById(e.category + "-label").addEventListener("click", function () {
            if (categoryProducts.style.display == "block") {
                categoryProducts.style.display = "none";
                this.innerHTML = `<i class="chevron fa-solid fa-chevron-right"></i>`;
            } else {
                categoryProducts.style.display = "block";
                this.innerHTML = `<i class="chevron fa-solid fa-chevron-down"></i>`;
            }

        });

        document.getElementById("ch-" + e.category).addEventListener("change", function () {
            var productLabel = document.getElementById(e.category + "-label");
            if (this.checked) {
                if (categoryProducts.style.display == "block") {
                    categoryProducts.style.display = "none";
                    productLabel.innerHTML = `<i class="chevron fa-solid fa-chevron-right"></i>`;
                } else {
                    categoryProducts.style.display = "block";
                    productLabel.innerHTML = `<i class="chevron fa-solid fa-chevron-down"></i>`;
                }
                e.products.forEach(p => {
                    document.getElementById("ch-" + p.nazwa).checked = true
                    mainListProducts.add(p.nazwa);
                });
            }
            else {
                if (categoryProducts.style.display == "block") {
                    categoryProducts.style.display = "none";
                    productLabel.innerHTML = `<i class="chevron fa-solid fa-chevron-right"></i>`;
                } else {
                    categoryProducts.style.display = "block";
                    productLabel.innerHTML = `<i class="chevron fa-solid fa-chevron-down"></i>`;
                }
                e.products.forEach(p => {
                    document.getElementById("ch-" + p.nazwa).checked = false
                    mainListProducts.delete(p.nazwa);
                });
            }
            loadMainList();
        });

        e.products.forEach(p => {
            document.getElementById("ch-"+p.nazwa).addEventListener("change", function() {
                if (this.checked) {
                    mainListProducts.add(p.nazwa)
                } 
                else 
                {
                    if(mainListProducts.length != 0) {
                        mainListProducts.delete(p.nazwa)
                    }
                }
                var full = true;
                console.log([].slice.call(document.getElementById("ch-" + e.category).getElementsByClassName("product-checkbox")));
                [].slice.call(document.getElementById(e.category+"-products").getElementsByClassName("product-in-list")).forEach(pil => {
                    var ch = pil.getElementsByClassName("product-checkbox")[0];
                    if(ch.checked == false){
                        full = false;
                    }
                });
                if(full){
                    document.getElementById("ch-" + e.category).checked = true;
                } else {
                    document.getElementById("ch-" + e.category).checked = false;
                }
                loadMainList();
            })
        });
    });
}

function loadMainList() {
    var mainList = document.getElementById("main-list");
    mainList.innerHTML = ``;
    console.log(mainListProducts);
    mainListProducts.forEach(mlp => {
        console.log("updating")
        mainList.innerHTML+=
        `
        <li id="${mlp}-record">
            <span>${mlp}</span>
        </li>
        `
    });
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
    <li id="${element.nazwa}-product" class="product-in-list">
        <input type="checkbox" id="ch-${element.nazwa}" class="product-checkbox">
        <span>${element.nazwa}</span>
    </li>
    `;
    });


    console.log(category);
}

window.onload = load;