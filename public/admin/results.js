angular.module("app").component("results", {
  templateUrl: "/admin/results.html",
  bindings: {
    tasksByVoteDesc: "=allTasks"
  },
  controller: function() {
    this.tasksByVoteDesc.sort(function(task1, task2) {
      // reverse order
      return task2.id - task1.id;
    });
  }
});
