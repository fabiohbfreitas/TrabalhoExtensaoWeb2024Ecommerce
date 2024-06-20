import { Router } from "express";
import { userIsAdmin } from "../middlewares/userIsAdmin.mjs";
import { userIsNOTAuthenticated } from "../middlewares/userIsNOTAuthenticated.mjs";
import * as AuthController from "../controllers/authController.mjs"
import * as AdminController from "../controllers/adminController.mjs";
import * as ProductsController from "../controllers/productsController.mjs"

export const router = Router();

router.get("/", ProductsController.productsView);
router.get("/auth/login", userIsNOTAuthenticated, (_, res) => res.render("login.html"));
router.get("/auth/sign-up", userIsNOTAuthenticated, (_, res) => res.render("sign-up.html"))
router.post("/auth/sign-up", AuthController.register);
router.post("/auth/login", userIsNOTAuthenticated, AuthController.login);
router.get("/auth/logout", AuthController.logout);
router.get("/admin", userIsAdmin, AdminController.adminView);
router.get("/cart", (req, res) => res.render("cart.html"));