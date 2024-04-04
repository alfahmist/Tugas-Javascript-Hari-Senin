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
	// console.log(categories);

	return categories;
}

async function getCategoryList() {
	const categories = await getCategory();
	categories.map(({ name }) => {
		return name;
	});
}

async function getProductsByCategoryId(id) {
	const response = await fetch(
		`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`
		// `https://api.escuelajs.co/api/v1/products/?categoryId=${id}&offset=0&limit=5`
	);
	const productsById = await response.json();
	return productsById;
}

async function displayProductsByCategoryId(id, clicked) {
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
	const products = await getProductsByCategoryId(id);

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

		var imageClean = images[0].replace(/["[\]\]]/gi, "");
		img.src = imageClean;
		console.log(imageClean);
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

async function sorting(categories) {
	console.log(categories);
	let arr = [];
	for (const file of categories) {
		const contents = await getProductsByCategoryId(file.id);
		if (contents.length != 0) {
			arr.push(file);
		}
	}
	return arr;
}
async function displayCategoryList() {
	const categories = await getCategory();
	const categoryList = categories.map(({ id, name }) => {
		return { id, name };
	});

	let categoryNotNull = await sorting(categoryList);
	console.log(categoryNotNull);
	categoryNotNull.forEach((category) => {
		const { id, name } = category;
		const a = createDiv(
			"a",
			"border-b-2",
			"border-transparent",
			"hover:border-black",
			"cursor-pointer"
		);
		a.innerHTML = name;
		a.setAttribute(
			`onClick`,
			`displayProductsByCategoryId(${id + "," + true})`
		);
		categorySection.append(a);
	});
}

displayCategoryList();
displayProductsByCategoryId(defaultId);

function createDiv(tag, ...classes) {
	let div = document.createElement(tag);
	if (classes.length != 0) {
		div.classList.add(...classes);
	}
	return div;
}
