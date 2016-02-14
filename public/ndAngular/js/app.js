(function() {
    angular.module("MovieDBApp",[])
        .controller("MovieListController",MovieListController);
    function MovieListController($scope)
    {
        var movies = {id: 123, title:"Avatar", year: 2007};
        $scope.movies = movies;
        $scope.addMovie = function()
        {
            console.add("Add movie");
        }
    }
})();
