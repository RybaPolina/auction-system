const db = require("../db/database");

function getAllAuctions() {
  return db.prepare("SELECT * FROM auctions").all();
}

function getAuctionById(id) {
  return db.prepare("SELECT * FROM auctions WHERE id = ?").get(id);
}

function createAuction(data) {
  const stmt = db.prepare(`
    INSERT INTO auctions (title, description, startingPrice, category, image, userId)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    data.title,
    data.description,
    data.startingPrice,
    data.category,
    data.image,
    data.userId
  );
  return getAuctionById(info.lastInsertRowid);
}

function updateAuction(id, data) {
  db.prepare(`
    UPDATE auctions
    SET title = ?, description = ?, startingPrice = ?, category = ?, image = ?, userId = ?
    WHERE id = ?
  `).run(
    data.title,
    data.description,
    data.startingPrice,
    data.category,
    data.image,
    data.userId,
    id
  );
  return getAuctionById(id);
}

function deleteAuction(id) {
  return db.prepare("DELETE FROM auctions WHERE id = ?").run(id);
}

function markAuctionAsEnded(id) {
    return db.prepare("UPDATE auctions SET ended = 1 WHERE id = ?").run(id);
  }
  
function getWinningBid(auctionId) {
    return db
      .prepare("SELECT * FROM bids WHERE auctionId = ? ORDER BY amount DESC LIMIT 1")
      .get(auctionId);
}  

module.exports = {
  getAllAuctions,
  getAuctionById,
  createAuction,
  updateAuction,
  deleteAuction,
  markAuctionAsEnded,
  getWinningBid,
};
