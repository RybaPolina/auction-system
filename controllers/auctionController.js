const Auction = require("../models/auctionModel");

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
  Auction.deleteAuction(parseInt(req.query.id));
  res.status(204).end();
}

module.exports = {
  listAuctions,
  getAuction,
  create,
  update,
  remove,
};
