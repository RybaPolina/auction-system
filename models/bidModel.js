const db = require("../db/database");

function getBidsByAuctionId(auctionId) {
  return db
    .prepare("SELECT * FROM bids WHERE auctionId = ? ORDER BY amount DESC")
    .all(auctionId);
}

function createBid(auctionId, userId, amount) {
  const stmt = db.prepare(`
    INSERT INTO bids (auctionId, userId, amount)
    VALUES (?, ?, ?)
  `);
  const info = stmt.run(auctionId, userId, amount);
  return db.prepare("SELECT * FROM bids WHERE id = ?").get(info.lastInsertRowid);
}

module.exports = {
  getBidsByAuctionId,
  createBid,
};
