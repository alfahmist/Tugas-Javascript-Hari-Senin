// Get All Products

async function getProducts() {
    const response = await fetch(
        "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
    );
    const products = await response.json();
    return products;
}

let container = document.getElementById("container");
let card = document.getElementById("card");

function createDiv(tag, ...classes) {
    let div = document.createElement(tag);
    div.classList.add(...classes);
    return div;
}

getProducts().then((products) => {
    // console.log(products);
    products.forEach((product) => {
        console.log(product);
        let { id, title, price, description, images } = product;
        // let div = document.createElement("div");
        // div.classList.add("p-5", "bg-red-500");
        let div = createDiv("div", "p-5", "bg-red-500");
        let img = createDiv("img");
        img.src = images[0];
        img.referrerpolicy = "no-referrer";
        div.innerHTML = title;
        container.append(img);
        container.append(div);
    });
});
