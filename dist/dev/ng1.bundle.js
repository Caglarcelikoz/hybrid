webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(6);
__webpack_require__(8);
__webpack_require__(10);
__webpack_require__(12);
__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(25);
__webpack_require__(27);
__webpack_require__(29);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(35);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(40);
__webpack_require__(42);
__webpack_require__(44);
__webpack_require__(45);
__webpack_require__(46);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var app = angular.module("app", ["ngRoute", "toastr"]);
app.run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function (e, next, prev, err) {
        if (err === "AUTH_REQUIRED") {
            $location.path("/login");
        }
        if (err === "NOT_AUTHORIZED") {
            $location.path("/home");
        }
    });
});
angular.element(document).ready(function () {
    angular.bootstrap(document.body, ["app"]);
});
app.config([
    "$locationProvider",
    function ($locationProvider) {
        $locationProvider.hashPrefix("");
    }
]);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

(function() {
  var toastrModule = angular.module('toastr', []);
  
  toastr.options.timeOut = 1000;
  
  toastrModule.value('toastr', toastr);
  
}())

/***/ }),
/* 3 */
/***/ (function(module, exports) {

angular.module('app').config(function ($routeProvider) {
    var routeResolvers = {
        loggedIn: function (auth) {
            return auth.requireLogin();
        },
        waitForAuth: function (auth) {
            return auth.waitForAuth();
        },
        requireAdmin: function (auth) {
            return auth.requireAdmin();
        },
        userSessions: function (sessions, currentIdentity, auth) {
            return auth.requireLogin().then(function () {
                return sessions.getSessionsByUser(currentIdentity.currentUser.id);
            });
        },
        userTasks: function (tasks, currentIdentity, auth) {
            return auth.requireLogin().then(function () {
                return tasks.getTasksByUser(currentIdentity.currentUser.id);
            });
        },
        allSessions: function (sessions, auth) {
            return auth.requireLogin().then(function () {
                return sessions.getAllSessions();
            });
        },
        allTasks: function (tasks, auth) {
            return auth.requireLogin().then(function () {
                return tasks.getAllTasks();
            });
        },
        allUsers: function (users, auth) {
            return auth.requireLogin().then(function () {
                return users.getAllUsers();
            });
        }
    };
    $routeProvider
        .when("/admin/login", {
        template: "<admin-login></admin-login>",
        resolve: {
            currentAuth: routeResolvers.waitForAuth
        }
    })
        .when("/admin/results", {
        template: '<results all-tasks="$resolve.allTasks"></results>',
        controllerAs: "vm",
        resolve: {
            admin: routeResolvers.requireAdmin,
            allTasks: routeResolvers.allTasks
        }
    })
        .when("/admin/users/:id", {
        template: '<user-details all-users="$resolve.allUsers"></user-details>',
        resolve: {
            admin: routeResolvers.requireAdmin,
            allUsers: routeResolvers.allUsers
        }
    })
        .when("/users", {
        template: '<user-list all-users="$resolve.allUsers"></user-list>',
        resolve: {
            admin: routeResolvers.requireAdmin,
            allUsers: routeResolvers.allUsers
        }
    })
        .when("/admin/createusers", {
        template: "<create-users></create-users>",
        resolve: {
            admin: routeResolvers.requireAdmin
        }
    })
        .when("/home", {
        template: '<home user-sessions="$resolve.userSessions" user-tasks="$resolve.userTasks"></home>',
        resolve: {
            login: routeResolvers.loggedIn,
            userTasks: routeResolvers.userTasks,
            userSessions: routeResolvers.userSessions
        }
    })
        .when("/profile", {
        template: '<profile user-profile="$resolve.userProfile"></profile>',
        resolve: {
            userProfile: routeResolvers.loggedIn
        }
    })
        .when("/createsession", {
        template: '<create-new-session user-sessions="$resolve.userSessions"></create-new-session>',
        resolve: {
            userSessions: routeResolvers.userSessions
        }
    })
        .when("/createtask", {
        template: '<create-new-task user-tasks="$resolve.userTasks"></create-new-task>',
        resolve: {
            userTasks: routeResolvers.userTasks
        }
    })
        .when("/login", {
        template: "<login></login>",
        resolve: {
            currentAuth: routeResolvers.waitForAuth
        }
    })
        .when("/logout", {
        template: "<logout></logout>"
    })
        .otherwise("/home");
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("adminLogin", {
    template: __webpack_require__(5),
    bindings: {},
    controller: function ($location, currentIdentity, auth, toastr) {
        this.loggedIn = currentIdentity.authenticated();
        if (this.loggedIn) {
            $location.path("/home");
        }
        this.login = function () {
            auth
                .login({
                username: this.email,
                password: this.password
            })
                .then(function () {
                $location.path("/home");
            }, function (err) {
                toastr.error(err);
            });
        };
    }
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<h1>Admin Login</h1>\n\n<form class=\"form\">\n  <div class=\"row\">\n  <div class=\"form-group col-sm-6\">\n    <input type=\"text\" autofocus placeholder=\"Email Address\" ng-model=\"$ctrl.email\" class=\"form-control\">\n  </div>\n  </div>\n  <div class=\"row\">\n  <div class=\"form-group col-sm-6\">\n    <input type=\"password\" placeholder=\"Password\" ng-model=\"$ctrl.password\" class=\"form-control\">\n  </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n    <button class=\"btn btn-primary\" ng-click=\"$ctrl.login()\">Login</button>\n    </div>\n  </div>\n</form>";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("results", {
    template: __webpack_require__(7),
    bindings: {
        tasksByVoteDesc: "=allTasks"
    },
    controller: function () {
        this.$onInit = function () {
            this.tasksByVoteDesc.sort(function (task1, task2) {
                // reverse order
                return task2.id - task1.id;
            });
        };
    }
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\n<h1>All tasks</h1>\n\n<tasks-list tasks=\"$ctrl.tasksByVoteDesc\"></tasks-list>\n\n";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("createUsers", {
    template: __webpack_require__(9),
    bindings: {},
    controller: function (nameParser, users, toastr) {
        this.import = function () {
            var people = nameParser.parse(this.namesblob);
            people.forEach(function (person) {
                users
                    .createNewUser({
                    email: person.email,
                    password: "pass",
                    firstName: person.firstName,
                    lastName: person.lastName
                })
                    .catch(function (error) {
                    toastr.error("User already exists: " + person.email);
                }.bind(this));
            }.bind(this));
            toastr.success("Users Created!");
        };
    }
});


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\n\n<h1>Create Users</h1>\n<p>Enter Email Addresses here. One on each line, First and Last Name Pipe Separated</p>\n<textarea name=\"emailAddresses\" id=\"\" cols=\"30\" rows=\"10\" class=\"form-control\" \n  placeholder=\"Email Addresses\" ng-model=\"$ctrl.namesblob\"></textarea>\n<br>\n<button class=\"btn btn-primary\" ng-click=\"$ctrl.import()\">Create Users</button>\n";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('app').component('userList', {
    template: __webpack_require__(11),
    bindings: {
        users: '=allUsers'
    },
    controller: function () {
        this.$onInit = function () {
            this.users.sort(function (user1, user2) {
                if (user1.firstName < user2.firstName)
                    return -1;
                if (user1.firstName === user2.firstName)
                    return 0;
                if (user1.firstName > user2.firstName)
                    return 1;
            });
        };
    }
});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\n<h1>User List</h1>\n\n<a ng-href=\"#/admin/users/{{user.id}}\" zoom-in class=\"btn btn-primary btn-spaced\" ng-repeat=\"user in $ctrl.users\">\n  {{user.firstName}}\n  {{user.lastName}}\n</a>\n";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("userDetails", {
    template: __webpack_require__(13),
    bindings: {
        allUsers: "="
    },
    controller: function ($routeParams) {
        this.user = this.allUsers.find(function (user) {
            return user.id === parseInt($routeParams.id);
        });
    }
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\n<div class=\"jumbotron\">\n  <h1>{{$ctrl.user.firstName}} {{$ctrl.user.lastName}}\n    <span class=\"badge\" ng-show=\"$ctrl.user.isAdmin\">Admin</span>\n  </h1>\n  <p>{{$ctrl.user.email}}</p>\n</div>";

/***/ }),
/* 14 */
/***/ (function(module, exports) {

angular.module("app").service("nameParser", (function () {
    function NameParser() {
    }
    NameParser.prototype.parse = function (blobInput) {
        var lines = blobInput.split(/\r?\n/);
        lines.forEach(function (line, idx) {
            var pieces = line.split("|");
            lines[idx] = {
                email: pieces[0],
                firstName: pieces[1],
                lastName: pieces[2]
            };
        });
        return lines;
    };
    return NameParser;
}()));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("nav", {
    template: __webpack_require__(16),
    bindings: {},
    controller: function (currentIdentity, sessions, unreviewedSessionCount) {
        this.currentUser = currentIdentity.currentUser;
        unreviewedSessionCount.updateUnreviewedSessionCount();
        this.unreviewedSessionCount = unreviewedSessionCount;
    }
});


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar navbar-fixed-top navbar-inverse\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <a href=\"/\" class=\"navbar-brand\">Hybrid Angular</a>\n    </div>\n    <div class=\"navbar-collapse collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li>\n          <a href=\"#/\"\n            >Home\n            <span class=\"badge\">{{$ctrl.unreviewedSessionCount.value}}</span>\n          </a>\n        </li>\n        <li><a href=\"#/createsession\">Create Session</a></li>\n        <li><a href=\"#/createtask\">Create Task</a></li>\n        <li><a href=\"#/profile\">Profile</a></li>\n        <li>\n          <a href=\"#/admin/createusers\" ng-show=\"$ctrl.currentUser.isAdmin\"\n            >Create Users</a\n          >\n        </li>\n        <li>\n          <a href=\"#/admin/results\" ng-show=\"$ctrl.currentUser.isAdmin\"\n            >Results</a\n          >\n        </li>\n        <li><a href=\"#/users\" ng-show=\"$ctrl.currentUser.isAdmin\">Users</a></li>\n        <li><a href=\"#/logout\">Logout</a></li>\n      </ul>\n\n      <ul class=\"nav navbar-right navbar nav\">\n        <li class=\"navbar-text\">\n          Welcome {{$ctrl.currentUser.firstName}} {{$ctrl.currentUser.lastName}}\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

angular.module("app").component("logout", {
    controller: function ($location, auth) {
        auth.logout();
        $location.path("/login");
    }
});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("login", {
    template: __webpack_require__(19),
    bindings: {},
    controller: (function () {
        function LoginCtrl($location, currentIdentity, auth, toastr) {
            this.$location = $location;
            this.auth = auth;
            this.toastr = toastr;
            if (currentIdentity.authenticated()) {
                $location.path("/home");
            }
        }
        LoginCtrl.prototype.login = function () {
            var _this = this;
            this.auth
                .login({
                username: this.email,
                password: "pass"
            })
                .then(function () {
                _this.$location.path("/home");
            }, function (err) {
                _this.toastr.error(err);
            });
        };
        return LoginCtrl;
    }())
});


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "<h1>Please Login</h1>\n\n<p>Enter your attendee email address</p>\n<form class=\"form\">\n  <div class=\"row\">\n    <div class=\"form-group col-sm-6\">\n      <input type=\"text\" autofocus placeholder=\"Email Address\" ng-model=\"$ctrl.email\" class=\"form-control\">\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-sm-6\">\n      <button class=\"btn btn-primary\" ng-click=\"$ctrl.login()\">Login</button>\n    </div>\n  </div>\n</form>";

/***/ }),
/* 20 */
/***/ (function(module, exports) {

angular.module("app").service("auth", (function () {
    function Auth($q, $http, currentIdentity) {
        this.$q = $q;
        this.$http = $http;
        this.currentIdentity = currentIdentity;
    }
    Auth.prototype.login = function (credentials) {
        var _this = this;
        var dfd = this.$q.defer();
        this.$http.post("/api/login", credentials).then(function (response) {
            _this.currentIdentity.setUser(response.data.user);
            dfd.resolve();
        }, function (response) {
            dfd.reject("Invalid Credentials");
        });
        return dfd.promise;
    };
    Auth.prototype.logout = function () {
        var _this = this;
        var dfd = this.$q.defer();
        this.$http.post("/api/logout").then(function (response) {
            _this.currentIdentity.clearUser();
            dfd.resolve();
        }, function (response) {
            dfd.reject("Error Logging Out");
        });
        return dfd.promise;
    };
    Auth.prototype.waitForAuth = function () {
        var _this = this;
        var dfd = this.$q.defer();
        this.$http.get("/api/currentIdentity").then(function (response) {
            if (!!response.data) {
                _this.currentIdentity.setUser(response.data);
            }
            dfd.resolve(_this.currentIdentity);
        });
        return dfd.promise;
    };
    Auth.prototype.requireLogin = function () {
        var _this = this;
        return this.waitForAuth().then(function () {
            if (_this.currentIdentity.authenticated()) {
                return true;
            }
            else {
                return _this.$q.reject("AUTH_REQUIRED");
            }
        });
    };
    Auth.prototype.requireAdmin = function () {
        var _this = this;
        return this.waitForAuth().then(function () {
            if (_this.currentIdentity.authenticated() &&
                _this.currentIdentity.currentUser.isAdmin) {
                return true;
            }
            else {
                return _this.$q.reject("AUTH_REQUIRED");
            }
        });
    };
    return Auth;
}()));


/***/ }),
/* 21 */
/***/ (function(module, exports) {

angular.module("app").service("currentIdentity", (function () {
    function CurrentIdentity($http, $q) {
        this.$http = $http;
        this.$q = $q;
        this.currentUser = null;
    }
    CurrentIdentity.prototype.setUser = function (user) {
        this.currentUser = user;
    };
    CurrentIdentity.prototype.clearUser = function () {
        this.currentUser = null;
    };
    CurrentIdentity.prototype.authenticated = function () {
        return !!this.currentUser;
    };
    CurrentIdentity.prototype.updateUser = function (newUserObj) {
        var _this = this;
        var dfd = this.$q.defer();
        this.$http.put("/api/users/" + this.currentUser.id, newUserObj).then(function (response) {
            _this.currentUser.firstName = newUserObj.firstName;
            _this.currentUser.lastName = newUserObj.lastName;
            dfd.resolve();
        }, function (response) {
            dfd.reject("Error Logging Out");
        });
        return dfd.promise;
    };
    return CurrentIdentity;
}()));


/***/ }),
/* 22 */
/***/ (function(module, exports) {

angular.module("app").service("users", (function () {
    function Users($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    Users.prototype.createNewUser = function (newUser) {
        return this.$http.post("/api/users", newUser);
    };
    Users.prototype.getAllUsers = function () {
        var dfd = this.$q.defer();
        this.$http.get("/api/users").then(function (response) {
            dfd.resolve(response.data);
        });
        return dfd.promise;
    };
    return Users;
}()));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("home", {
    template: __webpack_require__(24),
    bindings: {
        userSessions: "=",
        userTasks: "="
    },
    controller: function (currentIdentity, sessions, toastr, unreviewedSessionCount) {
        this.currentUser = currentIdentity.currentUser;
        this.setNextSessionToReview = function () {
            var _this = this;
            sessions
                .getNextUnreviewedSession(currentIdentity.currentUser.id)
                .then(function (response) {
                _this.currentSessionToReview = response.data;
            });
        };
        this.setNextSessionToReview();
        this.voteYes = function () {
            var _this = this;
            sessions
                .incrementVote(this.currentSessionToReview.id)
                .then(function () {
                return sessions.addReviewedSession(_this.currentUser.id, _this.currentSessionToReview.id);
            })
                .then(function () {
                this.setNextSessionToReview();
                // pull updated value
                unreviewedSessionCount.updateUnreviewedSessionCount();
            }.bind(this));
        };
        this.voteNo = function () {
            sessions
                .addReviewedSession(this.currentUser.id, this.currentSessionToReview.id)
                .then(function () {
                this.setNextSessionToReview();
                // pull updated value
                unreviewedSessionCount.updateUnreviewedSessionCount();
            }.bind(this));
        };
    }
});


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\n\n<h2 style=\"margin-top:30px\">Unreviewed Sessions</h2>\n<unreviewed-talk session=\"vm.currentSessionToReview\" vote-no=\"$ctrl.voteNo()\" vote-yes=\"$ctrl.voteYes()\"></unreviewed-talk>\n<hr style=\"margin-top:20px\">\n<h3>Your Sessions\n<a zoom-in class=\"btn btn-primary btn-xs\" href=\"#/createsession\">Create a New Session</a>\n</h3>\n\n<div ng-repeat=\"session in $ctrl.userSessions\">\n  <session-detail session=\"session\" initial-collapsed=\"true\"></session-detail>\n</div>\n\n<h2>Your Tasks</h2>\n<tasks-list tasks=\"$ctrl.userTasks\"></tasks-list>\n";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("createNewSession", {
    template: __webpack_require__(26),
    bindings: {
        userSessions: "="
    },
    controller: function (toastr, currentIdentity, sessions) {
        this.create = function () {
            var newUserSession = {
                title: this.title,
                length: parseInt(this.length),
                abstract: this.abstract,
                userFirstName: currentIdentity.currentUser.firstName,
                userLastName: currentIdentity.currentUser.lastName,
                userId: currentIdentity.currentUser.id
            };
            sessions.createNewSession(newUserSession).then(function (response) {
                console.log(response);
                this.userSessions.push(response.data);
            }.bind(this));
        };
    }
});


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\n\n<h1>Create New Session</h1>\n\n<form class=\"form\">\n  <div class=\"form-group\">\n    Give your session a title\n    <input required type=\"text\" placeholder=\"Title\" ng-model=\"$ctrl.title\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    Enter a length, from 2 minutes to 30 minutes\n    <input required type=\"number\" placeholder=\"Length in Minutes\" \n      ng-model=\"$ctrl.length\" class=\"form-control\" min=\"2\" max=\"30\">\n  </div>\n  <div class=\"form-group\">\n    Describe your session\n    <textarea required name=\"\" id=\"\" cols=\"30\" rows=\"4\" \n      ng-model=\"$ctrl.abstract\" class=\"form-control\"\n      placeholder=\"Abstract\"></textarea>\n  </div>\n  \n  <div class=\"row\">\n    <div class=\"col-sm-3\">\n      <button class=\" btn btn-primary btn-sm\" ng-click=\"$ctrl.create()\">Create</button>\n    </div>\n  </div>\n</form>\n\n<h2>Your Other Sessions</h2>\n<div ng-repeat=\"session in $ctrl.userSessions\">\n  <session-detail session=\"session\" initial-collapsed=\"false\"></session-detail>\n</div>";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("createNewTask", {
    template: __webpack_require__(28),
    bindings: {
        userTasks: "="
    },
    controller: function (toastr, currentIdentity, tasks) {
        this.createTask = function () {
            var newUserTask = {
                title: this.title,
                estimated_hours: parseInt(this.estimated_hours),
                time_taken: 0,
                assigned_to: currentIdentity.currentUser.firstName +
                    " " +
                    currentIdentity.currentUser.lastName,
                manager: currentIdentity.currentUser.firstName +
                    " " +
                    currentIdentity.currentUser.lastName,
                id_assigned: currentIdentity.currentUser.id
            };
            tasks.createNewTask(newUserTask).then(function (response) {
                console.log(response);
                this.userTasks.push(response.data);
                this.title = "";
                this.estimated_hours = "";
            }.bind(this));
        };
    }
});


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\r\n\r\n<h1>Create New Task</h1>\r\n\r\n<form class=\"form\">\r\n  <div class=\"form-group\">\r\n    Title\r\n    <input required type=\"text\" placeholder=\"Title\" ng-model=\"$ctrl.title\" class=\"form-control\">\r\n  </div>\r\n  <div class=\"form-group\">\r\n    Estimated hours\r\n    <input required type=\"number\" placeholder=\"\" \r\n      ng-model=\"$ctrl.estimated_hours\" class=\"form-control\" min=\"0\" max=\"100\">\r\n  </div>\r\n \r\n  \r\n  <div class=\"row\">\r\n    <div class=\"col-sm-3\">\r\n      <button class=\" btn btn-primary btn-sm\" ng-click=\"$ctrl.createTask()\">Create</button>\r\n    </div>\r\n  </div>\r\n</form>\r\n\r\n<h2>Your Other Tasks</h2>\r\n<div ng-repeat=\"task in $ctrl.userTasks | orderBy: '-id'\">\r\n  <task-detail task=\"task\" initial-collapsed=\"false\"></task-detail>\r\n</div>";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("unreviewedTalk", {
    template: __webpack_require__(30),
    bindings: {
        session: "=",
        voteYes: "&",
        voteNo: "&"
    },
    controller: function () {
        this.yes = function () {
            this.voteYes();
        };
        this.no = function () {
            this.voteNo();
        };
    }
});


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = "<div ng-show=\"!!$ctrl.session\">\n  <div  class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      {{$ctrl.session.title}}\n    </div>\n    <div class=\"panel-body\">\n      <p><strong>{{$ctrl.session.length | talkDuration}}</strong></p>\n      <p>{{$ctrl.session.abstract}}</p>\n    </div>\n  </div>\n\n  <span>Are you interested in this session?</span>\n  <button class=\"btn btn-primary btn-xs\" ng-click=\"$ctrl.yes()\">Yes</button>\n  <button class=\"btn btn-warning btn-xs\" ng-click=\"$ctrl.no()\">No</button>\n</div>\n<div ng-show=\"!$ctrl.session\" class=\"alert alert-success\" role=\"alert\"> \n  You have reviewed all the submitted sessions\n</div>";

/***/ }),
/* 31 */
/***/ (function(module, exports) {

angular.module("app").service("sessions", (function () {
    function Sessions($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    Sessions.prototype.getSessionsByUser = function (userId) {
        var dfd = this.$q.defer();
        this.$http.get("/api/sessions/user/" + userId).then(function (response) {
            dfd.resolve(response.data);
        }, function () {
            dfd.reject();
        });
        return dfd.promise;
    };
    Sessions.prototype.getAllSessions = function () {
        var dfd = this.$q.defer();
        this.$http.get("/api/sessions").then(function (response) {
            dfd.resolve(response.data);
        }, function () {
            dfd.reject();
        });
        return dfd.promise;
    };
    Sessions.prototype.createNewSession = function (newSession) {
        return this.$http.post("/api/sessions", newSession);
    };
    Sessions.prototype.getNextUnreviewedSession = function (userId) {
        return this.$http.get("/api/users/" + userId + "/randomUnreviewedSession");
    };
    Sessions.prototype.addReviewedSession = function (userId, sessionId) {
        return this.$http.post("/api/users/" + userId + "/reviewSession/" + sessionId);
    };
    Sessions.prototype.incrementVote = function (sessionId) {
        return this.$http.put("/api/sessions/" + sessionId + "/incrementVote/");
    };
    Sessions.prototype.getUnreviewedCount = function (userId) {
        return this.$http.get("/api/users/" + userId + "/unreviewedSessionCount");
    };
    return Sessions;
}()));


/***/ }),
/* 32 */
/***/ (function(module, exports) {

angular.module("app").service("unreviewedSessionCount", (function () {
    function UnreviewedSessionCount(sessions, currentIdentity) {
        this.value = 0;
        this.sessions = sessions;
        this.currentIdentity = currentIdentity;
    }
    UnreviewedSessionCount.prototype.updateUnreviewedSessionCount = function () {
        var _this = this;
        this.sessions
            .getUnreviewedCount(this.currentIdentity.currentUser.id)
            .then(function (response) {
            _this.value = response.data.count;
        });
    };
    return UnreviewedSessionCount;
}()));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("sessionDetail", {
    template: __webpack_require__(34),
    bindings: {
        session: "=",
        initialCollapsed: "@"
    },
    controller: function () { }
});


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = "<detail-panel\n  collapsed=\"{{$ctrl.initialCollapsed}}\"\n  title=\"{{$ctrl.session.title}}\"\n>\n  <strong>{{$ctrl.session.length | talkDuration}}</strong>\n  <p><small>{{$ctrl.session.abstract}}</small></p>\n</detail-panel>\n";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("sessionDetailWithVotes", {
    template: __webpack_require__(36),
    bindings: {
        session: "=",
        initialCollapsed: "@"
    },
    controller: function () { }
});


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "<detail-panel\n  collapsed=\"{{$ctrl.initialCollapsed}}\"\n  title=\"{{$ctrl.session.title}}\"\n>\n  <strong>{{$ctrl.session.voteCount}} votes</strong>\n  <p>{{$ctrl.session.length | talkDuration}}</p>\n  <p><small>{{$ctrl.session.abstract}}</small></p>\n</detail-panel>\n";

/***/ }),
/* 37 */
/***/ (function(module, exports) {

angular.module("app").service("tasks", (function () {
    function Tasks($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    Tasks.prototype.getTasksByUser = function (userId) {
        var dfd = this.$q.defer();
        this.$http.get("/api/tasks/user/" + userId).then(function (response) {
            dfd.resolve(response.data);
        }, function () {
            dfd.reject();
        });
        return dfd.promise;
    };
    Tasks.prototype.getAllTasks = function () {
        var dfd = this.$q.defer();
        this.$http.get("/api/tasks").then(function (response) {
            dfd.resolve(response.data);
        }, function () {
            dfd.reject();
        });
        return dfd.promise;
    };
    Tasks.prototype.createNewTask = function (newTask) {
        return this.$http.post("/api/tasks", newTask);
    };
    return Tasks;
}()));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("tasksList", {
    template: __webpack_require__(39),
    bindings: {
        tasks: "="
    },
    controller: function () { }
});


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "<table class=\"table table-striped table-dark\">\r\n  <thead>\r\n    <tr>\r\n      <th scope=\"col\">#</th>\r\n      <th scope=\"col\">Title</th>\r\n      <th scope=\"col\">Estimated hours</th>\r\n      <th scope=\"col\">Time taken</th>\r\n      <th scope=\"col\">Assigned to</th>\r\n      <th scope=\"col\">Status</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr ng-repeat=\"task in $ctrl.tasks\">\r\n      <th scope=\"row\">{{task.id}}</th>\r\n      <td>{{task.title}}</td>\r\n      <td>{{task.estimated_hours}}</td>\r\n      <td>{{task.time_taken}}</td>\r\n      <td>{{task.assigned_to}}</td>\r\n      <td>{{task.status}}</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("taskDetail", {
    template: __webpack_require__(41),
    bindings: {
        task: "=",
        initialCollapsed: "@"
    },
    controller: function () { }
});


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "<detail-panel collapsed=\"{{$ctrl.initialCollapsed}}\" title=\"{{$ctrl.task.title}}\">\r\n  <span>Status: </span><strong>{{$ctrl.task.status}}</strong><br />\r\n  <span>Assigned to: </span><strong>{{$ctrl.task.assigned_to}}</strong><br />\r\n  <span>Estimated hours: </span><strong>{{$ctrl.task.estimated_hours}}</strong>\r\n</detail-panel>\r\n";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("detailPanel", {
    transclude: true,
    template: __webpack_require__(43),
    bindings: {
        title: "@",
        initialCollapsed: "@collapsed"
    },
    controller: function () {
        this.collapsed = this.initialCollapsed === "true";
        this.collapse = function () {
            this.collapsed = !this.collapsed;
        };
    }
});


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-primary\">\n  <div class=\"panel-heading pointable\" ng-click=\"$ctrl.collapse()\">\n    <span>{{$ctrl.title}}</span>\n  </div>\n  <div class=\"panel-body\" ng-hide=\"$ctrl.collapsed\" ng-transclude>\n  </div>\n</div>";

/***/ }),
/* 44 */
/***/ (function(module, exports) {

angular.module("app").filter("talkDuration", function () {
    return function (duration) {
        return "Duration: " + duration + " minutes";
    };
});


/***/ }),
/* 45 */
/***/ (function(module, exports) {

angular.module("app").directive("zoomIn", function () {
    return {
        restrict: "A",
        link: function (scope, el, attrs) {
            el.on("mouseenter", function () {
                el[0].style.transform = "scale(1.1,1.1)";
            });
            el.on("mouseleave", function () {
                el[0].style.transform = "scale(1,1)";
            });
        }
    };
});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

angular.module("app").component("profile", {
    template: __webpack_require__(47),
    controller: function ($location, toastr, currentIdentity) {
        this.profile = angular.copy(currentIdentity.currentUser);
        this.save = function () {
            currentIdentity.updateUser(this.profile);
            toastr.success("Profile Saved!");
        };
        this.cancel = function () {
            $location.path("/home");
        };
    }
});


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = "<nav></nav>\n\n<h1>User Profile</h1>\n\n<form class=\"form-inline\">\n  <label for=\"firstName\">First Name</label>\n  <input\n    type=\"text\"\n    id=\"firstName\"\n    placeholder=\"First Name\"\n    class=\"form-control\"\n    ng-model=\"$ctrl.profile.firstName\"\n  />\n\n  <label for=\"lastName\">Last Name</label>\n  <input\n    type=\"text\"\n    id=\"lastName\"\n    placeholder=\"Last Name\"\n    class=\"form-control\"\n    ng-model=\"$ctrl.profile.lastName\"\n  />\n\n  <br /><br />\n  <button class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.save()\">Save</button>\n  <button class=\"btn btn-warning btn-sm\" ng-click=\"$ctrl.cancel()\">\n    Cancel\n  </button>\n</form>\n";

/***/ })
],[0]);
//# sourceMappingURL=ng1.bundle.js.map