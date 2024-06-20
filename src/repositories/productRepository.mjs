import { randomUUID } from "node:crypto";

export function listProducts() {
    let products = db.prepare("select * from product limit 100;").all();
    return products
}

export function getProduct(id) {
    let product = db.prepare("select * from product where id = ? limit 1;").get(id)
    return product;
}

export function createProduct(title, description, quantity, price, categoryId) {
    let insertProduct = db.prepare(`
        insert into product values (?, ?, ?, ?, ?, ?);
    `).run(randomUUID(), title, description, quantity, price, categoryId);
    console.log(insertProduct);
}

export function updateProduct(title, description, quantity, price, id) {
    let updateProduct = db.prepare(`
        update product
            set title = ?,
                description = ?,
                quantity = ?,
                price = ?
        where
            id == ?;
    `).run(title, description, quantity, price, id);
    console.log(updateProduct);
}

export function deleteProduct(id) {
    let deleteProduct = db.prepare("delete from product where id == ?;").run(id);
    console.log(deleteProduct);
}