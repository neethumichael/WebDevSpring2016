/**
 * Created by neethu on 3/3/2016.
 */
(function()
{
    angular
        .module("ProjectTrackerApp")
        .controller("TaskController", TaskController);

    function TaskController($rootScope,$scope,TaskService,UserService,$location,ProjectService)
    {
        $scope.addTask = addTask;
        $scope.removeTask = removeTask;
        $scope.selectTask = selectTask;
        $scope.updateTask = updateTask;
        $scope.cancel = cancel;
        $scope.tasks = TaskService.getAllTasks();
        $scope.users = UserService.getAllUsers();
        $scope.projects = ProjectService.getAllProjects();

        function addTask(task)
        {
            TaskService.addTask(task);
           var new_project_task = TaskService.updateGivenTask(task,task.projects.projectTasks);

        }


        function removeTask(task)
        {
            TaskService.removeTask(task);
            var new_project_task = TaskService.removeGivenTask(task,task.projects.projectTasks);
            console.log("cirtical test "+task.projects.title);
            var project = {
                title: task.projects.title,
                description: task.projects.description,
                status: task.projects.status,
                projectTasks: new_project_task,
                startDate: task.projects.startDate,
                endDate: task.projects.endDate

            };

            ProjectService.updateProject(project,0);
        }
        function selectTask(index)
        {
            var task = TaskService.selectTask(index,ProjectService.getAllProjects());
            TaskService.setCurrentTask(task);
            $location.url('/task');
        }
        function updateTask(task)
        {
           var temp_task = TaskService.updateTask(task);

            $rootScope.task = null;
        }

        function cancel()
        {
            $rootScope.task = null;
            TaskService.resetTask();
            $location.url('/task');
        }
    }
})();

