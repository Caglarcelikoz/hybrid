app.config(function ($routeProvider) {
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
        controller: "userListCtrl",
        templateUrl: "admin/userlist.html",
        controllerAs: "vm",
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
//# sourceMappingURL=routes.js.map