var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local');
module.exports = function(app, formModel, userModel) {

    var auth = authorized;
    app.post("/api/assignment/register", create);
    app.get("/api/assignment/login",passport.authenticate('local'),login);
    app.get("/api/assignment/user",forAllUsers);
    app.get("/api/assignment/user/:id", findById);
    app.put("/api/assignment/user/:userId", auth,  Update);
    app.delete("/api/assignment/user/:id",auth, Delete);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    // admin end points
    app.post("/api/assignment/admin/user", create);
    app.get("/api/assignment/admin/user",findAll);
    app.get("/api/assignment/admin/user/:userId",findById);
    app.delete("/api/assignment/admin/user/:userId",Delete);
    app.put("/api/assignment/admin/user/:userId",Update);

    //passport.use(new LocalStrategy(localStrategy ));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    /*function localStrategy(username, password, done) {
        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    if (user  && bcrypt.compareSync(password, user.password)) {
                        return done(null,user);
                    } else {
                        return done(null,false);
                    }
                }
            ),
            function (err) {
                if (err) {
                    return done(err);
                }
            };
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
    }*/

    function login(req,res) {
            var user = req.user;
            res.json(user);
    }

    function forAllUsers(req,res) {
        if(req.query.username) {
            return findUserByUsername(req.query.username,req,res);
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
        var userId = req.params.userId;;
        userModel.Delete(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(username,password, req, res) {

        userModel.findUserByCredentials({username: username,password: password})
        .then(function (doc) {
            req.session.currentUser = doc;
            return res.json(doc);
        },
            function (err) {
                return res.status(401).send(err);
            });
    }

    function Update(req,res) {
        var userId = req.params.userId;
        var user = req.body;
        if(typeof user.emails == "String") {
            user.emails = user.emails.split(",");
        }
        if(typeof user.phones == "String") {
            user.phones = user.phones.split(",");
        }

        userModel.FindById(user._id)
            .then(
                function (oldUser) {
                    if (oldUser && !bcrypt.compareSync(user.password, oldUser.password)) {
                        user.password = bcrypt.hashSync(user.password);
                    }
                    else {
                        user.password = oldUser.password;
                    }
                    userModel.Update(user,userId)
                        .then(function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
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
        if(user.roles && user.roles.length > 1) {
            user.roles = user.roles.split(",");
        } else {
            user.roles = ["student"];
        }

        userModel.Create(user)
            .then(
                function (user) {
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
        req.session.destroy();
        res.send(200);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true;
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
