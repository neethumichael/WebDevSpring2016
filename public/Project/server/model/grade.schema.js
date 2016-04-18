/**
 * Created by neethu on 4/17/2016.
 */
module.exports = function(mongoose) {
    var AccessSchema = mongoose.Schema({
        userId: String,
        projectId: String,
    }, {collection: 'projectAccess'});
    return AccessSchema;
};