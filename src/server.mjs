import express from "express";
import mustacheExpress from "mustache-express";
import session from "express-session";
import { resolve as resolvePath } from "node:path";
import { router } from "./routes/router.mjs";

const app = express();
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: process.env.ENVIRONMENT === "production" },
	}),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolvePath(import.meta.dirname, "public")));
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", resolvePath(import.meta.dirname, "views"));
console.log(resolvePath(import.meta.dirname, "views", "partials"));
app.engine(
	"html",
	mustacheExpress(
		resolvePath(import.meta.dirname, "views", "partials"),
		".html",
	),
);

app.use(router);

app.listen(8090, () => {
	console.log("server has started :8090");
});
