angular.module('app').directive('tasksList', function() {
  return {
    templateUrl: '/tasks/tasksList.html',
    scope: {
      tasks: '=',
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: function() {
    }
  }
})
