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

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        //req.session.destroy();
        res.send(200);
    }
}
