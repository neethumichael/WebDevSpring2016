/**
         * Created by neethu on 3/3/2016.
         */
        (function()
        {
            angular
                .module("ProjectTrackerApp")
                .controller("ProjectController", ProjectController);

            function ProjectController($rootScope,UserService, ProjectService,$location)
            {
                var vm = this;

        vm.message = null;
                vm.project = null;
        function init() {

           vm.projects = findAllProjects();
        }
        init();

       vm.addProject = addProject;
       vm.removeProject = removeProject;
        vm.selectProject = selectProject;
       vm.updateProject = updateProject;
                vm.findAllProjects = findAllProjects;
        vm.cancel = cancel;
       // var test_proj =   {id: 567, title: "TWC", description: "Web development", status: "Closed", projectTasks: ["abc"],  startDate:new Date(2013, 3,3), endDate: new Date(2015, 3,3)};

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

        function addProject(project)
        {
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

