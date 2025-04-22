const nc = require("next-connect");
const { listAuctions, create } = require("../../../controllers/auctionController");

const handler = nc()
  .get((req, res) => listAuctions(req, res))
  .post((req, res) => create(req, res));

export default handler;