import { db } from "../lib/database.mjs";

export function createReview(review, productId) {
	let insertReview = db
		.prepare(`
        insert into review (productID, review) values (?, ?);
    `)
		.run(productId, review);
	console.log(insertReview);
}

export function deleteReview(id) {
	let insertReview = db
		.prepare(`
        delete from review where id = ?;
    `)
		.run(id);
	console.log(insertReview);
}
