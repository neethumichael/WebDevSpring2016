/**
 * Created by neethu on 3/30/2016.
 */
var mongoose = require("mongoose");
module.exports = function() {
    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label:String,value:String}],
    }, {collection: 'field'});
    return FieldSchema;
};
