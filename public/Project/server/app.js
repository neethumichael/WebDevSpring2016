/**
 * Created by neethu on 3/24/2016.
 */
module.exports = function(app) {
    var userModel = require("./model/user.model.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);
}