const routes = require("next-routes")();

routes
  .add("/campaign/new", "/campaign/new")
  .add("/campaign/:addr", "/campaign/show")
  .add("/campaign/:addr/requests", "/campaign/requests/index")
  .add("/campaign/:addr/requests/new", "/campaign/requests/new");

module.exports = routes;
