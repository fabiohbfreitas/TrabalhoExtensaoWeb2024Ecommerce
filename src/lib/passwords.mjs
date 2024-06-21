import { hashSync, verifySync } from "@node-rs/argon2";

export function hashPassword(password) {
	return hashSync(password);
}

export function comparePassword(password, hash) {
	return verifySync(hash, password);
}
