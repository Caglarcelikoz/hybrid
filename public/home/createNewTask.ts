angular.module("app").component("createNewTask", {
  templateUrl: "./createNewTask.html",
  bindings: {
    userTasks: "="
  },

  controller: function(toastr, currentIdentity, tasks) {

    this.createTask = function() {
      var newUserTask = {
        title: this.title,
        estimated_hours: parseInt(this.estimated_hours),
        time_taken: 0,
        assigned_to:
          currentIdentity.currentUser.firstName +
          " " +
          currentIdentity.currentUser.lastName,
        manager:
          currentIdentity.currentUser.firstName +
          " " +
          currentIdentity.currentUser.lastName,
        id_assigned: currentIdentity.currentUser.id
      };

      tasks.createNewTask(newUserTask).then(
        function(response) {
          console.log(response);
          this.userTasks.push(response.data);
          this.title = "";
          this.estimated_hours = "";
        }.bind(this)
      );
    };
  }
});
