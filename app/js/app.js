var app = angular.module('todoApp', []);
app.controller("myCtrl", function($scope, $http, $filter) {

    $http.get("api/get/tasks")
        .then(function(tasks) {
            tasks.data = $filter('orderBy')(tasks.data, "status");
            $scope.tasks = tasks;
        });
    // Call Socket

    function callSocket() {
        // 
        socket.emit('updateTaskSocket');
    }
    socket.on('updateTodolist', function(updateTodolist) {
        $http.get("api/get/tasks")
            .then(function(tasks) {
                tasks.data = $filter('orderBy')(tasks.data, "status");
                $scope.tasks = tasks;
            });
    });

    // Create task
    $scope.createTodo = function() {
        $scope.todo.status = false;
        $http.post('api/create/todo', $scope.todo)
            .then(function(success) {
                $http.get("api/get/tasks")
                    .then(function(tasks) {
                        tasks.data = $filter('orderBy')(tasks.data, "status");
                        $scope.tasks = tasks;
                        callSocket();
                    });

            }, function(error) {

            });
    }

    // Delete task 

    $scope.deleteTask = function(task) {

        var r = confirm("Are you sure you want to delete the item :" + '' + task.task + "?");
        if (r == true) {
            $http.delete("/api/delete/task/" + task._id)
                .then(function() {
                    $http.get("api/get/tasks")
                        .then(function(tasks) {
                            tasks.data = $filter('orderBy')(tasks.data, "status");
                            $scope.tasks = tasks;
                            callSocket();
                        });

                }, function(error) {

                });
        } else {

        }

    }

    // Update task 

    $scope.editTask = function(task) {
        $http.put("/api/edit/task/" + task._id, task)
            .then(function() {
                $http.get("api/get/tasks")
                    .then(function(tasks) {
                        tasks.data = $filter('orderBy')(tasks.data, "status");
                        $scope.tasks = tasks;
                        callSocket();
                    });

            }, function(error) {

            });
    }
    // Delete all task
    $scope.deleteAllTask = function() {
        var r = confirm("Are you sure you want to delete all items");
        if (r == true) {
            $http.delete("/api/delete/task")
                .then(function() {
                    $http.get("api/get/tasks")
                        .then(function(tasks) {
                            tasks.data = $filter('orderBy')(tasks.data, "status");
                            $scope.tasks = tasks;
                            callSocket();
                        });

                }, function(error) {

                });
        } else {

        }
    }


});