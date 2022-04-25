const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

router.post("/department", async (req, res) => {
  const { department_name } = req.body;
  try {
    const results = await db.query(
      "SELECT * FROM departments WHERE department_name= $1",
      [department_name]
    );
    if (results.rows.length > 0) {
      res.status(200).json(results.rows);
      return;
    }
    const { rows } = await db.query(
      "INSERT INTO departments(department_name) VALUES($1) returning *",
      [department_name]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/departments", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM departments");
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
