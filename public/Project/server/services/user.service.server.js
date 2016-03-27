module.exports = function(app, userModel) {

    app.post("/api/projecttracker/user", create);
    app.get("/api/projecttracker/user",forAllUsers);
    app.get("/api/projecttracker/user/:id", findById);
    app.put("/api/projecttracker/user/:id", Update);
    app.delete("/api/projecttracker/user/:id", Delete);
    app.get("/api/projecttracker/loggedin", loggedin);
    app.post("/api/projecttracker/logout", logout);

    function forAllUsers(req,res) {
        if(req.query.username && req.query.password) {
            var user = findUserByCredentials(req.query.username,req.query.password);
            req.session.currentUser = user;
            return res.json(user);
        }
        else if(req.query.username) {
            return res.json(findUserByUsername(req.query.username));
        }
        else {
            return res.json(findAll());
        }
    }

    function findUserByUsername(username) {
        var user = userModel.findUserByUsername(username);
            return user;
    }

    function Delete(req,res) {
        var user = req.body;
        var users = userModel.Delete(user);
        res.json(users);
    }

    function findUserByCredentials(username,password) {
       var user = userModel.findUserByCredentials({username: username,password: password});

        return user;
    }

    function Update(req,res) {
        var userId = req.params.id;
        var user = req.body;
        var user = userModel.Update(user);
        res.json(user);
    }

    function findAll() {
       var users =  userModel.FindAll();
        return users;
    }

    function findById(req, res) {
        var userId = req.params.id;
        var user = userModel.FindById(userId);
        res.json(user);
    }

    function create(req, res) {
        var user = req.body;
        user = userModel.Create(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function logout(req, res) {
        //req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        //req.session.destroy();
        res.send(200);
    }
}
