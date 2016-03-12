/**
 * Created by neethu on 3/3/2016.
 */
/**
 * Created by neethu on 2/20/2016.
 */
(function () {
    'use strict';
    angular
        .module("ProjectTrackerApp")
        .factory("DocumentService", DocumentService);

    function DocumentService($rootScope) {
        $rootScope.selectedDocumentIndex = null;
        var selectedDocument = null;

        var user1 = {firstname: "Alice", lastname: "Wonderland", username: "alice", password: "alice",
                emailid: "alice@xyz.com", user_id: 123, role: "Project Manager"};
        var user2 = {firstname: "John", lastname: "Doe", username: "john_doe", password: "john_doe",
                emailid: "john_doe@xyz.com", user_id: 234, role: "Team Lead"};

        var model = {
            documents: [
                {id: "890", name: "Project Scope", author: user1},
                {id: "547", name: "Requirement Tracebility Matrix", author: user2}
            ],

            updateDocument: updateDocument,
            selectDocument: selectDocument,
            removeDocument: removeDocument,
            addDocument: addDocument,
            getAllDocuments: getAllDocuments

        };
        return model;

        function getAllDocuments() {
            return model.documents;
        }

        function updateDocument(document) {
            model.documents[$rootScope.selectedDocumentIndex] = {
                name: document.name,
                author: document.author
            };
            $rootScope.selectedDocumentIndex = null;
        }

        function selectDocument(index) {
            $rootScope.selectedDocumentIndex = index;
            selectedDocument = {
                name: model.documents[index].name,
                author: model.documents[index].author
            };
            return selectedDocument;
        }

        function removeDocument(document) {
            var index = model.documents.indexOf(document);
            model.documents.splice(index, 1);
        }

        function addDocument(document) {
            if ($rootScope.selectedDocumentIndex === null) {
                var newDocument = {
                    id: (new Date).getTime(),
                    name: document.name,
                    author: document.author
                };
                model.documents.push(newDocument);
            }
        }
    }
}());

