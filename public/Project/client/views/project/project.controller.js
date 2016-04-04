/**
         * Created by neethu on 3/3/2016.
         */
        (function()
        {
            angular
                .module("ProjectTrackerApp")
                .controller("ProjectController", ProjectController);

            function ProjectController($rootScope,UserService, ProjectService,$location, $http, $timeout)
            {
                var vm = this;
vm.profile = false;
        vm.message = null;
                vm.project = false;
                var REP_URL = "https://api.github.com/repositories/";
                var USER_URL = "https://api.github.com/users/";
        function init() {

           vm.projects = findAllProjects();
        }
        init()

vm.gUsername;
var commits;
       vm.addProject = addProject;
       vm.removeProject = removeProject;
        vm.selectProject = selectProject;
       vm.updateProject = updateProject;
                vm.findAllProjects = findAllProjects;
                vm.getGitInfo = getGitInfo;
        vm.cancel = cancel;
       // var test_proj =   {id: 567, title: "TWC", description: "Web development", status: "Closed", projectTasks: ["abc"],  startDate:new Date(2013, 3,3), endDate: new Date(2015, 3,3)};

                function getGitInfo(username) {
                    if (username === undefined) {
                        vm.message = "Enter a valid username";
                        return;
                    }
vm.gUsername = username;
                    var CURRENT_USER_URL = USER_URL+username;
                    $http.get(CURRENT_USER_URL)
                        .success(getUserDetails)
                        .error(function () {
                            vm.userNotFound = true;
                        });
                }

                function getUserDetails(data) {
                    vm.user = data;
                    vm.loaded = true;
console.log("inside getUserDetails"+vm.gUsername);
                    $http.get(USER_URL+ vm.gUsername + "/repos")
                        .success(renderRepositories);
                }

                function renderRepositories(response) {
                    vm.repos = response;
                    vm.reposFound = response.length;
                }


                function searchRepository(Repository) {
                    console.log("Fds "+Repository);
                    console.log("fhsdj "+REP_URL+Repository.id);


                        return $http.get(REP_URL + Repository.id + "/commits").success(getSelectedRepCommitDetails);

                }

                function getSelectedRepCommitDetails(data) {

                    commits = data;
                    console.log("commits "+commits);
                    return commits;
                }


                function findAllProjects() {
                    var cur_proj =null;
                    var user;
                    UserService.getCurrentUser()
                        .then ( function(response) {
                            user = response.data;
                            console.log("controller "+user._id);
                            ProjectService.findAllProjectsForUser(
                                user._id)
                                .then(
                                    function(response){
                                        vm.projects =response.data;
                                    });
                        });
                    return vm.projects ;
                }
        function cancel()
        {
           vm.project = null;
            ProjectService.resetProject()
                .then (function (reponse) {
                    $location.url('/project');
                });
        }

        function addProject(project) {
vm.profile = false;
            searchRepository(project.repos).then(function (Result)
            {
                vm.commits = commits;
                console.log("vm.commits" + commits);
               var count =0;

                    for (var u in commits) {
                        count++;
                    }
var test= "finish";
                vm.size = count;
            if (count > 0) {

                for(var u in commits) {
                    var s = commits[u].commit.message;
                    console.log("s= "+s);
                        if (s.indexOf(test)> -1) {
                            project.status = "Completed";
                        }
                        break;

                }
                if(!project.status)
                project.status = "Started";

            }
            else if (count <= 0) {
                project.status = "Not Started";
            }
                project.commits = commits;
                project.commitMessage = commits[count-1].commit.message;
                console.log("tes message"+project.commitMessage);
                project.committer = commits[count-1].commit.committer.name;
                console.log("test status"+project.status);
                UserService.getCurrentUser()
                    .then ( function(response) {
                        user = response.data;
                        console.log("controller "+user._id);
                        ProjectService.addProject(project,user._id)
                            .then(function (reponse) {
                                vm.project = null;
                                $location.url('/renderProjects');
                            });
                    });

        });



        }

        function removeProject(projectIndex)
        {
            var project = vm.projects[projectIndex];
            ProjectService.deleteProject(project.id)
                .then(function (response) {
                    vm.projects = response.data;
                    console.log("FGd "+response.data);
                    $location.url('/renderProjects');
                });
        }
        function selectProject(index)
        {
            vm.profile = true;
            var project =
             ProjectService.selectProject(index)
                .then(function (response) {
                   ProjectService.setCurrentProject(response.data);

                   project = response.data;
                    var endDate = new Date(project.endDate);
                    var startDate = new Date(project.startDate);
                    project.endDate = endDate;
                    project.startDate = startDate;
                    $rootScope.currentProject = project;
                    $location.url('/project');

                    return project;
                });
           //vm.project = ProjectService.getCurrentProject();

            //console.log("hgf "+vm.project.title);

        }
        function updateProject(project)
        {
            ProjectService.updateProject(project)
                .then(function (response){
                    console.log("in update"+response.data.title);
                    //vm.project = response.data;
                });

        }
    }
})();

