
module.exports = function(app, userModel) {

    app.post("/api/projecttracker/user", create);
    app.get("/api/projecttracker/user",forAllUsers);
    app.get("/api/projecttracker/user/:id", findById);
    app.put("/api/projecttracker/user/:id", Update);
    app.delete("/api/projecttracker/user/:id", Delete);
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

    function forAllUsers(req,res) {
        if(req.query.username && req.query.password) {
            return findUserByCredentials(req.query.username,req.query.password, req, res);
        }
        else if(req.query.username) {
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
        console.log("here");
        var userId = req.params.id;
        var user = req.body;


        userModel.Update(user)
            .then(function (doc) {
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
        userModel.Create(user)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
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
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        res.send(200);
    }
}
