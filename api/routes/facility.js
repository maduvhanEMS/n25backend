const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

router.post("/facility", async (req, res) => {
  const { facility_name, test_types, header, additional, safety } = req.body;
  try {
    const data = await db.query(
      "SELECT * FROM facility WHERE facility_name =$1",
      [facility_name]
    );
    if (data.rowCount > 0) {
      res.status(400).json(`Row already exist ${data.rows}`);
      return;
    }
    const { rows } = await db.query(
      "INSERT INTO facility(facility_name, test_types, header, additional,safety) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [facility_name, test_types, header, additional, safety]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/facilities", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM facility");

    res.status(200).json(rows);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/facility/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await db.query(
      "SELECT * FROM facility WHERE facility_id=$1",
      [id]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
