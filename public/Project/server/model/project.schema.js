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
        commits: Object,
        gusername: String,
        repos: Object,
        repId: String,
        repName: String,
        description: String,
        status: String,
        endDate: Date,
        startDate: Date,
        accessEmail: String,
        grade: Number,
        gradeTotal: Number,
        gradeComments: String
    }, {collection: 'projectData'});
    return ProjectSchema;
};



