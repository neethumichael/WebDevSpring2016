/**
 * Created by neethu on 4/18/2016.
 */
module.exports = function(mongoose) {
    var ContactSchema = mongoose.Schema({
        emailId: String,
        message: String,
        date: {type: Date}
    }, {collection: 'projectContact'});
    return ContactSchema;
};
