/**
 * Created by neethu on 4/8/2016.
 */
/**
 * Created by neethu on 3/30/2016.
 */
module.exports = function(mongoose) {
    var ProjectSchema = mongoose.Schema({
        userId: String,
        title: String,
        gusername: String,
        repos: Object,
        description: String,
        status: String,
        endDate: Date,
        startDate: Date,
        grade: String,
        gradeTotal: String,
        gradeComments: String
    }, {collection: 'projectData'});
    return ProjectSchema;
};



