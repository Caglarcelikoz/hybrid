angular.module("app").controller("logoutCtrl", function ($location, auth) {
    auth.logout();
    $location.path("/login");
});
//# sourceMappingURL=logout.js.map