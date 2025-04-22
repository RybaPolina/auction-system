const db = require("../db/database");

function getAllUsers() {
  return db.prepare("SELECT * FROM users").all();
}

function getUserById(id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

function createUser(name) {
  const stmt = db.prepare("INSERT INTO users (name) VALUES (?)");
  const info = stmt.run(name);
  return getUserById(info.lastInsertRowid);
}

function updateUser(id, name) {
  db.prepare("UPDATE users SET name = ? WHERE id = ?").run(name, id);
  return getUserById(id);
}

function deleteUser(id) {
  return db.prepare("DELETE FROM users WHERE id = ?").run(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};