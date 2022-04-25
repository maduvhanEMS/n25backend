const Router = require("express-promise-router");
const db = require("../db");

const router = new Router();

//get test request data [paginate]

router.get("/test_requests", async (req, res) => {
  const query = `SELECT *
                 FROM "tests" 
                 JOIN "products" ON "products"."product_id"= "tests"."product_id"
                 JOIN "departments" ON "departments"."department_id" = "tests"."department_id" ORDER By "tests"."created_at" DESC OFFSET($1) LIMIT $2`;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  console.log(page, limit);

  try {
    const { rows } = await db.query(query, [skip, limit]);
    res.status(200).json(rows);
    console.log(rows);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

//query the falicity table for tables
router.get("/section", async (req, res) => {
  const facility = req.query.facility ? req.query.facility : "Closed Vessel";
  try {
    const { rows } = await db.query(
      "SELECT * FROM facility WHERE facility_name=$1",
      [facility]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
