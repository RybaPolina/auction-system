const Bid = require("../models/bidModel");

function listBids(req, res) {
  const auctionId = parseInt(req.query.auctionId);
  const bids = Bid.getBidsByAuctionId(auctionId);
  res.status(200).json(bids);
}

function create(req, res) {
  const { auctionId, userId, amount } = req.body;

  if (!auctionId || !amount) {
    return res.status(400).json({ error: "auctionId i amount są wymagane" });
  }

  const newBid = Bid.createBid(auctionId, userId ?? null, amount);
  res.status(201).json(newBid);
}

module.exports = {
  listBids,
  create,
};
