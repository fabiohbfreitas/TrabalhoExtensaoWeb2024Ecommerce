import {
	findCategory,
	listCategories,
} from "../repositories/categoryRepository.mjs";
import {
	createProduct,
	deleteProductById,
	getProduct,
	listProducts,
	listProductsForCategory,
	updateProductInfo,
} from "../repositories/productRepository.mjs";
import { findUserById } from "../repositories/userRepository.mjs";

export function productsView(req, res) {
	const { info, admin } = req.session;
	const user = findUserById(info);
	const categories = listCategories();
	const products = listProducts();
	return res.render("index.html", { user, admin, categories, products });
}

export function deleteProduct(req, res) {
	const { id } = req.params;
	if (!id) {
		return res.redirect("/");
	}
	deleteProductById(id);
	return res.redirect("/");
}

export function updateProductView(req, res) {
	const { id } = req.params;
	const { info, admin } = req.session;
	const user = findUserById(info);
	if (!id) {
		return res.redirect("/");
	}
	const product = getProduct(id);
	const allCategories = listCategories();
	const categories = allCategories.map((category) => ({
		...category,
		isCurrentCategory: category.id === product.categoryId,
	}));

	return res.render("editProduct.html", { user, admin, product, categories });
}

export function updateProduct(req, res) {
	const { id } = req.params;
	const { title, description, quantity, price, category, image } = req.body;
	if (!id) {
		return res.redirect("/");
	}
	updateProductInfo(
		title,
		description,
		image,
		quantity,
		price,
		Number(category),
		id,
	);
	return res.redirect("/");
}

export function adminCreateProduct(req, res) {
	const { title, description, quantity, price, category, image } = req.body;
	createProduct(title, description, image, quantity, price, Number(category));
	return res.redirect("/");
}

export function productsByCategory(req, res) {
	const { id: categoryID } = req.params;

	const { info, admin } = req.session;
	const user = findUserById(info);

	let products = listProductsForCategory(categoryID);
	let category = findCategory(categoryID);

	return res.render("categoryProduct.html", {
		user,
		admin,
		products,
		category,
	});
}
