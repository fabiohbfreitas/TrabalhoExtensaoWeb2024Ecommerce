import { findUserById } from "../repositories/userRepository.mjs";

export function adminView(req, res) {
	const { info } = req.session;
	const user = findUserById(info);
	return res.render("admin.html", { user: user });
}
