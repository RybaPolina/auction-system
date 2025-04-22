const nc = require("next-connect");
const { listUsers, create } = require("../../../controllers/userController");

const handler = nc()
  .get((req, res) => listUsers(req, res))
  .post((req, res) => create(req, res));

export default handler;