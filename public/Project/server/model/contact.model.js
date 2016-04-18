/**
 * Created by neethu on 4/18/2016.
 */
module.exports = function(mongoose) {
    var AccessSchema = mongoose.Schema({
        userId: String,
        projectId: String,
    }, {collection: 'projectAccess'});
    return AccessSchema;
};
