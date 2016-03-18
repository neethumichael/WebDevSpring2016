/**
 * Created by neethu on 3/17/2016.
 */
var mock = require("./user.mock.json");
module.exports = function () {
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findIndexByUsername: findIndexByUsername
    };
    return api;

    function Delete(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock.splice(u, 1);
            }
        }
        mock;
    }

    function findUserByUsername(userName) {
        for(var u in mock) {
            if( mock[u].username === userName)

                return mock[u];
        }
        return null;
    }

    function findIndexByUsername(userName) {
        for(var u in mock) {
            if( mock[u].username === userName)

                return u;
        }
        return null;
    }

    function FindAll() {
        return mock;
    }

    function Update(user) {
        if(user) {
            var n = findIndexByUsername(user.username);
            if(n) {
                user._id = mock[n]._id;
                mock[n] = user;
                return mock[n];
            }
        }
        return null;
    }
function FindById(userId) {
    for(var u in mock) {
        if( mock[u]._id === userId ) {
            return mock[u];
        }
    }
    return null;
}

function Create(user) {
    user._id = "ID_" + (new Date()).getTime();
    mock.push(user);
    return user;
}

function findUserByCredentials(credentials) {
    for(var u in mock) {
        if( mock[u].username === credentials.username &&
            mock[u].password === credentials.password) {
            return mock[u];
        }
    }
    return null;
}
}