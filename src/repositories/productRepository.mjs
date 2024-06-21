import { randomUUID } from "node:crypto";
import { db } from "../lib/database.mjs";

export function listProducts() {
	let products = db.prepare("select * from product limit 100;").all();
	return products;
}

export function listProductsForCategory(categoryId) {
	let products = db
		.prepare("select * from product where categoryId = ? limit 100;")
		.all(categoryId);
	console.log(products);
	return products;
}

export function getProduct(id) {
	let product = db
		.prepare("select * from product where id = ? limit 1;")
		.get(id);
	return product;
}

export function createProduct(
	title,
	description,
	image,
	quantity,
	price,
	categoryId,
) {
	let insertProduct = db
		.prepare(`
        insert into product values (?, ?, ?, ?, ?, ?, ?);
    `)
		.run(randomUUID(), title, description, image, quantity, price, categoryId);
	console.log(insertProduct);
}

export function updateProductInfo(
	title,
	description,
	image,
	quantity,
	price,
	categoryId,
	id,
) {
	let updateProduct = db
		.prepare(`
        update product
            set title = ?,
                description = ?,
				image = ?,
                quantity = ?,
                price = ?,
				categoryId = ?
        where
            id == ?;
    `)
		.run(title, description, image, quantity, price, categoryId, id);
	console.log(updateProduct);
}

export function deleteProductById(id) {
	let deleteProduct = db.prepare("delete from product where id == ?;").run(id);
	console.log(deleteProduct);
}
