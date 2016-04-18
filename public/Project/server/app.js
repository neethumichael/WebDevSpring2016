/**
 * Created by neethu on 3/24/2016.
 */
module.exports = function(app, db, mongoose) {
    var projectuserModel = require("./model/project.user.model.js")(db, mongoose);

    var accessModel = require("./model/access.model.js") (db,mongoose);
    var projectModel = require("./model/project.model.js")(db, mongoose, accessModel);


    var ProjectUserService = require("./service/projectuser.service.server.js")(app, projectuserModel);
    var projectService = require("./service/project.service.server.js") (app, projectModel, accessModel);
}