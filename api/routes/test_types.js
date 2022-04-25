const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

router.post("/test_type", async (req, res) => {
  const { test_name } = req.body;
  try {
    const data = await db.query(
      "SELECT * FROM test_types WHERE test_name =$1",
      [test_name]
    );
    if (data.rowCount > 0) {
      res.status(400).json(`Row already exist ${data.rows}`);
      return;
    }
    const { rows } = await db.query(
      "INSERT INTO test_types(test_name) VALUES($1) RETURNING *",
      [test_name]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/test_types", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM test_types");

    res.status(200).json(rows);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
