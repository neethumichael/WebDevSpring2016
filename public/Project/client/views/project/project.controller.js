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
            if($location.url() == '/renderProjects') {
                vm.projects = findAllProjects();
            }
        }
        init();

        vm.gUsername;
        var noCommits =false;
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
                            vm.accesses = response.data;
                                $scope.accesses = response.data
                            return vm.accesses;
                        });
                        return vm.accesses;
                    }

                    $scope.updateAccess = function(access) {
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
                                        $scope.accesses = findAllAccess(project,$rootScope.currentUser);
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

        function renderRepositories(response) {
            vm.repos = response;
            vm.reposFound = response.length;
        }

        function searchRepository(Repository) {
            return $http.get(REP_URL + Repository.id + "/commits").success(getSelectedRepCommitDetails)
                .error(function() {
                    noCommits = true;

                });
        }

        function getSelectedRepCommitDetails(data) {
            commits = data;
            return commits;
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
            console.log("inside commits"+project.repos);
            //var project = selectGitProject(index);

            searchRepository(project.repos).then(function (Result) {
                    // project.repos = {repId: repId, repName: repName};

                    project.commits = commits;
                console.log("commits "+commits);
                console.log("commits lengtj "+commits.length);
                if(commits)
                    project.commitsFound = true;
                else
                    project.commitsFound = false;
                    console.log("commits lengtj "+project.commitsFound );
                    $rootScope.gitProject = project;
                },
                function(err) {
                    vm.message = err;
                    console.log("inside error "+err);
                });
            return;
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
                                        projects[v].commits = commits;

                                        if (noCommits)
                                        {
                                            projects[v].status = "Not Started";
                                        }
                                        else if (projects[v].commits.length>0) {
                                            projects[v].status = "Started";
                                            for(var u in projects[v].commits) {
                                                var s = projects[v].commits[u].commit.message;
                                                if (s.indexOf("finish")> -1) {
                                                    projects[v].status = "Completed";
                                                }
                                                break;
                                            }
                                        }
                                    },
                                    function(err) {
                                        projects[v].status = "Not Started";
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

            $http.get(REP_URL + project.repos.id + "/commits")
                .success(function(data){
                    for(var u in commits) {
                        var s = commits[u].commit.message;
                        if (s.indexOf(test)> -1) {
                            project.status = "Completed";
                        }
                        break;
                    }
                    if(!project.status)
                        project.status = "Started";
                    ProjectUserService.getCurrentUser()
                        .then ( function(response) {
                            user = response.data;
                            ProjectService.addProject(project,user._id)
                                .then(function (reponse) {
                                    vm.project = null;
                                    $location.url('/renderProjects');
                                });
                        });
                })
                .error(function(err) {
                    noCommits = true;
                    project.status = "Not Started";
                    ProjectUserService.getCurrentUser()
                        .then ( function(response) {
                            user = response.data;
                            ProjectService.addProject(project,user._id)
                                .then(function (reponse) {
                                    vm.project = null;
                                    $location.url('/renderProjects');
                                });
                        });

                });

       /*     searchRepository(project.repos).then(function (Result) {

$rootScope.commits = commits;
               // vm.commits = commits;
                console.log("commits "+typeof commits);
                var count =0;
                for (var u in commits) {
                        count++; }
                var test= "finish";
                vm.size = count;
                console.log("count "+count);
                if (count>0) {
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
                else {
                    project.status = "Not Started";
                }

                ProjectUserService.getCurrentUser()
                    .then ( function(response) {
                        user = response.data;
                        ProjectService.addProject(project,user._id)
                            .then(function (reponse) {
                                vm.project = null;
                                $location.url('/renderProjects');
                            });
                    });
            }),
                (function (err) {
                    console.log("errorrrrr");
                });*/
        }

        function removeProject(projectIndex) {
            var project = vm.projects[projectIndex];
            ProjectService.deleteProject(project._id)
                .then(function (response) {
                    vm.projects = findAllProjects();
                });
        }



        function selectGitProject(index) {

           // vm.projects = findAllProjects();
            $rootScope.profile = true;
            $rootScope.modify = true;
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
                _id: vm.projects[index]._id,
                userId: vm.projects[index].userId,
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
            console.log("project is "+project._id);
            ProjectService.updateProject(project)
                .then(function (response){
                    $rootScope.currentProject = null;
                    $location.url('/renderProjects');
                });
        }
    }
})();

