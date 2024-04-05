// Get Element
const container = document.getElementById("container");
const categorySection = document.getElementById("categorySection");

let defaultId = 1;

// get product
async function getProducts() {
	const response = await fetch(
		"https://api.escuelajs.co/api/v1/products?offset=0&limit=5"
	);
	const products = await response.json();
	return products;
}

// get category
async function getCategory() {
	const response = await fetch("https://api.escuelajs.co/api/v1/categories");
	const categories = await response.json();
	// console.log(categories);
	return categories;
}

// get category name
async function getCategoryList() {
	const categories = await getCategory();
	categories.map(({ name }) => {
		return name;
	});
}

// get products by category id
async function getProductsByCategoryId(id) {
	const response = await fetch(
		`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`
		// `https://api.escuelajs.co/api/v1/products/?categoryId=${id}&offset=0&limit=5`
	);
	const productsById = await response.json();
	return productsById;
}

// display product by category id
async function displayProductsByCategoryId(id, clicked) {
	// if button clicked clear all child element
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

	const products = await getProductsByCategoryId(id);

	// show all product
	products.forEach((product) => {
		// destructuring array
		const {
			title,
			price,
			images,
			category: { name },
		} = product;
		// create element
		const a = createDiv(
			"a",
			"card",
			"p-5",
			"w-60",
			"border-2",
			"rounded",
			"cursor-pointer"
		);

		// create element
		const img = createDiv("img", "mb-4");
		const pCategory = createDiv("p", "text-xs", "mb-2", "font-semibold");
		const h1 = createDiv("h1", "mb-4");
		const p = createDiv("p", "font-bold");

		// cleaning url
		var imageClean = images[0].replace(/["[\]\]]/gi, "");

		// insert value
		img.src = imageClean;
		console.log(imageClean);
		pCategory.innerHTML = `${name}`;
		h1.innerHTML = title;
		p.innerHTML = `$ ${price}`;

		// append element
		container.append(containerProduct);
		containerProduct.append(a);
		a.append(img);
		a.append(pCategory);
		a.append(h1);
		a.append(p);
	});
}

// to show category which product array length not zero
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

// function displayCategoryList
async function displayCategoryList() {
	const categories = await getCategory();
	const categoryList = categories.map(({ id, name }) => {
		return { id, name };
	});

	// filtering category
	let categoryProduct = await sorting(categoryList);

	categoryProduct.forEach((category) => {
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

// function to create tag with classes
function createDiv(tag, ...classes) {
	let div = document.createElement(tag);
	if (classes.length != 0) {
		div.classList.add(...classes);
	}
	return div;
}

// display menu and Product
displayCategoryList();
displayProductsByCategoryId(defaultId);
