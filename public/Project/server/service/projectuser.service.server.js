var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local');
module.exports = function(app, userModel) {

    var auth = authorized;
    app.post("/api/projecttracker/register", create);
    app.get("/api/projecttracker/login",passport.authenticate('local'),login);
    app.get("/api/projecttracker/user",forAllUsers);
    app.get("/api/projecttracker/user/:id", findById);
    app.put("/api/projecttracker/user/:id", auth,  Update);
    app.delete("/api/projecttracker/user/:id",auth, Delete);
    app.get("/api/projecttracker/loggedin", loggedin);
    app.post("/api/projecttracker/logout", logout);

    //admin
    app.post("/api/projecttracker/admin/user", create);
    app.get("/api/projecttracker/admin/user",findAll);
    app.get("/api/projecttracker/admin/user/:userId",findById);
    app.delete("/api/projecttracker/admin/user/:userId",Delete);
    app.put("/api/projecttracker/admin/user/:userId",Update);
    app.put("/api/projecttracker/contact",addMessage);
    app.get("/api/projecttracker/contact",findAllMessage);
    app.delete("/api/projecttracker/contact/:messageId",deleteContact);

    passport.use(new LocalStrategy(localStrategy ));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    function localStrategy(username, password, done) {

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
    }

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


    function deleteContact(req, res) {
        var messageId = req.params.messageId;
        userModel.deleteContact(messageId )
            .then(function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                })
    }

    function addMessage(req,res) {
        var contact = req.body;
        userModel.addMessage(contact)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllMessage(req, res) {
        userModel.viewAllMessage()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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
        var userId = req.params.userId;
        userModel.Delete(userId )
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

        userModel.FindById(user._id)
            .then(
                function (oldUser) {
                    if (oldUser && !bcrypt.compareSync(user.password, oldUser.password)) {
                        user.password = bcrypt.hashSync(user.password);
                    }
                    else {
                        user.password = oldUser.password;
                    }
                    userModel.Update(user)
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


        userModel.Create(user)
            .then(
                function (user) {
                    if(user) {
                        if(!isAdmin) {
                        req.login(user, function (err) {

                            if (err) {
                                res.status(400);
                            } else {
                                res.json(user);
                            }
                            // req.session.currentUser = doc;
                            // res.json(doc);
                        });
                    }}
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
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
        if(user.roles.indexOf("admin") > 0 || user.roles.indexOf("Admin") > 0) {
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
    }
}
