angular.module('app').controller('homeCtrl', 
    function(currentIdentity, userTasks,
    toastr, unreviewedSessionCount) {
      
      
  this.currentUser = currentIdentity.currentUser
  this.userTasks = userTasks;

})