import { findUserById } from "../repositories/userRepository.mjs";

export function productsView(req, res) {
    const { info } = req.session;
    const user = findUserById(info);
    return res.render("index.html", { user: JSON.stringify(user) })
}