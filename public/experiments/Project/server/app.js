/**
 * Created by neethu on 3/24/2016.
 */
module.exports = function(app) {
    var userModel = require("./model/user.model.js")();
    var projectModel = require("./model/project.model.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);
    var projectService = require("./services/project.service.server.js") (app, userModel, projectModel);
}