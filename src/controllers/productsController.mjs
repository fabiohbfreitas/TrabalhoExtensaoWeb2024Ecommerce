import { findUserById } from "../repositories/userRepository.mjs";

export function productsView(req, res) {
    const { info, admin } = req.session;
    const user = findUserById(info);
    return res.render("index.html", { user, admin })
}