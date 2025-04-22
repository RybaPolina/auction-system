const Auction = require("../models/auctionModel");
const fs = require("fs");
const path = require("path");

function listAuctions(req, res) {
  const auctions = Auction.getAllAuctions();
  res.status(200).json(auctions);
}

function getAuction(req, res) {
  const auction = Auction.getAuctionById(parseInt(req.query.id));
  if (auction) res.status(200).json(auction);
  else res.status(404).json({ error: "Auction not found" });
}

function create(req, res) {
  const newAuction = Auction.createAuction(req.body);
  res.status(201).json(newAuction);
}

function update(req, res) {
  const updated = Auction.updateAuction(parseInt(req.query.id), req.body);
  res.status(200).json(updated);
}

function remove(req, res) {
    const id = parseInt(req.query.id);
    const auction = Auction.getAuctionById(id);
  
    if (auction?.image) {
      const imagePath = path.join(process.cwd(), "public", auction.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Błąd przy usuwaniu obrazka:", err);
        } else {
          console.log("Obrazek usunięty:", auction.image);
        }
      });
    }
  
    Auction.deleteAuction(id);
    res.status(204).end();
  }

function endAuction(req, res) {
    const id = parseInt(req.query.id);
    Auction.markAuctionAsEnded(id);
    res.status(200).json({ success: true });
}
  
function getWinner(req, res) {
    const id = parseInt(req.query.id);
    const winner = Auction.getWinningBid(id);
    res.status(200).json(winner || {});
}

module.exports = {
  listAuctions,
  getAuction,
  create,
  update,
  remove,
  endAuction,
  getWinner,
};
