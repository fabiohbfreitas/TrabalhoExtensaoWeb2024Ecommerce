import { listCategories } from "../repositories/categoryRepository.mjs";
import { findUserById } from "../repositories/userRepository.mjs";

export function adminView(req, res) {
	const { info, admin } = req.session;
	const user = findUserById(info);
	const categories = listCategories();
	return res.render("admin.html", { user, admin, categories });
}
