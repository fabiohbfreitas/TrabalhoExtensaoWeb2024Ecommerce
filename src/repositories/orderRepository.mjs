export function approveOrder(id) {
	let approveOrder = db
		.prepare(`
    update checkout_order
        set approved = ?
    where
        id == ?
    `)
		.run(true, id);
	console.log(approveOrder);
}

export function denyOrder(id) {
	let approveOrder = db
		.prepare(`
    update checkout_order
        set approved = ?
    where
        id == ?
    `)
		.run(false, id);
	console.log(approveOrder);
}
