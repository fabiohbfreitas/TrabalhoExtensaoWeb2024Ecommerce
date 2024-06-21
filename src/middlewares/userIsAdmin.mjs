export function userIsAdmin(req, res, next) {
	if (req.session.ok && req.session.info && req.session.admin) {
		return next();
	}

	return res.redirect("/");
}
