angular.module('app').factory('tasks', function($http, $q) {
    return {
      getTasksByUser: function(userId) {
        var dfd = $q.defer();
        
        $http.get('/api/tasks/user/' + userId).then(function(response) {
          dfd.resolve(response.data);
        }, function() {
          dfd.reject();
        });
        return dfd.promise;
      },
      
      getAllTasks: function() {
        var dfd = $q.defer();
        
        $http.get('/api/tasks').then(function(response) {
          dfd.resolve(response.data);
        }, function() {
          dfd.reject();
        });
        return dfd.promise;
      },
      
      createNewTask: function(newTask) {
        return $http.post('/api/tasks', newTask);
      },
    }
  });