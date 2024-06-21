import { randomUUID } from "node:crypto";
import { db } from "../lib/database.mjs";

export function findUserByEmail(searchEmail) {
	let userByEmail = db.prepare("select * from user where email = ? limit 1;");
	let user = userByEmail.get(searchEmail);
	if (user) {
		user.isAdmin = user.isAdmin == "true";
	}
	return user;
}

export function findUserById(id) {
	let userById = db.prepare("select * from user where id = ? limit 1;");
	return userById.get(id);
}

export function createUser(name, email, password) {
	let userCount = db.prepare("select count(*) from user;");
	let { "count(*)": count } = userCount.get();

	let insert = db.prepare(`
        insert into user values (
            ?, ? ,?, ?, ?
        );
    `);
	insert.run(
		randomUUID(),
		name,
		email,
		password,
		count == 0 ? "true" : "false",
	);
}

export function updateUser(name, email, id) {
	let updateProduct = db
		.prepare(`
        update user
            set name = ?,
                email = ?
        where
            id == ?;
    `)
		.run(name, email, id);
	console.log(updateProduct);
}

export function deleteUser(id) {
	let deleteUser = db.prepare("delete from user where id == ?;").run(id);
	console.log(deleteUser);
}
