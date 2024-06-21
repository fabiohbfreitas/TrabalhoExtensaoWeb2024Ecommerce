import { listCategories } from "../repositories/categoryRepository.mjs";
import {
	createProduct,
	deleteProductById,
	getProduct,
	listProducts,
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
	console.log("deleted product");
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

	return res.render("editProduct.html", { user, admin, product });
}

export function updateProduct(req, res) {
	const { id } = req.params;
	const { title, description, quantity, price } = req.body;
	if (!id) {
		return res.redirect("/");
	}
	const product = getProduct(id);
	updateProductInfo(title, description, quantity, price, id);
	return res.redirect("/");
}

export function adminCreateProduct(req, res) {
	const { title, description, quantity, price } = req.body;
	createProduct(title, description, quantity, price, 1);
	return res.redirect("/");
}
