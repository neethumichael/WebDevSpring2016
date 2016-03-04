/**
 * Created by neethu on 3/3/2016.
 */
/**
 * Created by neethu on 3/3/2016.
 */
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
            getTaskByName: getTaskByName,
            resetTask: resetTask,
            setCurrentTask: setCurrentTask,
            removeGivenTask: removeGivenTask,
            updateGivenTask: updateGivenTask,
            updateGivenTask2: updateGivenTask2

        };
        return model;

        function updateGivenTask2(tasks,newtask)
        {
            console.log("task size "+tasks.size);
            for(var t in tasks)
            {
                console.log("ha "+tasks[t]);
                if(tasks[t].id===newtask.id)
                {
                    tasks[t] = {
                        id: newtask.id,
                        title: newtask.title,
                        description: newtask.description,
                        status: newtask.status,
                        projects: newtask.projects,
                        assigned_to: newtask.assigned_to
                    }
                    console.log("sad "+tasks[t]);
                    return tasks;
                }

            }

        }
        function updateGivenTask(task,tasks)
        {
            tasks.push(task);
            return tasks;
        }
        function removeGivenTask(task,tasks)
        {
            for(var t in tasks)
            {
                if(tasks[t].title===task.title)
                   tasks.splice(t, 1);

            }
            return tasks;
        }
        function getAllTasks()
        {
            return model.tasks;
        }

        function getTaskByName(tname)
        {
            var list = [];
            for(var i=0;i<tname.length;i++) {
            for(var t in model.tasks) {
                if (tname[i] === model.tasks[t].title) {
                    list.push(model.tasks[t]);

                    break;
                }
            }
            }
            return list;
        }
        function resetTask()
        {
            $rootScope.task = null;
        }

        function setCurrentTask(task)
        {
            $rootScope.task = task ;
        }
        function updateTask(task)
        {
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

        function selectTask(index,projects)
        {
            selectedTaskIndex = index;
            selectedTask = {
                title: model.tasks[index].title,
                description: model.tasks[index].description,
                status: model.tasks[index].status,
                projects: model.tasks[index].projects,
                assigned_to: model.tasks[index].assigned_to
            };

            return selectedTask;
        }

        function removeTask(task)
        {
            var index = model.tasks.indexOf(task);
            model.tasks.splice(index, 1);
        }

        function addTask(task)
        {

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
})();


