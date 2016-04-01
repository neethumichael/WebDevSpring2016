module.exports = function(app, formModel, userModel) {

    app.post("/api/assignment/user", create);
    app.get("/api/assignment/user",forAllUsers);
    app.get("/api/assignment/user/:id", findById);
    app.put("/api/assignment/user/:id", Update);
    app.delete("/api/assignment/user/:id", Delete);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

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
        .then(
            function (doc) {
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
        .then(
            function (doc) {
                req.session.currentUser = doc;
                return res.json(doc);
            },
            function (err) {
                return res.status(400).send(err);;
            }
        );
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
