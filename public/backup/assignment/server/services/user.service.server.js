var passport = require('passport');
var LocalStrategy = require('passport-local');
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, formModel, userModel) {

    var auth = authorized;
    app.post("/api/assignment/user", create);
    app.get("/api/assignment/user",passport.authenticate('local'),forAllUsers);
    app.get("/api/assignment/user/:id", findById);
    app.put("/api/assignment/user/:id", Update);
    app.delete("/api/assignment/user/:id", Delete);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    passport.use(new LocalStrategy(localStrategy ));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));

    app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get   ('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));

    var googleConfig = {
        clientID        : process.env.GOOGLE_CLIENT_ID,
        clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL     : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID        : process.env.FACEBOOK_CLIENT_ID,
        clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL     : process.env.FACEBOOK_CALLBACK_URL
    };

   /* passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));*/
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function middleware(username, password, done) {
        if(username && password) {
            //return findUserByCredentials(req.query.username,req.query.password, req, res);
            var user = req.user;
            res.json(user);
        }
        else if(req.query.username) {
            return findUserByUsername(req.query.username,req,res);
        }
        else {
            return findAll();
        }
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function localStrategy(username, password, done) {
        console.log("username "+username);
        console.log("password "+password);
      if(username && password) {
          userModel.findUserByCredentials({username: username, password: password})
              .then(
                  function (user) {
                      console.log(user.username);
                      if (!user) {
                          return done(null, false);
                      }
                      return done(null, user);
                  },
                  function (err) {
                      if (err) {
                          return done(err);
                      }
                  }
              );
      }
        else {
          userModel.findUserByUsername(username)
              .then(function (doc) {
                      return done(null, user);
                  },
                  function (err) {
                      return done(err);
                  }
              );
      }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel
            .FindById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }

    function forAllUsers(req,res) {
        if(req.query.username && req.query.password) {
            //return findUserByCredentials(req.query.username,req.query.password, req, res);
        var user = req.user;
            res.json(user);
        }
        else if(req.query.username) {
            var user = req.user;
            res.json(user);
        }
        else {
            return findAll();
        }
    }

    function findUserByUsername(username,req,res) {
        userModel.findUserByUsername(username)
            .then(function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function Delete(req,res) {
        var user = req.body;
        userModel.Delete(user)
            .then(function (doc) {
                res.json(doc);
            },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByCredentials(username,password, req, res) {

        userModel.findUserByCredentials({username: username,password: password})
        .then(function (doc) {
            req.session.currentUser = doc;
            return res.json(doc);
        },
            function (err) {
                return res.status(400).send(err);
            });
    }

    function Update(req,res) {
        var userId = req.params.id;
        var user = req.body;
        if(typeof user.emails == "String") {
            user.emails = user.emails.split(",");
        }
        if(typeof user.phones == "String") {
            user.phones = user.phones.split(",");
        }
        userModel.Update(user)
            .then(function (doc) {
                req.session.currentUser = doc;
                res.json(doc);
            },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findAll(req , res) {
        userModel.FindAll()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findById(req, res) {
       var userId = req.params.id;
        userModel.FindById(userId)
            .then(
                function (doc) {
                   res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function create(req, res) {

        var user = req.body;
        console.log("user "+user.username);
        if(user.roles && user.roles.length > 1) {
            user.roles = user.roles.split(",");
        } else {
            user.roles = ["student"];
        }
        userModel.Create(user)
            .then(
                function (user) {
                    console.log("uswr "+user.username);
            if(user) {
                req.login(user, function (err) {

                    if (err) {
                        res.status(400);
                    } else {
                        res.json(user);
                    }
                    // req.session.currentUser = doc;
                    // res.json(doc);
                });
            }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
}
