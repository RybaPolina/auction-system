const nc = require("next-connect");
const { getUser, update, remove } = require ("../../../controllers/userController");

const handler = nc()
  .get((req, res) => getUser(req, res))
  .put((req, res) => update(req, res))
  .delete((req, res) => remove(req, res));

export default handler;