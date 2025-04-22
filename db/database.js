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
    userId INTEGER,
    ended INTEGER DEFAULT 0
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS bids (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    auctionId INTEGER NOT NULL,
    userId INTEGER,
    amount REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

try {
  db.prepare("ALTER TABLE auctions ADD COLUMN ended INTEGER DEFAULT 0").run();
  console.log("🟢 Kolumna 'ended' została dodana.");
} catch (err) {
  if (!err.message.includes("duplicate column")) {
    console.error("Błąd podczas dodawania kolumny:", err);
  }
}

module.exports = db;