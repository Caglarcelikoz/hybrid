!function(e){function t(s){if(n[s])return n[s].exports;var r=n[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,s){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:s})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(1),n(2),n(3),n(4),n(6),n(8),n(10),n(12),n(14),n(15),n(17),n(18),n(20),n(21),n(22),n(23),n(25),n(27),n(29),n(31),n(32),n(33),n(35),n(37),n(38),n(40),n(42),n(44),n(45),n(46)},function(e,t){var n=angular.module("app",["ngRoute","toastr"]);n.run(function(e,t){e.$on("$routeChangeError",function(e,n,s,r){"AUTH_REQUIRED"===r&&t.path("/login"),"NOT_AUTHORIZED"===r&&t.path("/home")})}),angular.element(document).ready(function(){angular.bootstrap(document.body,["app"])}),n.config(["$locationProvider",function(e){e.hashPrefix("")}])},function(e,t){!function(){var e=angular.module("toastr",[]);toastr.options.timeOut=1e3,e.value("toastr",toastr)}()},function(e,t){angular.module("app").config(function(e){var t={loggedIn:function(e){return e.requireLogin()},waitForAuth:function(e){return e.waitForAuth()},requireAdmin:function(e){return e.requireAdmin()},userSessions:function(e,t,n){return n.requireLogin().then(function(){return e.getSessionsByUser(t.currentUser.id)})},userTasks:function(e,t,n){return n.requireLogin().then(function(){return e.getTasksByUser(t.currentUser.id)})},allSessions:function(e,t){return t.requireLogin().then(function(){return e.getAllSessions()})},allTasks:function(e,t){return t.requireLogin().then(function(){return e.getAllTasks()})},allUsers:function(e,t){return t.requireLogin().then(function(){return e.getAllUsers()})}};e.when("/admin/login",{template:"<admin-login></admin-login>",resolve:{currentAuth:t.waitForAuth}}).when("/admin/results",{template:'<results all-tasks="$resolve.allTasks"></results>',controllerAs:"vm",resolve:{admin:t.requireAdmin,allTasks:t.allTasks}}).when("/admin/users/:id",{template:'<user-details all-users="$resolve.allUsers"></user-details>',resolve:{admin:t.requireAdmin,allUsers:t.allUsers}}).when("/users",{template:'<user-list all-users="$resolve.allUsers"></user-list>',resolve:{admin:t.requireAdmin,allUsers:t.allUsers}}).when("/admin/createusers",{template:"<create-users></create-users>",resolve:{admin:t.requireAdmin}}).when("/home",{template:'<home user-sessions="$resolve.userSessions" user-tasks="$resolve.userTasks"></home>',resolve:{login:t.loggedIn,userTasks:t.userTasks,userSessions:t.userSessions}}).when("/profile",{template:'<profile user-profile="$resolve.userProfile"></profile>',resolve:{userProfile:t.loggedIn}}).when("/createsession",{template:'<create-new-session user-sessions="$resolve.userSessions"></create-new-session>',resolve:{userSessions:t.userSessions}}).when("/createtask",{template:'<create-new-task user-tasks="$resolve.userTasks"></create-new-task>',resolve:{userTasks:t.userTasks}}).when("/login",{template:"<login></login>",resolve:{currentAuth:t.waitForAuth}}).when("/logout",{template:"<logout></logout>"}).otherwise("/home")})},function(e,t,n){angular.module("app").component("adminLogin",{template:n(5),bindings:{},controller:function(e,t,n,s){this.loggedIn=t.authenticated(),this.loggedIn&&e.path("/home"),this.login=function(){n.login({username:this.email,password:this.password}).then(function(){e.path("/home")},function(e){s.error(e)})}}})},function(e,t){e.exports='<h1>Admin Login</h1>\n\n<form class="form">\n  <div class="row">\n  <div class="form-group col-sm-6">\n    <input type="text" autofocus placeholder="Email Address" ng-model="$ctrl.email" class="form-control">\n  </div>\n  </div>\n  <div class="row">\n  <div class="form-group col-sm-6">\n    <input type="password" placeholder="Password" ng-model="$ctrl.password" class="form-control">\n  </div>\n  </div>\n  <div class="row">\n    <div class="col-sm-6">\n    <button class="btn btn-primary" ng-click="$ctrl.login()">Login</button>\n    </div>\n  </div>\n</form>'},function(e,t,n){angular.module("app").component("results",{template:n(7),bindings:{tasksByVoteDesc:"=allTasks"},controller:function(){this.$onInit=function(){this.tasksByVoteDesc.sort(function(e,t){return t.id-e.id})}}})},function(e,t){e.exports='<nav></nav>\n<h1>All tasks</h1>\n\n<tasks-list tasks="$ctrl.tasksByVoteDesc"></tasks-list>\n\n'},function(e,t,n){angular.module("app").component("createUsers",{template:n(9),bindings:{},controller:function(e,t,n){this.import=function(){e.parse(this.namesblob).forEach(function(e){t.createNewUser({email:e.email,password:"pass",firstName:e.firstName,lastName:e.lastName}).catch(function(t){n.error("User already exists: "+e.email)}.bind(this))}.bind(this)),n.success("Users Created!")}}})},function(e,t){e.exports='<nav></nav>\n\n<h1>Create Users</h1>\n<p>Enter Email Addresses here. One on each line, First and Last Name Pipe Separated</p>\n<textarea name="emailAddresses" id="" cols="30" rows="10" class="form-control" \n  placeholder="Email Addresses" ng-model="$ctrl.namesblob"></textarea>\n<br>\n<button class="btn btn-primary" ng-click="$ctrl.import()">Create Users</button>\n'},function(e,t,n){angular.module("app").component("userList",{template:n(11),bindings:{users:"=allUsers"},controller:function(){this.$onInit=function(){this.users.sort(function(e,t){return e.firstName<t.firstName?-1:e.firstName===t.firstName?0:e.firstName>t.firstName?1:void 0})}}})},function(e,t){e.exports='<nav></nav>\n<h1>User List</h1>\n\n<a ng-href="#/admin/users/{{user.id}}" zoom-in class="btn btn-primary btn-spaced" ng-repeat="user in $ctrl.users">\n  {{user.firstName}}\n  {{user.lastName}}\n</a>\n'},function(e,t,n){angular.module("app").component("userDetails",{template:n(13),bindings:{allUsers:"="},controller:function(e){this.user=this.allUsers.find(function(t){return t.id===parseInt(e.id)})}})},function(e,t){e.exports='<nav></nav>\n<div class="jumbotron">\n  <h1>{{$ctrl.user.firstName}} {{$ctrl.user.lastName}}\n    <span class="badge" ng-show="$ctrl.user.isAdmin">Admin</span>\n  </h1>\n  <p>{{$ctrl.user.email}}</p>\n</div>'},function(e,t){angular.module("app").service("nameParser",function(){function e(){}return e.prototype.parse=function(e){var t=e.split(/\r?\n/);return t.forEach(function(e,n){var s=e.split("|");t[n]={email:s[0],firstName:s[1],lastName:s[2]}}),t},e}())},function(e,t,n){angular.module("app").component("nav",{template:n(16),bindings:{},controller:function(e,t,n){this.currentUser=e.currentUser,n.updateUnreviewedSessionCount(),this.unreviewedSessionCount=n}})},function(e,t){e.exports='<div class="navbar navbar-fixed-top navbar-inverse">\n  <div class="container">\n    <div class="navbar-header">\n      <a href="/" class="navbar-brand">Hybrid Angular</a>\n    </div>\n    <div class="navbar-collapse collapse">\n      <ul class="nav navbar-nav">\n        <li>\n          <a href="#/"\n            >Home\n            <span class="badge">{{$ctrl.unreviewedSessionCount.value}}</span>\n          </a>\n        </li>\n        <li><a href="#/createsession">Create Session</a></li>\n        <li><a href="#/createtask">Create Task</a></li>\n        <li><a href="#/profile">Profile</a></li>\n        <li>\n          <a href="#/admin/createusers" ng-show="$ctrl.currentUser.isAdmin"\n            >Create Users</a\n          >\n        </li>\n        <li>\n          <a href="#/admin/results" ng-show="$ctrl.currentUser.isAdmin"\n            >Results</a\n          >\n        </li>\n        <li><a href="#/users" ng-show="$ctrl.currentUser.isAdmin">Users</a></li>\n        <li><a href="#/logout">Logout</a></li>\n      </ul>\n\n      <ul class="nav navbar-right navbar nav">\n        <li class="navbar-text">\n          Welcome {{$ctrl.currentUser.firstName}} {{$ctrl.currentUser.lastName}}\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n'},function(e,t){angular.module("app").component("logout",{controller:function(e,t){t.logout(),e.path("/login")}})},function(e,t,n){angular.module("app").component("login",{template:n(19),bindings:{},controller:function(){function e(e,t,n,s){this.$location=e,this.auth=n,this.toastr=s,t.authenticated()&&e.path("/home")}return e.prototype.login=function(){var e=this;this.auth.login({username:this.email,password:"pass"}).then(function(){e.$location.path("/home")},function(t){e.toastr.error(t)})},e}()})},function(e,t){e.exports='<h1>Please Login</h1>\n\n<p>Enter your attendee email address</p>\n<form class="form">\n  <div class="row">\n    <div class="form-group col-sm-6">\n      <input type="text" autofocus placeholder="Email Address" ng-model="$ctrl.email" class="form-control">\n    </div>\n  </div>\n  <div class="row">\n    <div class="col-sm-6">\n      <button class="btn btn-primary" ng-click="$ctrl.login()">Login</button>\n    </div>\n  </div>\n</form>'},function(e,t){angular.module("app").service("auth",function(){function e(e,t,n){this.$q=e,this.$http=t,this.currentIdentity=n}return e.prototype.login=function(e){var t=this,n=this.$q.defer();return this.$http.post("/api/login",e).then(function(e){t.currentIdentity.setUser(e.data.user),n.resolve()},function(e){n.reject("Invalid Credentials")}),n.promise},e.prototype.logout=function(){var e=this,t=this.$q.defer();return this.$http.post("/api/logout").then(function(n){e.currentIdentity.clearUser(),t.resolve()},function(e){t.reject("Error Logging Out")}),t.promise},e.prototype.waitForAuth=function(){var e=this,t=this.$q.defer();return this.$http.get("/api/currentIdentity").then(function(n){n.data&&e.currentIdentity.setUser(n.data),t.resolve(e.currentIdentity)}),t.promise},e.prototype.requireLogin=function(){var e=this;return this.waitForAuth().then(function(){return!!e.currentIdentity.authenticated()||e.$q.reject("AUTH_REQUIRED")})},e.prototype.requireAdmin=function(){var e=this;return this.waitForAuth().then(function(){return!(!e.currentIdentity.authenticated()||!e.currentIdentity.currentUser.isAdmin)||e.$q.reject("AUTH_REQUIRED")})},e}())},function(e,t){angular.module("app").service("currentIdentity",function(){function e(e,t){this.$http=e,this.$q=t,this.currentUser=null}return e.prototype.setUser=function(e){this.currentUser=e},e.prototype.clearUser=function(){this.currentUser=null},e.prototype.authenticated=function(){return!!this.currentUser},e.prototype.updateUser=function(e){var t=this,n=this.$q.defer();return this.$http.put("/api/users/"+this.currentUser.id,e).then(function(s){t.currentUser.firstName=e.firstName,t.currentUser.lastName=e.lastName,n.resolve()},function(e){n.reject("Error Logging Out")}),n.promise},e}())},function(e,t){angular.module("app").service("users",function(){function e(e,t){this.$http=e,this.$q=t}return e.prototype.createNewUser=function(e){return this.$http.post("/api/users",e)},e.prototype.getAllUsers=function(){var e=this.$q.defer();return this.$http.get("/api/users").then(function(t){e.resolve(t.data)}),e.promise},e}())},function(e,t,n){angular.module("app").component("home",{template:n(24),bindings:{userSessions:"=",userTasks:"="},controller:function(e,t,n,s){this.currentUser=e.currentUser,this.setNextSessionToReview=function(){var n=this;t.getNextUnreviewedSession(e.currentUser.id).then(function(e){n.currentSessionToReview=e.data})},this.setNextSessionToReview(),this.voteYes=function(){var e=this;t.incrementVote(this.currentSessionToReview.id).then(function(){return t.addReviewedSession(e.currentUser.id,e.currentSessionToReview.id)}).then(function(){this.setNextSessionToReview(),s.updateUnreviewedSessionCount()}.bind(this))},this.voteNo=function(){t.addReviewedSession(this.currentUser.id,this.currentSessionToReview.id).then(function(){this.setNextSessionToReview(),s.updateUnreviewedSessionCount()}.bind(this))}}})},function(e,t){e.exports='<nav></nav>\n\n<h2 style="margin-top:30px">Unreviewed Sessions</h2>\n<unreviewed-talk session="vm.currentSessionToReview" vote-no="$ctrl.voteNo()" vote-yes="$ctrl.voteYes()"></unreviewed-talk>\n<hr style="margin-top:20px">\n<h3>Your Sessions\n<a zoom-in class="btn btn-primary btn-xs" href="#/createsession">Create a New Session</a>\n</h3>\n\n<div ng-repeat="session in $ctrl.userSessions">\n  <session-detail session="session" initial-collapsed="true"></session-detail>\n</div>\n\n<h2>Your Tasks</h2>\n<tasks-list tasks="$ctrl.userTasks"></tasks-list>\n'},function(e,t,n){angular.module("app").component("createNewSession",{template:n(26),bindings:{userSessions:"="},controller:function(e,t,n){this.create=function(){var e={title:this.title,length:parseInt(this.length),abstract:this.abstract,userFirstName:t.currentUser.firstName,userLastName:t.currentUser.lastName,userId:t.currentUser.id};n.createNewSession(e).then(function(e){console.log(e),this.userSessions.push(e.data)}.bind(this))}}})},function(e,t){e.exports='<nav></nav>\n\n<h1>Create New Session</h1>\n\n<form class="form">\n  <div class="form-group">\n    Give your session a title\n    <input required type="text" placeholder="Title" ng-model="$ctrl.title" class="form-control">\n  </div>\n  <div class="form-group">\n    Enter a length, from 2 minutes to 30 minutes\n    <input required type="number" placeholder="Length in Minutes" \n      ng-model="$ctrl.length" class="form-control" min="2" max="30">\n  </div>\n  <div class="form-group">\n    Describe your session\n    <textarea required name="" id="" cols="30" rows="4" \n      ng-model="$ctrl.abstract" class="form-control"\n      placeholder="Abstract"></textarea>\n  </div>\n  \n  <div class="row">\n    <div class="col-sm-3">\n      <button class=" btn btn-primary btn-sm" ng-click="$ctrl.create()">Create</button>\n    </div>\n  </div>\n</form>\n\n<h2>Your Other Sessions</h2>\n<div ng-repeat="session in $ctrl.userSessions">\n  <session-detail session="session" initial-collapsed="false"></session-detail>\n</div>'},function(e,t,n){angular.module("app").component("createNewTask",{template:n(28),bindings:{userTasks:"="},controller:function(e,t,n){this.createTask=function(){var e={title:this.title,estimated_hours:parseInt(this.estimated_hours),time_taken:0,assigned_to:t.currentUser.firstName+" "+t.currentUser.lastName,manager:t.currentUser.firstName+" "+t.currentUser.lastName,id_assigned:t.currentUser.id};n.createNewTask(e).then(function(e){console.log(e),this.userTasks.push(e.data),this.title="",this.estimated_hours=""}.bind(this))}}})},function(e,t){e.exports='<nav></nav>\r\n\r\n<h1>Create New Task</h1>\r\n\r\n<form class="form">\r\n  <div class="form-group">\r\n    Title\r\n    <input required type="text" placeholder="Title" ng-model="$ctrl.title" class="form-control">\r\n  </div>\r\n  <div class="form-group">\r\n    Estimated hours\r\n    <input required type="number" placeholder="" \r\n      ng-model="$ctrl.estimated_hours" class="form-control" min="0" max="100">\r\n  </div>\r\n \r\n  \r\n  <div class="row">\r\n    <div class="col-sm-3">\r\n      <button class=" btn btn-primary btn-sm" ng-click="$ctrl.createTask()">Create</button>\r\n    </div>\r\n  </div>\r\n</form>\r\n\r\n<h2>Your Other Tasks</h2>\r\n<div ng-repeat="task in $ctrl.userTasks | orderBy: \'-id\'">\r\n  <task-detail task="task" initial-collapsed="false"></task-detail>\r\n</div>'},function(e,t,n){angular.module("app").component("unreviewedTalk",{template:n(30),bindings:{session:"=",voteYes:"&",voteNo:"&"},controller:function(){this.yes=function(){this.voteYes()},this.no=function(){this.voteNo()}}})},function(e,t){e.exports='<div ng-show="!!$ctrl.session">\n  <div  class="panel panel-default">\n    <div class="panel-heading">\n      {{$ctrl.session.title}}\n    </div>\n    <div class="panel-body">\n      <p><strong>{{$ctrl.session.length | talkDuration}}</strong></p>\n      <p>{{$ctrl.session.abstract}}</p>\n    </div>\n  </div>\n\n  <span>Are you interested in this session?</span>\n  <button class="btn btn-primary btn-xs" ng-click="$ctrl.yes()">Yes</button>\n  <button class="btn btn-warning btn-xs" ng-click="$ctrl.no()">No</button>\n</div>\n<div ng-show="!$ctrl.session" class="alert alert-success" role="alert"> \n  You have reviewed all the submitted sessions\n</div>'},function(e,t){angular.module("app").service("sessions",function(){function e(e,t){this.$http=e,this.$q=t}return e.prototype.getSessionsByUser=function(e){var t=this.$q.defer();return this.$http.get("/api/sessions/user/"+e).then(function(e){t.resolve(e.data)},function(){t.reject()}),t.promise},e.prototype.getAllSessions=function(){var e=this.$q.defer();return this.$http.get("/api/sessions").then(function(t){e.resolve(t.data)},function(){e.reject()}),e.promise},e.prototype.createNewSession=function(e){return this.$http.post("/api/sessions",e)},e.prototype.getNextUnreviewedSession=function(e){return this.$http.get("/api/users/"+e+"/randomUnreviewedSession")},e.prototype.addReviewedSession=function(e,t){return this.$http.post("/api/users/"+e+"/reviewSession/"+t)},e.prototype.incrementVote=function(e){return this.$http.put("/api/sessions/"+e+"/incrementVote/")},e.prototype.getUnreviewedCount=function(e){return this.$http.get("/api/users/"+e+"/unreviewedSessionCount")},e}())},function(e,t){angular.module("app").service("unreviewedSessionCount",function(){function e(e,t){this.value=0,this.sessions=e,this.currentIdentity=t}return e.prototype.updateUnreviewedSessionCount=function(){var e=this;this.sessions.getUnreviewedCount(this.currentIdentity.currentUser.id).then(function(t){e.value=t.data.count})},e}())},function(e,t,n){angular.module("app").component("sessionDetail",{template:n(34),bindings:{session:"=",initialCollapsed:"@"},controller:function(){}})},function(e,t){e.exports='<detail-panel\n  collapsed="{{$ctrl.initialCollapsed}}"\n  title="{{$ctrl.session.title}}"\n>\n  <strong>{{$ctrl.session.length | talkDuration}}</strong>\n  <p><small>{{$ctrl.session.abstract}}</small></p>\n</detail-panel>\n'},function(e,t,n){angular.module("app").component("sessionDetailWithVotes",{template:n(36),bindings:{session:"=",initialCollapsed:"@"},controller:function(){}})},function(e,t){e.exports='<detail-panel\n  collapsed="{{$ctrl.initialCollapsed}}"\n  title="{{$ctrl.session.title}}"\n>\n  <strong>{{$ctrl.session.voteCount}} votes</strong>\n  <p>{{$ctrl.session.length | talkDuration}}</p>\n  <p><small>{{$ctrl.session.abstract}}</small></p>\n</detail-panel>\n'},function(e,t){angular.module("app").service("tasks",function(){function e(e,t){this.$http=e,this.$q=t}return e.prototype.getTasksByUser=function(e){var t=this.$q.defer();return this.$http.get("/api/tasks/user/"+e).then(function(e){t.resolve(e.data)},function(){t.reject()}),t.promise},e.prototype.getAllTasks=function(){var e=this.$q.defer();return this.$http.get("/api/tasks").then(function(t){e.resolve(t.data)},function(){e.reject()}),e.promise},e.prototype.createNewTask=function(e){return this.$http.post("/api/tasks",e)},e}())},function(e,t,n){angular.module("app").component("tasksList",{template:n(39),bindings:{tasks:"="},controller:function(){}})},function(e,t){e.exports='<table class="table table-striped table-dark">\r\n  <thead>\r\n    <tr>\r\n      <th scope="col">#</th>\r\n      <th scope="col">Title</th>\r\n      <th scope="col">Estimated hours</th>\r\n      <th scope="col">Time taken</th>\r\n      <th scope="col">Assigned to</th>\r\n      <th scope="col">Status</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr ng-repeat="task in $ctrl.tasks">\r\n      <th scope="row">{{task.id}}</th>\r\n      <td>{{task.title}}</td>\r\n      <td>{{task.estimated_hours}}</td>\r\n      <td>{{task.time_taken}}</td>\r\n      <td>{{task.assigned_to}}</td>\r\n      <td>{{task.status}}</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n'},function(e,t,n){angular.module("app").component("taskDetail",{template:n(41),bindings:{task:"=",initialCollapsed:"@"},controller:function(){}})},function(e,t){e.exports='<detail-panel collapsed="{{$ctrl.initialCollapsed}}" title="{{$ctrl.task.title}}">\r\n  <span>Status: </span><strong>{{$ctrl.task.status}}</strong><br />\r\n  <span>Assigned to: </span><strong>{{$ctrl.task.assigned_to}}</strong><br />\r\n  <span>Estimated hours: </span><strong>{{$ctrl.task.estimated_hours}}</strong>\r\n</detail-panel>\r\n'},function(e,t,n){angular.module("app").component("detailPanel",{transclude:!0,template:n(43),bindings:{title:"@",initialCollapsed:"@collapsed"},controller:function(){this.collapsed="true"===this.initialCollapsed,this.collapse=function(){this.collapsed=!this.collapsed}}})},function(e,t){e.exports='<div class="panel panel-primary">\n  <div class="panel-heading pointable" ng-click="$ctrl.collapse()">\n    <span>{{$ctrl.title}}</span>\n  </div>\n  <div class="panel-body" ng-hide="$ctrl.collapsed" ng-transclude>\n  </div>\n</div>'},function(e,t){angular.module("app").filter("talkDuration",function(){return function(e){return"Duration: "+e+" minutes"}})},function(e,t){angular.module("app").directive("zoomIn",function(){return{restrict:"A",link:function(e,t,n){t.on("mouseenter",function(){t[0].style.transform="scale(1.1,1.1)"}),t.on("mouseleave",function(){t[0].style.transform="scale(1,1)"})}}})},function(e,t,n){angular.module("app").component("profile",{template:n(47),controller:function(e,t,n){this.profile=angular.copy(n.currentUser),this.save=function(){n.updateUser(this.profile),t.success("Profile Saved!")},this.cancel=function(){e.path("/home")}}})},function(e,t){e.exports='<nav></nav>\n\n<h1>User Profile</h1>\n\n<form class="form-inline">\n  <label for="firstName">First Name</label>\n  <input\n    type="text"\n    id="firstName"\n    placeholder="First Name"\n    class="form-control"\n    ng-model="$ctrl.profile.firstName"\n  />\n\n  <label for="lastName">Last Name</label>\n  <input\n    type="text"\n    id="lastName"\n    placeholder="Last Name"\n    class="form-control"\n    ng-model="$ctrl.profile.lastName"\n  />\n\n  <br /><br />\n  <button class="btn btn-primary btn-sm" ng-click="$ctrl.save()">Save</button>\n  <button class="btn btn-warning btn-sm" ng-click="$ctrl.cancel()">\n    Cancel\n  </button>\n</form>\n'}]);