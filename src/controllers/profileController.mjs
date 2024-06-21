import {
	deleteUser,
	findUserById,
	updateUser,
} from "../repositories/userRepository.mjs";

export function profileView(req, res) {
	const { info, admin } = req.session;
	const user = findUserById(info);
	return res.render("profile.html", { user, admin });
}

export function updateProfile(req, res) {
	const { name, email } = req.body;
	const { info } = req.session;
	const user = findUserById(info);
	updateUser(name || user.email, email || user.email, info);

	return res.redirect("/profile");
}

export function deleteProfile(req, res) {
	const { info } = req.session;
	deleteUser(info);
	req.session.destroy();
	return res.redirect("/");
}
