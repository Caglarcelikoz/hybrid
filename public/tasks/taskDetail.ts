angular.module("app").component("taskDetail", {
  templateUrl: "./taskDetail.html",
  bindings: {
    task: "=",
    initialCollapsed: "@"
  },
  controller: function() {}
});
