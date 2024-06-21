export function userIsAuthenticatedMiddleware(req, res, next) {
	if (req.session.ok && req.session.info) {
		return next();
	}
	return res.redirect("/auth/login");
}
