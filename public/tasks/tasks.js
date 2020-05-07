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
//# sourceMappingURL=tasks.js.map