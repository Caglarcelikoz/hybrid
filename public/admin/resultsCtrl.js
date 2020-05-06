angular.module('app').controller('resultsCtrl', 
      function(allTasks) {
  
    
  allTasks.sort(function(task1, task2) {
    // reverse order
    return task2.id - task1.id;
  })
  
  this.tasksByVoteDesc = allTasks;
})