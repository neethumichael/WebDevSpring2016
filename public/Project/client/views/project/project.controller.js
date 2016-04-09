/**
         * Created by neethu on 3/3/2016.
         */
(function()
{
    angular
        .module("ProjectTrackerApp")
        .controller("ProjectController", ProjectController);

    function ProjectController($rootScope,UserService, ProjectService,$location, $http, $timeout) {
        var vm = this;

        vm.message = null;
        var profile;
        if($rootScope.profile!= true)
            $rootScope.profile = false;
        var REP_URL = "https://api.github.com/repositories/";
        var USER_URL = "https://api.github.com/users/";

        function init() {
           vm.projects = findAllProjects();
        }
        init();

        vm.gUsername;
        var commits;
        vm.addProject = addProject;
        vm.removeProject = removeProject;
        vm.selectProject = selectProject;
        vm.updateProject = updateProject;
        vm.findAllProjects = findAllProjects;
        vm.getGitInfo = getGitInfo;
        vm.gitUserProfile = gitUserProfile;
        vm.gitprojectCommits = gitprojectCommits;
        vm.cancel = cancel;

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
            $http.get(USER_URL+ vm.gUsername + "/repos")
                .success(renderRepositories);
        }

        function renderRepositories(response) {
            vm.repos = response;
            vm.reposFound = response.length;
        }

        function searchRepository(Repository) {
            return $http.get(REP_URL + Repository.id + "/commits").success(getSelectedRepCommitDetails);
        }

        function getSelectedRepCommitDetails(data) {
            commits = data;
            return commits;
        }

        function findAllProjects() {
            var cur_proj =null;
            var user;
            UserService.getCurrentUser()
                .then ( function(response) {
                    user = response.data;
                    ProjectService.findAllProjectsForUser(
                        user._id)
                        .then(
                            function(response){
                                vm.projects =response.data;
                            });
                });
            return vm.projects ;
        }

        function cancel(project) {
            vm.project = null;
            $rootScope.currentProject = null;
            $rootScope.profile = false;
            $location.url('/project');
        }

        function addProject(project) {
            $rootScope.profile = false;
            searchRepository(project.repos).then(function (Result) {

               // project.repos = {repId: repId, repName: repName};
                project.repId = project.repos.id;
                project.repName = project.repos.name;
                vm.commits = commits;
                var count =0;
                for (var u in commits) {
                        count++; }
                var test= "finish";
                vm.size = count;
                if (count > 0) {
                    for(var u in commits) {
                        var s = commits[u].commit.message;
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
                project.committer = commits[count-1].commit.committer.name;
                UserService.getCurrentUser()
                    .then ( function(response) {
                        user = response.data;
                        ProjectService.addProject(project,user._id)
                            .then(function (reponse) {
                                vm.project = null;
                                $location.url('/renderProjects');
                            });
                    });
            });
        }

        function removeProject(projectIndex) {
            var project = vm.projects[projectIndex];
            ProjectService.deleteProject(project.id)
                .then(function (response) {
                    vm.projects = response.data;
                    $location.url('/renderProjects');
                });
        }

        function gitUserProfile(index) {
           var project = selectGitProject(index);
                    $rootScope.gitUserProfile = project.gusername;
        }

        function gitprojectCommits(index) {
            var project = selectGitProject(index);
            $rootScope.gitProject = project;
        }

        function selectGitProject(index) {
            $rootScope.profile = true;
            var project = {
                title: vm.projects[index].title,
                description: vm.projects[index].description,
                status: vm.projects[index].status,
                gusername: vm.projects[index].gusername,
                repos: vm.projects[index].repos,
                startDate: vm.projects[index].startDate,
                endDate: vm.projects[index].endDate,
                commits: vm.projects[index].commits
            };
            var endDate = new Date(project.endDate);
            var startDate = new Date(project.startDate);
            project.endDate = endDate;
            project.startDate = startDate;
            return project;
        }


            function selectProject(index) {
            $rootScope.profile = true;
            var project = {
                title: vm.projects[index].title,
                description: vm.projects[index].description,
                status: vm.projects[index].status,
                gusername: vm.projects[index].gusername,
                repos: vm.projects[index].repos,
                startDate: vm.projects[index].startDate,
                endDate: vm.projects[index].endDate
        };


            var endDate = new Date(project.endDate);
            var startDate = new Date(project.startDate);
            project.endDate = endDate;
            project.startDate = startDate;
            ProjectService.setCurrentProject(project);
            $rootScope.currentProject = project;
            $location.url('/project');
            return project;
        }

        function updateProject(project) {
            ProjectService.updateProject(project)
                .then(function (response){
                });
        }
    }
})();

