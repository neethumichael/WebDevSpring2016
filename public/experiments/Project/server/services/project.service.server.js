module.exports = function(app, userModel, projectModel) {

    app.post("/api/projecttracker/project/:userId", create);
    app.get("/api/projecttracker/project",getAllProjects);
    app.put("/api/projecttracker/project", Update);
    app.delete("/api/projecttracker/project/:id", Delete);
    app.get("/api/projecttracker/project/selectProject/:index",selectProject);
    app.get("/api/assignment/project/:userId/user",findAllProjectsForUser);

        function getAllProjects(req, res) {
            var projects = projectModel.FindAll();
            console.log("fdsf"+projects);
            return res.json(projects);
        }

        function Update(req,res) {
           // var projectId = req.params.id;
            var project = req.body;
            project = projectModel.Update(project);

        res.json(project);
        }

        function create(req, res) {
            var userId = req.params.userId;
            var project = req.body;
            project = projectModel.Create(project,userId);
            res.json(project);
        }

    function selectProject(req,res) {
        var index = req.params.index;
        var project = projectModel.selectProject(index);


            res.json(project);
        }

    function findAllProjectsForUser(req,res) {
        var userId = req.params.userId;
        console.log("server service "+userId);
        var projects =  projectModel.FindAll(userId);
        res.json(projects);
    }

        function Delete(req,res) {
            var id = req.params.id;
            console.log("delete "+id);
            var projects = projectModel.Delete(id);
            res.json(projects);
        }
    }



