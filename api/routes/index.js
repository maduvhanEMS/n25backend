const test = require("./test");
const product = require("./product");
const test_requests = require("./test_quiries");
const department = require("./department");
const test_types = require("./test_types");
const facility = require("./facility");

module.exports = (app) => {
  app.use("/api", test);
  app.use("/api", product);
  app.use("/api", test_requests);
  app.use("/api", department);
  app.use("/api", test_types);
  app.use("/api", facility);
};
