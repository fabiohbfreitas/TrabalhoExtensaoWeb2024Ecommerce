import { Router } from "express";
import { userIsAdmin } from "../middlewares/userIsAdmin.mjs";
import { userIsNOTAuthenticated } from "../middlewares/userIsNOTAuthenticated.mjs";
import * as AuthController from "../controllers/authController.mjs";
import * as AdminController from "../controllers/adminController.mjs";
import * as ProductsController from "../controllers/productsController.mjs";
import * as ProfileController from "../controllers/profileController.mjs";
import * as CategoryController from "../controllers/categoryController.mjs";
import { userIsAuthenticatedMiddleware } from "../middlewares/userIsAuthenticated.mjs";

export const router = Router();

router.get("/", ProductsController.productsView);
router.get("/category/:id", ProductsController.productsByCategory);
router.post(
	"/product/delete/:id",
	userIsAdmin,
	ProductsController.deleteProduct,
);
router.get(
	"/product/edit/:id",
	userIsAdmin,
	ProductsController.updateProductView,
);
router.post("/product/edit/:id", userIsAdmin, ProductsController.updateProduct);
router.post("/product", userIsAdmin, ProductsController.adminCreateProduct);

router.post("/category", userIsAdmin, CategoryController.adminCreateCategory);
router.post(
	"/category/delete/:id",
	userIsAdmin,
	CategoryController.adminDeleteCategory,
);

router.get("/auth/sign-up", userIsNOTAuthenticated, (_, res) =>
	res.render("sign-up.html"),
);
router.get("/auth/login", userIsNOTAuthenticated, (_, res) =>
	res.render("login.html"),
);

router.get(
	"/profile",
	userIsAuthenticatedMiddleware,
	ProfileController.profileView,
);
router.post(
	"/profile",
	userIsAuthenticatedMiddleware,
	ProfileController.updateProfile,
);
router.post(
	"/profile/delete",
	userIsAuthenticatedMiddleware,
	ProfileController.deleteProfile,
);

router.post("/auth/sign-up", userIsNOTAuthenticated, AuthController.register);
router.post("/auth/login", userIsNOTAuthenticated, AuthController.login);
router.get("/auth/logout", AuthController.logout);

router.get("/admin", userIsAdmin, AdminController.adminView);
