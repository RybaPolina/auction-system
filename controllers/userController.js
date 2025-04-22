const User = require("../models/userModel");

function listUsers(req, res) {
  const users = User.getAllUsers();
  res.status(200).json(users);
}

function getUser(req, res) {
  const user = User.getUserById(parseInt(req.query.id));
  if (user) res.status(200).json(user);
  else res.status(404).json({ error: "User not found" });
}

function create(req, res) {
  const { name } = req.body;
  const newUser = User.createUser(name);
  res.status(201).json(newUser);
}

function update(req, res) {
  const { name } = req.body;
  const updated = User.updateUser(parseInt(req.query.id), name);
  res.status(200).json(updated);
}

function remove(req, res) {
  User.deleteUser(parseInt(req.query.id));
  res.status(204).end();
}

module.exports = {
  listUsers,
  getUser,
  create,
  update,
  remove,
};
