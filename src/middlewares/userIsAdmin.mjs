export function userIsAdmin(req, res, next) {
    if (req.session.ok && req.session.info && req.session.admin == "true") {
        return next();
    }
    return res.redirect("/");
}