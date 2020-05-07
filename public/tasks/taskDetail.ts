angular.module("app").component("taskDetail", {
  templateUrl: "/tasks/taskDetail.html",
  bindings: {
    task: "=",
    initialCollapsed: "@"
  },
  controller: function() {}
});
