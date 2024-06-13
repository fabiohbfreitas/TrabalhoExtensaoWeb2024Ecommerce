import { Router } from "express"
import { userIsAuthenticatedMiddleware } from "../middlewares/userIsAuthenticated.mjs";
import { userIsAdmin } from "../middlewares/userIsAdmin.mjs";
import { userIsNOTAuthenticated } from "../middlewares/userIsNOTAuthenticated.mjs";
import { createUser, findUserByEmail, findUserById } from "../repositories/userRepository.mjs";
import * as AuthController from "../controllers/authController.mjs"

export const router = Router();

router.get("/", (req, res) => {
    const { info } = req.session;
    const user = findUserById(info);
    return res.render("index.html", { user: JSON.stringify(user) })
});
router.get("/auth/login", userIsNOTAuthenticated, (_, res) => res.render("login.html"));
router.get("/auth/register", userIsNOTAuthenticated, (_, res) => res.render("register.html"))


router.post("/auth/register", AuthController.register);
router.post("/auth/login", userIsNOTAuthenticated, AuthController.login);
router.get("/auth/logout", AuthController.logout);

router.get("/admin", userIsAdmin, (req, res) => {
    const { info } = req.session;
    const user = findUserById(info);
    return res.render("admin.html", { user: JSON.stringify(user, null, 2) })
});