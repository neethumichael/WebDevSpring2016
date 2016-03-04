/**
 * Created by neethu on 3/3/2016.
 */
(function()
{
    angular
        .module("ProjectTrackerApp")
        .controller("UserController", UserController);

    function UserController($scope,UserService)
    {


        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;
        $scope.users = UserService.getAllUsers();
        $scope.user = null;

        function addUser(user)
        {
            UserService.addUser(user);
        }

        function removeUser(user)
        {
            UserService.removeUser(user);
        }
        function selectUser(index)
        {
            $scope.user = UserService.selectUser(index);
        }
        function updateUser(user)
        {
            UserService.updateUser(user);
        }

    }
})();

