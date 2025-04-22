const Database = require("better-sqlite3");
const db = new Database("auction.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS auctions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    startingPrice REAL,
    category TEXT,
    image TEXT,
    userId INTEGER
  );
`);

module.exports = db;