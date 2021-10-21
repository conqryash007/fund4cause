const routes = require("next-routes")();

routes
  .add("/campaign/new", "/campaign/new")
  .add("/campaign/:addr", "/campaign/show");

module.exports = routes;
