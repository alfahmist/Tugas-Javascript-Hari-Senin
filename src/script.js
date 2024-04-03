// Get All Products
let container = document.getElementById("container");
let card = document.getElementById("card");

async function getProducts() {
	const response = await fetch(
		"https://api.escuelajs.co/api/v1/products?offset=0&limit=5"
	);
	const products = await response.json();
	return products;
}

async function displayProducts() {
	const products = await getProducts();
	products.forEach((product) => {
		console.log(product);
		let { id, title, price, description, images } = product;
		let a = createDiv(
			"a",
			"p-5",
			"w-60",
			"border-2",
			"rounded",
			"cursor-pointer"
		);
		let img = createDiv("img", "mb-4");
		let h1 = createDiv("h1", "mb-4");
		let p = createDiv("p", "font-bold");

		// a.href = id;
		img.src = "headphone.jpeg";
		h1.innerHTML = title;
		p.innerHTML = `$ ${price}`;
		container.append(a);
		a.append(img);
		a.append(h1);
		a.append(p);
	});
}

displayProducts();

function createDiv(tag, ...classes) {
	let div = document.createElement(tag);
	if (classes.length != 0) {
		div.classList.add(...classes);
	}
	return div;
}
