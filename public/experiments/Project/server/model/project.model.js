/**
 * Created by neethu on 3/17/2016.
 */
var mock = require("./project.mock.json");
module.exports = function () {
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        getIndex: getIndex,
        selectProject: selectProject
    };
    return api;

    function Delete(id) {
        console.log("input "+id);
        for (var u in mock) {
            console.log("mock[u] "+mock[u].id);
            if (mock[u].id == id) {
                mock.splice(u, 1);
            }
        }
        return mock;
    }



    function getIndex(Project) {
        for(var p in mock) {
            if(mock[p].title===Project.title)
                return p;
        }
        return -1;
    }

    function selectProject(index) {
        var selectedProject = {
            title: mock[index].title,
            description: mock[index].description,
            status: mock[index].status,
            gusername: mock[index].gusername,
            repos: mock[index].repos,
            startDate: mock[index].startDate,
            endDate: mock[index].endDate
        };
        return selectedProject;
    }


    function Update(project) {
        if(project) {
            var n = getIndex(project);
            if(n) {
                project.id = mock[n].id;
                mock[n] = project;
                return mock[n];
            }
        }
        return null;
    }

    function FindAll(userId) {
        var listOfProjects = [];
        var f;
        console.log("dfs "+userId);

        for (f in mock) {
            console.log("inside "+mock[f].userId);
            if (mock[f].userId == userId) {
                listOfProjects.push(mock[f]);
            }
        }
        return listOfProjects;
    }

    function FindById(projectId) {
        for(var u in mock) {
            if( mock[u]._id === projectId ) {
                return mock[u];
            }
        }
        return null;
    }

    function Create(project,userId) {
        project.id = "ID_" + (new Date()).getTime();
        project.userId = userId;
        mock.push(project);
        return project;
    }
}
