export function userIsNOTAuthenticated(req, res, next) {
	if (!req.session.ok) {
		return next();
	}
	return res.redirect("/");
}
