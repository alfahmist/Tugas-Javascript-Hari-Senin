// Get All Products
const container = document.getElementById("container");
const categorySection = document.getElementById("categorySection");

let defaultId = 1;
let lastId = defaultId;

async function getProducts() {
	const response = await fetch(
		"https://api.escuelajs.co/api/v1/products?offset=0&limit=5"
	);
	const products = await response.json();
	return products;
}

async function getCategory() {
	const response = await fetch("https://api.escuelajs.co/api/v1/categories");
	const categories = await response.json();
	return categories;
}

async function getCategoryList() {
	const categories = await getCategory();
	categories.map(({ name }) => {
		return name;
	});
}

async function getProductsById(id) {
	const response = await fetch(
		`https://api.escuelajs.co/api/v1/products/?categoryId=${id}&offset=0&limit=5`
	);
	const productsById = await response.json();
	return productsById;
}

async function displayProductsById(id, clicked) {
	if (clicked == true) {
		container.firstChild.remove();
	}
	let containerProduct = createDiv(
		"div",
		"justify-center",
		"flex",
		"gap-2",
		"flex-row",
		"flex-wrap"
	);

	container.append(containerProduct);
	const products = await getProductsById(id);

	// console.log(products);
	products.forEach((product) => {
		// console.log(product);
		const {
			title,
			price,
			description,
			images,
			category: { name },
		} = product;
		// console.log(name);
		const a = createDiv(
			"a",
			"card",
			"p-5",
			"w-60",
			"border-2",
			"rounded",
			"cursor-pointer"
		);
		const img = createDiv("img", "mb-4");
		const pCategory = createDiv("p", "text-xs", "mb-2", "font-semibold");
		const h1 = createDiv("h1", "mb-4");
		const p = createDiv("p", "font-bold");

		// a.href = id;
		img.src = "headphone.jpeg";
		pCategory.innerHTML = `${name}`;
		h1.innerHTML = title;
		p.innerHTML = `$ ${price}`;

		containerProduct.append(a);
		a.append(img);
		a.append(pCategory);
		a.append(h1);
		a.append(p);
	});
}

async function displayCategoryList() {
	const categories = await getCategory();
	const categoryList = categories.map(({ id, name }) => {
		return { id, name };
	});

	const categoryListSliced = categoryList.slice(0, 4);
	categoryListSliced.forEach((category) => {
		const { id, name } = category;
		const a = createDiv(
			"a",
			"border-b-2",
			"border-transparent",
			"hover:border-black",
			"cursor-pointer"
		);
		a.innerHTML = name;
		a.setAttribute(`onClick`, `displayProductsById(${id + "," + true})`);
		categorySection.append(a);
	});
}

displayCategoryList();
displayProductsById();

function createDiv(tag, ...classes) {
	let div = document.createElement(tag);
	if (classes.length != 0) {
		div.classList.add(...classes);
	}
	return div;
}
