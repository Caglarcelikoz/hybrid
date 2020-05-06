
app.config(function($routeProvider) {
  var routeResolvers = {
    loggedIn: function(auth) {
      return auth.requireLogin();
    },
    waitForAuth: function(auth) {
      return auth.waitForAuth();
    },
    requireAdmin: function(auth) {
      return auth.requireAdmin();
    },
    userSessions: function(sessions, currentIdentity, auth) {
      return auth.requireLogin().then(function() {
        return sessions.getSessionsByUser(currentIdentity.currentUser.id);
      });
    },
    userTasks: function(tasks, currentIdentity, auth) {
      return auth.requireLogin().then(function() {
        return tasks.getTasksByUser(currentIdentity.currentUser.id);
      });
    },
    allSessions: function(sessions, auth) {
      return auth.requireLogin().then(function() {
        return sessions.getAllSessions();
      });
    },
    allTasks: function(tasks, auth) {
      return auth.requireLogin().then(function() {
        return tasks.getAllTasks();
      });
    },
    allUsers: function(users, auth) {
      return auth.requireLogin().then(function() {
        return users.getAllUsers();
      });
    }
    
  }
  
  $routeProvider
    .when('/admin/login', {
      template: '<admin-login></admin-login>',
      resolve: {
        currentAuth: routeResolvers.waitForAuth
      }
    })
    .when('/admin/results', {
      controller: 'resultsCtrl',
      templateUrl: 'admin/results.html',
      controllerAs: 'vm',
      resolve: {
        admin: routeResolvers.requireAdmin,
        allTasks: routeResolvers.allTasks
      }
    })
    .when('/admin/users/:id', {
      controller: 'userDetailsCtrl',
      templateUrl: 'admin/userDetails.html',
      controllerAs: 'vm',
      resolve: {
        admin: routeResolvers.requireAdmin,
        allUsers: routeResolvers.allUsers
      }
    })
    .when('/users', {
      controller: 'userListCtrl',
      templateUrl: 'admin/userlist.html',
      controllerAs: 'vm',
      resolve: {
        admin: routeResolvers.requireAdmin,
        allUsers: routeResolvers.allUsers
      }
    })
    .when('/admin/createusers', {
      controller: 'createUsersCtrl',
      templateUrl: 'admin/createUsers.html',
      controllerAs: 'vm',
      resolve:  {
        admin: routeResolvers.requireAdmin
      }
    })
    .when('/home', {
      controller: 'homeCtrl',
      templateUrl: 'home/home.html',
      controllerAs: 'vm',
      resolve: {
        login:routeResolvers.loggedIn,
        userTasks: routeResolvers.userTasks,
        userSessions: routeResolvers.userSessions
      }
    })
    .when('/profile', {
      controller: 'profileCtrl',
      templateUrl: 'profile/profile.html',
      controllerAs: 'vm',
      resolve: {
        userProfile: routeResolvers.loggedIn,
      }
    })
    .when('/createsession', {
      controller: 'createNewSessionCtrl',
      templateUrl: 'home/createNewSession.html',
      controllerAs: 'vm',
      resolve: {
        userSessions: routeResolvers.userSessions,
      }
    })
    .when('/createtask', {
      controller: 'createNewTaskCtrl',
      templateUrl: 'home/createNewTask.html',
      controllerAs: 'vm',
      resolve: {
        userTasks: routeResolvers.userTasks,
      }
    })
    .when('/login', {
      controller: 'loginCtrl',
      templateUrl: 'security/login.html',
      controllerAs: 'vm',
      resolve: {
        currentAuth: routeResolvers.waitForAuth
      }
    })
    .when('/logout', {
      controller: 'logoutCtrl',
      controllerAs: 'vm',
      template: '<logout></logout>'
    })
    .otherwise('/home')
})