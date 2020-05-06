angular.module('app').directive('taskDetail', function() {
    return {
      templateUrl: '/tasks/taskDetail.html',
      scope: {
        task: '=',
        initialCollapsed: '@'
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: function() {
      }
    }
  })
  