"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProfileComponent = (function () {
    function ProfileComponent($location, currentIdentity, toastr) {
        this.$location = $location;
        this.currentIdentity = currentIdentity;
        this.toastr = toastr;
    }
    ProfileComponent.prototype.save = function (newProfile) {
        this.currentIdentity.updateUser(newProfile);
        this.toastr.success("Profile Saved!");
        this.$location.path("/home");
    };
    ProfileComponent.prototype.cancel = function () {
        this.$location.path("/home");
    };
    return ProfileComponent;
}());
ProfileComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: "profile",
                templateUrl: "./profile.component.html"
            },] },
];
/** @nocollapse */
ProfileComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: ["$location",] },] },
    { type: undefined, decorators: [{ type: core_1.Inject, args: ["currentIdentity",] },] },
    { type: undefined, decorators: [{ type: core_1.Inject, args: ["toastr",] },] },
]; };
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map