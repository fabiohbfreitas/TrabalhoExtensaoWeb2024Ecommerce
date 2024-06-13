import { createUser, findUserByEmail, findUserById } from "../repositories/userRepository.mjs";

export function login(req, res) {
    const { email, password } = req.body;
    // TODO: validate format
    const user = findUserByEmail(email);
    console.log(user);
    if (!user) {
        console.log("failed to find user")
        return res.redirect("/auth/register");
    }
    if (!(user.password === password)) {
        // TODO: show error
        console.log(user.password, password);
        console.log("wrong pass")
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
    const { name, email, password } = req.body;
    // TODO: validate format
    const user = findUserByEmail(email);
    if (user) {
        // TODO: Show error
        return res.redirect("/auth/register");
    }
    createUser(name, email, password);
    return res.redirect("/auth/login");
}

export function logout(req, res) {
    req.session.destroy();
    console.log("logout ok.")
    return res.redirect("/");
}