const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

router.post("/product", async (req, res) => {
  const { product_name, specification } = req.body;
  try {
    const newProduct = await db.query(
      "INSERT INTO products(product_name, specification) VALUES($1,$2)",
      [product_name, specification]
    );
    res.status(200).json(newProduct.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/product", async (req, res) => {
  try {
    const newProduct = await db.query("SELECT * FROM products");
    res.status(200).json(newProduct.rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
