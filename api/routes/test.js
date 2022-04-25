const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

//Create routes
router.get("/test", async (req, res) => {
  try {
    const testData = await db.query("SELECT * FROM tests");
    res.status(200).json(testData.rows);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// add data
router.post("/test", async (req, res) => {
  const { product_id, requestor, test_description, department_id, test_types } =
    req.body;
  try {
    const testData = await db.query(
      "INSERT INTO tests(product_id, requestor, test_description,department_id, test_types) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [product_id, requestor, test_description, department_id, test_types]
    );
    res.status(200).json(testData);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
