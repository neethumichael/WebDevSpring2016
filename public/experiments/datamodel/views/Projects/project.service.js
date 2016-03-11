/**
 * Created by neethu on 3/3/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .factory("ProjectService", ProjectService);

    function ProjectService($rootScope,TaskService) {

        var selectedProjectIndex =null;
        var selectedProject = null;
        var task1 = {id: 567, title: "xyz", description: "lorem ispusm", status: "Open", project_id: "09", assigned_to: "alice", priority:"high"};
        var task2 = {id: 987, title: "abc", description: "lorem ispusm hg ygsh", status: "Closed", project_id: "08", assigned_to: "bob", priority:"low"};
        var model = {
            projects: [
                {id: 567, title: "TWC", description: "Web development", status: "Closed", projectTasks: [task1,task2],  startDate:new Date(2013, 3,3), endDate: new Date(2015, 3,3)},
                {id: 987, title: "Shell", description: "ETL", status: "Open", project_id: "08", projectTasks: [task1], startDate:new Date(2012, 3,3), endDate: new Date(2017, 3,3)}
            ],

            updateProject: updateProject,
            selectProject: selectProject,
            removeProject: removeProject,
            addProject: addProject,
            getAllProjects: getAllProjects,
            setCurrentProject: setCurrentProject,

            resetProject: resetProject,
            getIndex: getIndex
        };
        return model;
        $rootScope.projects = projects;

        function resetProject() {
            $rootScope.project=null;
        }

        function setCurrentProject(project) {
            $rootScope.project = project;
        }

        function getAllProjects() {
            return model.projects;
        }

        function updateProject(project,selectedIndex) {
            if(selectedIndex === -1) {
                if (project) {
                    model.projects[selectedProjectIndex] = {
                        title: project.title,
                        description: project.description,
                        status: project.status,
                        projectTasks: project.projectTasks,
                        startDate: project.startDate,
                        endDate: project.endDate
                    };
                }
                else {
                    return null;
                }
            }
            else
            {
                if (project) {
                    model.projects[getIndex(project)] = {
                        title: project.title,
                        description: project.description,
                        status: project.status,
                        projectTasks: project.projectTasks,
                        startDate: project.startDate,
                        endDate: project.endDate
                    };
                }
                else {
                    return null;
                }
            }
        }

        function getIndex(Project) {
            console.log("test 1 "+Project.title);
            for(var p in model.projects) {
                if(model.projects[p].title===Project.title)
                return p;
            }
            return -1;
        }

        function selectProject(index) {
            selectedProjectIndex = index;
            selectedProject = {
                title: model.projects[index].title,
                description: model.projects[index].description,
                status: model.projects[index].status,
                projectTasks: model.projects[index].projectTasks,
                startDate: model.projects[index].startDate,
                endDate: model.projects[index].endDate
            };
            return selectedProject;
        }

        function removeProject(project) {
            var index = model.projects.indexOf(project);
            model.projects.splice(index, 1);
        }

        function addProject(project) {
            var newProject = {
                id: (new Date).getTime(),
                title: project.title,
                description: project.description,
                status: project.status,
                projectTasks: project.projectTasks,
                startDate: project.startDate,
                endDate: project.endDate
            };
            model.projects.push(newProject);
        }
    }
})();


