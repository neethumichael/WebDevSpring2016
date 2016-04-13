module.exports = function(app, projectModel) {

    app.post("/api/projecttracker/project/:userId", create);
    app.get("/api/projecttracker/project", findAllProjectsForUser);
    app.put("/api/projecttracker/project", Update);
    app.delete("/api/projecttracker/project/:id", Delete);
    app.get("/api/assignment/project/:userId/user", findAllProjectsForUser);
   // app.get("/api/projecttracker/project/search",searchProject);
    app.get("/api/projecttracker/project/search/:title/:status/:keywords",searchProject);
   // return $http.get("/api/projecttracker/project/search?title=" + searchString.title + "&status=" + searchString.status
    //    +"&keywords=" +searchString.keywords);
   // return $http.get("/api/projecttracker/user?username="+userName+"&password="+passWord);
   // app.get("/api/projecttracker/project/search/:searchString",searchProject);

    function searchProject(req, res) {
        var title = req.params.title;
        var status = req.params.status;
        var keywords = req.params.keywords;
        console.log("ygjh");
        var searchString =  {
            title: title,
             status: status,
            keywords: keywords
        }
        console.log("data.title "+searchString.title);
        console.log("data.status "+searchString.status);
        console.log("data.keywords "+searchString.keywords);
        projectModel.searchProject(searchString)
            .then(
                function (projects) {
                    res.json(projects);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

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



