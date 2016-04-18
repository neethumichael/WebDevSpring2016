/**
         * Created by neethu on 3/3/2016.
         */

(function()
{
    angular
        .module("ProjectTrackerApp")
        .controller("ProjectController", ProjectController);
   // var parse = require('parse-link-header');
    function ProjectController($rootScope,ProjectUserService, ProjectService,$location, $http, $uibModal) {
        var vm = this;

        vm.message = null;
        vm.normalRender = true;
        vm.selectedProject;
        vm.repos;
        var profile;
        vm.pageSize = 5;
        vm.currentPage = 1;
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
        vm.updateProjectManagerVisibilty = updateProjectManagerVisibilty;
        vm.updateProjectManager = updateProjectManager;
        vm.accessControl = accessControl;

var remCommits = [];
        var i =0;
        function accessControl(project) {

            var textUrl = 'views/project/access.view.html';

            var updateAccess = $uibModal.open ({
                templateUrl: textUrl,
                controller: function($uibModalInstance, $scope) {

                    vm.accesses = findAllAccess(project);

                    $scope.ok = function () {
                        $uibModalInstance.close(project);
                    };

                    $scope.cancel = function () {
                        $scope.project = project;
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.addAccess = function(access) {

                        ProjectService.addAccess(project,access)
                                    .then(function (reponse) {
                                        vm.access = null;
                                        $scope.accesses = findAllAccess(project);

                            });
                    }
                    function findAllAccess(project) {
                        ProjectService.findAllAccess(project)
                            .then(function (response) {
                                console.log("vm.accesses "+vm.accesses);
                            vm.accesses = response.data;
                                $scope.accesses = response.data
                            return vm.accesses;
                        });
                        return vm.accesses;
                    }

                    $scope.updateAccess = function(access) {
                        console.log("inside update project controller");
                        ProjectService.updateAccess(access)
                                    .then(function (reponse) {
                                       // vm.access = null;
                                        $scope.accesses = findAllAccess(project,$rootScope.currentUser);
                                    });
                    }

                    $scope.deleteAccess = function(access) {
                        ProjectService.deleteAccess(access)
                                    .then(function (reponse) {
                                       // vm.access = null;
                                        //vm.accesses = findAllAccess(project,$rootScope.currentUser);
                                    });

                    }

                    $scope.selectAccess = function(index) {
                        $scope.accesses = findAllAccess(project,$rootScope.currentUser);
                        $scope.access= vm.accesses[index];

                    }
                },
                resolve: {
                    grade: function () {
                        return vm.selectedAccess;
                    }
                }
            });
        }

        function updateProjectManager(index,currentProjectemail) {
            console.log("test in client "+currentProjectemail);
            var project = vm.projects[index];
            ProjectService.updateAccess(project,currentProjectemail)
                .then(function (response){
                    vm.normalRender = true;
                    vm.projects = findAllProjects();
                });
        }

        function updateProjectManagerVisibilty(index) {
            vm.normalRender = false;
            vm.cond = index;
        }

        function getGitInfo(username) {
            if (username === undefined) {
                vm.message = "Enter a valid username";
                return;
            }
            vm.gUsername = username;
            var CURRENT_USER_URL = USER_URL+username;
            return $http.get(CURRENT_USER_URL)
                .success(getUserDetails)
                .error(function () {
                    vm.userNotFound = true;
                });
        }

        function getUserDetails(data) {
            vm.user = data;
            vm.loaded = true;
            var page =1;

            //page=2&per_page=100

            $http.get(USER_URL+ vm.gUsername + "/repos")
                .success(renderRepositories);
        }

        function renderRepositories(response, status, header,config) {

            $rootScope.repos = response;
            $rootScope.header = header();
           // console.log("herader "+header().get('link'));
            vm.repos = response;
            console.log("here"+$rootScope.repos);
           // vm.reposFound = response.length;
        }

        function searchRepository(Repository) {
            return $http.get(REP_URL + Repository.id + "/commits").success(getSelectedRepCommitDetails);
        }

        function getSelectedRepCommitDetails(data, status, header, xyz) {
            commits = data;

           // var linkHeader = header().link;


              //  var parsed = linkHeader.split(';')
           // console.log("fsdfsdf"+(parsed[1].substr(6,4)));

                 //   $rootScope.header = parsed;
                   // console.log("link Header "+linkHeader);

            return commits;
        }

        function findAllProjects() {
            var cur_proj =null;
            var user;
            var projects;
            ProjectUserService.getCurrentUser()
                .then ( function(response) {
                    user = response.data;
                    ProjectService.findAllProjectsForUser(
                        user._id)
                        .then(
                            function(response){
                                projects =response.data;
                                for(var v in projects) {
                                    searchRepository(projects[v].repos).then(function (Result) {

                                        // project.repos = {repId: repId, repName: repName};
                                        projects[v].commits = commits;
                                    });

                                }
                                vm.projects = projects;
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
               // vm.commits = commits;
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
               // project.commits = commits;
               // project.commitMessage = commits[count-1].commit.message;
               // project.committer = commits[count-1].commit.committer.name;
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
            ProjectService.deleteProject(project._id)
                .then(function (response) {
                    vm.projects = findAllProjects();
                });
        }

        function gitUserProfile(project) {
           //var project = selectGitProject(index);
            console.log("dsfsd "+project.gusername);
            getGitInfo(project.gusername).then(function (Result) {
                console.log("vm.user "+vm.user);
                $rootScope.gitUserProfile = vm.user;
            });
        }

        function gitprojectCommits(project) {
             console.log("inside commits");
            //var project = selectGitProject(index);

            searchRepository(project.repos).then(function (Result) {
                // project.repos = {repId: repId, repName: repName};

                project.commits = commits;
                $rootScope.gitProject = project;
            });
        }

        function selectGitProject(index) {
            vm.projects = findAllProjects();
            $rootScope.profile = true;
            var project = {
                title: vm.projects[index].title,
                description: vm.projects[index].description,
                status: vm.projects[index].status,
                gusername: vm.projects[index].gusername,
                repos: vm.projects[index].repos,
                startDate: vm.projects[index].startDate,
                endDate: vm.projects[index].endDate,
               // commits: vm.projects[index].commits
            };

            searchRepository(project.repos).then(function (Result) {

                // project.repos = {repId: repId, repName: repName};
                project.commits = commits;

                var endDate = new Date(project.endDate);
                var startDate = new Date(project.startDate);
                project.endDate = endDate;
                project.startDate = startDate;
            });
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

