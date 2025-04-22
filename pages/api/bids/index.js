const nc = require("next-connect");
const { listBids, create } = require("../../../controllers/bidController");

const handler = nc()
  .get((req, res) => listBids(req, res))
  .post((req, res) => create(req, res));

export default handler;