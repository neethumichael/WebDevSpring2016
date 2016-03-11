/**
 * Created by neethu on 3/3/2016.
 */
(function () {
    angular
        .module("ProjectTrackerApp")
        .controller("DocumentController", DocumentController);

    function DocumentController($rootScope,$scope,DocumentService,UserService) {
        $scope.addDocument = addDocument;
        $scope.removeDocument = removeDocument;
        $scope.selectDocument = selectDocument;
        $scope.updateDocument = updateDocument;
        $scope.documents = DocumentService.getAllDocuments();
        $scope.document = null;
        $scope.message = null;
        $scope.selectedDocument = null;
        $rootScope.users = UserService.getAllUsers();

        function addDocument(document) {
            $scope.message = null;
            errorCheck(document);
            if($scope.message){
                return;
            }
            DocumentService.addDocument(document);
            $scope.selectedDocument = null;
        }

        function removeDocument(document) {
            DocumentService.removeDocument(document);
        }
        function selectDocument(index) {
            $scope.selectedDocument = DocumentService.selectDocument(index);
            console.log("tes "+$scope.selectedDocument.author);
        }
        function updateDocument(document) {
            $scope.message = null;
            errorCheck(document);
            if($scope.message){
                return;
            }
            DocumentService.updateDocument(document);
            $scope.selectedDocument = null;
        }

        function errorCheck(document) {
            if (document === null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!document.name) {
                $scope.message = "Please provide a document name";
                return;
            }
            if (!document.author) {
                $scope.message = "Please select an author";
                return;
            }
        }
    }
})();