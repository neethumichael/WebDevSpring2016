/**
 * Created by neethu on 2/20/2016.
 */
(function(){
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .factory("TaskService", TaskService);

    function TaskService($rootScope) {

        var selectedTaskIndex =null;
        var selectedTask = null;
        var task1 = {id: 567, title: "xyz", description: "lorem ispusm", status: "Open", project_id: "09", assigned_to: "alice", priority:"high"};
        var task2 = {id: 987, title: "abc", description: "lorem ispusm hg ygsh", status: "Closed", project_id: "08", assigned_to: "bob", priority:"low"};
        var proj1 =
            {id: 567, title: "TWC", description: "Web development", status: "Closed", projectTasks: [task1,task2],  startDate:new Date(2013, 3,3), endDate: new Date(2015, 3,3)};
         var proj2 =   {id: 987, title: "Shell", description: "ETL", status: "Open", project_id: "08", projectTasks: [task1], startDate:new Date(2012, 3,3), endDate: new Date(2017, 3,3)};

        var model = {
        tasks: [
        {id: 567, title: "xyz", description: "lorem ispusm", status: "Open", projects: "567", assigned_to: "alice" },
        {id: 987, title: "abc", description: "lorem ispusm hg ygsh", status: "Closed", projects: "987", assigned_to: "bob"}
            ],

            updateTask: updateTask,
            selectTask: selectTask,
            removeTask: removeTask,
            addTask: addTask,
            getAllTasks: getAllTasks,
        };
        return model;
        function getAllTasks() {
            return model.tasks;
        }

        function updateTask(task) {
            if(task) {
                model.tasks[selectedTaskIndex] = {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    projects: task.projects,
                    assigned_to: task.assigned_to

                };
                return model.tasks[selectedTaskIndex];
            }
            else {
                return null;
            }
        }

        function selectTask(index,projects) {
            selectedTaskIndex = index;
            selectedTask = {
                title: model.tasks[index].title,
                description: model.tasks[index].description,
                status: model.tasks[index].status,
                projects: model.tasks[index].projects,
                assigned_to: model.tasks[index].assigned_to
            };
            selectedTaskIndex = null;

            return selectedTask;
        }

        function removeTask(task) {
            var index = model.tasks.indexOf(task);
            model.tasks.splice(index, 1);
        }

        function addTask(task) {
            if(!selectedTaskIndex) {
                var newTask = {
                    id: (new Date).getTime(),
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    projects: task.projects,
                    assigned_to: task.assigned_to
                };
                model.tasks.push(newTask);
            }
        }
    }
})();


