const nc = require("next-connect");
const { getAuction, update, remove } = require("../../../controllers/auctionController");

const handler = nc()
  .get((req, res) => getAuction(req, res))
  .put((req, res) => update(req, res))
  .delete((req, res) => remove(req, res));

export default handler;
