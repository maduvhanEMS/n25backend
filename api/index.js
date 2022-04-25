const express = require("express");
const cors = require("cors");
const pool = require("./db/index");
const mountRoutes = require("./routes");
require("dotenv").config();
const os = require("os");

// Initialise application '
app = express();

//middleware
app.use(cors());
app.use(express.json());

mountRoutes(app);

// console.log(os.platform());

port = process.env.PORT || 3000;
// connect to the server
app.listen(port, () => {
  console.log(`Server running ${port}`);
});
