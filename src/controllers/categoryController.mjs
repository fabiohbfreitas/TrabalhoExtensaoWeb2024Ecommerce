import {
	createCategory,
	deleteCategory,
} from "../repositories/categoryRepository.mjs";

export function adminCreateCategory(req, res) {
	const { category } = req.body;
	createCategory(category);
	return res.redirect("/");
}

export function adminDeleteCategory(req, res) {
	const { id } = req.params;
	deleteCategory(id);
	return res.redirect("/");
}
