import { comparePassword, hashPassword } from "../lib/passwords.mjs";
import {
	createUser,
	findUserByEmail,
} from "../repositories/userRepository.mjs";

export function login(req, res) {
	const { email, password } = req.body;
	// TODO: validate format
	const user = findUserByEmail(email);
	if (!user) {
		console.log("failed to find user");
		return res.redirect("/auth/sign-up");
	}
	if (!comparePassword(password, user.password)) {
		// TODO: show error
		console.log("wrong pass");
		return res.redirect("/auth/login");
	}

	// set session
	req.session.ok = true;
	req.session.info = user.id;
	req.session.admin = user.isAdmin;

	console.log("login ok.");
	return res.redirect("/");
}

export function register(req, res) {
	const { name, email, password: rawPassword } = req.body;
	// TODO: validate format
	const user = findUserByEmail(email);
	if (user) {
		// TODO: Show error
		return res.redirect("/auth/sign-up");
	}
	const password = hashPassword(rawPassword);
	createUser(name, email, password);
	return res.redirect("/auth/login");
}

export function logout(req, res) {
	req.session.destroy();
	console.log("logout ok.");
	return res.redirect("/");
}
