/**
 * Created by neethu on 3/30/2016.
 */
module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: String
    }, {collection: 'projectUser'});
    return UserSchema;
};


