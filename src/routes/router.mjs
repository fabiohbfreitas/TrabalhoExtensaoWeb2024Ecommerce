import { Router } from "express"
import { randomUUID } from "node:crypto"
import { userIsAuthenticatedMiddleware } from "../middleware/userIsAuthenticated.mjs";
import { userIsAdmin } from "../middleware/userIsAdmin.mjs";
import { userIsNOTAuthenticated } from "../middleware/userIsNOTAuthenticated.mjs";

export const router = Router();

router.get("/", (_, res) => res.render("index.html"));
router.get("/auth/login", userIsNOTAuthenticated, (_, res) => res.render("login.html"));
router.get("/auth/register", userIsNOTAuthenticated, (_, res) => res.render("register.html"))

const users = [];


router.post("/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    // TODO: validate format
    const user = users.find(u => u.email === email);
    if (user) {
        // TODO: Show error
        return res.redirect("/auth/register");
    }
    const newUser = { id: randomUUID(), name, email, password, isAdmin: users.length === 0 };
    console.log(newUser);
    users.push(newUser);
    return res.redirect("/auth/login");
});

router.post("/auth/login", userIsNOTAuthenticated, (req, res) => {
    const { email, password } = req.body;
    // TODO: validate format
    const user = users.find(u => u.email === email);
    if (!user) {
        console.log("failed to find user")
        return res.redirect("/auth/register");
    }
    console.log(user);
    if (!(user.password === password)) {
        // TODO: show error
        console.log("wrong pass")
        return res.redirect("/auth/login");
    }

    // set session
    req.session.ok = true;
    req.session.info = user.id;
    req.session.admin = user.isAdmin;

    return res.redirect("/test");
});

router.get("/auth/logout", (req, res) => {
    // destroy session
    req.session.destroy();
    console.log("logout ok.")
    return res.redirect("/");
});

router.get("/test", userIsAuthenticatedMiddleware, (req, res) => res.send(`Ok. ${req.session.info}`));

router.get("/admin", userIsAdmin, (req, res) => res.send(`ADMIN Ok. ${req.session.info}`));