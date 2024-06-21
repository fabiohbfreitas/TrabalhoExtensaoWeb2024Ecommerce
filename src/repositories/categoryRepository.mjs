import { db } from "../lib/database.mjs";

export function listCategories() {
	let res = db.prepare("SELECT * from category limit 100;").all();
	return res;
}

export function findCategory(id) {
	let find = db.prepare("SELECT * from category where id = ?;").get(id);
	return find;
}

export function createCategory(categoryName) {
	let insertCategory = db.prepare(`
        insert into category (category) values (?);
    `);
	console.log(insertCategory.run(categoryName));
}

export function updateCategory(id, name) {
	let updateCategory = db
		.prepare(`
    update category
        set category = ?
    where
        id == ?
    `)
		.run(name, id);
	console.log(updateCategory);
}

export function deleteCategory(id) {
	let deleteCategory = db
		.prepare(`
    delete from category
    where
        id == ?
    `)
		.run(id);
	console.log(deleteCategory);
}
