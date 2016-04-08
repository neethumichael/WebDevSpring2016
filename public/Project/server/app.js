/**
 * Created by neethu on 3/24/2016.
 */
module.exports = function(app, db, mongoose) {
    var userModel = require("./model/user.model.js")(db, mongoose);
    var projectModel = require("./model/project.model.js")(db, mongoose);

    var userService = require("./service/user.service.server.js")(app, userModel);
    var projectService = require("./service/project.service.server.js") (app, userModel, projectModel);
}