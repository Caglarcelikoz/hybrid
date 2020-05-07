angular.module("app").service(
  "tasks",
  class Tasks {
    $http: any;
    $q: any;

    constructor($http, $q) {
      this.$http = $http;
      this.$q = $q;
    }

    getTasksByUser(userId) {
      var dfd = this.$q.defer();

      this.$http.get("/api/tasks/user/" + userId).then(
        function(response) {
          dfd.resolve(response.data);
        },
        function() {
          dfd.reject();
        }
      );
      return dfd.promise;
    }

    getAllTasks() {
      var dfd = this.$q.defer();

      this.$http.get("/api/tasks").then(
        function(response) {
          dfd.resolve(response.data);
        },
        function() {
          dfd.reject();
        }
      );
      return dfd.promise;
    }

    createNewTask(newTask) {
      return this.$http.post("/api/tasks", newTask);
    }
  }
);
