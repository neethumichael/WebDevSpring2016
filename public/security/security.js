/**
 * Created by neethu on 4/18/2016.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, userModel, developerModel) {

    passport.use('projectTracker',   new LocalStrategy(projectTrackerLocalStrategy));
    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/projectTracker/login',    passport.authenticate('projectTracker'), projectTrackerLogin);
    app.post  ('/api/projectTracker/logout',   projectTrackerLogout);
    app.get   ('/api/projectTracker/loggedin', projectTrackerLoggedin);
    app.post  ('/api/projectTracker/register', projectTrackerRegister);

    app.post  ('/api/assignment/login',    passport.authenticate('assignment'), assignmentLogin);
    app.post  ('/api/assignment/logout',   logout);
    app.get   ('/api/assignment/loggedin', loggedin);
    app.post  ('/api/assignment/register', register);

    function projectTrackerLocalStrategy(username, password, done) {
        developerModel
            .findDeveloperByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function assignmentLocalStrategy(username, password, done) {
        userModel
            .findByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        if(user.type == 'project') {
            developerModel
                .findProjectUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else if(user.type == 'assignment') {
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }
};
