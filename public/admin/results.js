angular.module("app").component("results", {
    templateUrl: "./results.html",
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
//# sourceMappingURL=results.js.map