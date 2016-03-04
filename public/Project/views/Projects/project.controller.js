/**
 * Created by neethu on 3/3/2016.
 */
(function()
{
    angular
        .module("ProjectTrackerApp")
        .controller("ProjectController", ProjectController);

    function ProjectController($rootScope,$scope,ProjectService,$location,TaskService)
    {
        $scope.addProject = addProject;
        $scope.removeProject = removeProject;
        $scope.selectProject = selectProject;
        $scope.updateProject = updateProject;
        $scope.cancel = cancel;
       // var test_proj =   {id: 567, title: "TWC", description: "Web development", status: "Closed", projectTasks: ["abc"],  startDate:new Date(2013, 3,3), endDate: new Date(2015, 3,3)};
        $scope.projects = ProjectService.getAllProjects();
        $scope.tasks = TaskService.getAllTasks();

        function cancel()
        {
            $scope.project = null;
            $scope.tasks = TaskService.getAllTasks();
            ProjectService.resetProject();
            $location.url('/project');
        }

        function addProject(project)
        {

            ProjectService.addProject(project);
            $scope.project = null;
        }

        function removeProject(project)
        {
            ProjectService.removeProject(project);
        }
        function selectProject(index)
        {
            var proj  = ProjectService.selectProject(index);
            ProjectService.setCurrentProject(proj);

            console.log($scope.project);
            $location.url('/project');
            console.log($scope.project.title);
        }
        function updateProject(project)
        {
            ProjectService.updateProject(project,-1);
            $scope.project = null;
        }
    }
})();

