module.exports = function(app, projectModel) {

    app.post("/api/projecttracker/project/:userId", create);
    app.get("/api/projecttracker/project", findAllProjectsForUser);
    app.put("/api/projecttracker/project", Update);
    app.delete("/api/projecttracker/project/:id", Delete);
    app.get("/api/assignment/project/:userId/user", findAllProjectsForUser);

    function Delete(req, res) {
        var id = req.params.id;

        projectModel.Delete(id)
            .then(
                function (projects) {
                    res.json(projects);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function Update(req, res) {
        var project = req.body;
        projectModel.findProjectByTitle(project.title)
            .then(
                function (projectOld) {
                    projectModel.Update(projectOld._id,project)
                        .then(
                            function (project) {
                                res.json(project);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findAllProjectsForUser(req, res) {
        var userId = req.params.userId;
        projectModel.FindAll(userId)
            .then(
                function (projects) {
                    res.json(projects);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function create(req, res) {
        var userId = req.params.userId;
        var project = req.body;
        projectModel.Create(userId, project)
            .then(
                function (project) {
                    res.json(project);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};



