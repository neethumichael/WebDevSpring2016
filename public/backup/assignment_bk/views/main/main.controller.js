/**
 * Created by neethu on 2/20/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("MainController",  MainController);

    function  MainController($scope, $location) {
        $scope.$location = $location;
    }
}());