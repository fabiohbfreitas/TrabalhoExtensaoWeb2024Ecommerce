import { randomUUID } from "node:crypto"

const users = [];


export function findUserByEmail(email) {
    return users.find(u => u.email === email);
}

export function findUserById(id) {
    return users.find(u => u.id === id);
}

export function createUser(name, email, password) {
    const newUser = { id: randomUUID(), name, email, password, isAdmin: users.length === 0 };
    console.log(newUser);
    users.push(newUser);
}