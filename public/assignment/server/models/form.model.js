/**
 * Created by neethu on 3/17/2016.
 */
var mock =[];
var mock = require("./form.mock.json");
module.exports = function() {
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle
    };
    return api;

    function Delete(formId) {
        console.log("formidd "+formId);
        for (var u in mock) {
            console.log("test "+mock[u].title);
            if (mock[u]._id == formId) {
                mock.splice(u, 1);
                console.log("deleted");
            }
        }
        mock;
    }

    function findFormByTitle(title) {
        for(var u in mock) {
            if( mock[u].title === title ) {
                return mock[u];
            }
        }
        return null;
    }


    function FindById(formId) {
        for(var u in mock) {
            if( mock[u]._id === formId ) {
                return mock[u];
            }
        }
        return null;
    }

    function Create(userId,form) {
        var newForm = {
            _id: (new Date).getTime(),
            userId: userId,
            title: form.title
        };
        mock.push(newForm);
    }

    function FindAll(userId) {
        var listOfForms = [];
        var f;
        for (f in mock) {
            if (mock[f].userId == userId) {
                listOfForms.push(mock[f]);
            }
        }
        return listOfForms;
    }

    function Update(formId, newForm) {
        var f;
        for (f in mock) {
            if (mock[f]._id == formId) {
               mock[f].title = newForm.title;
               mock[f].userId = newForm.userId;
                return mock[f];
            }
        }
        return null;
    }
}
