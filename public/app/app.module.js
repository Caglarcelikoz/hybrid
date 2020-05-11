"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var static_1 = require("@angular/upgrade/static");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var nameParser_service_1 = require("./admin/nameParser.service");
var unreviewedTalk_component_1 = require("./home/unreviewedTalk.component");
var talkDuration_pipe_1 = require("./common/talkDuration.pipe");
var profile_component_1 = require("./profile/profile.component");
var nav_component_1 = require("./nav/nav.component");
function getLocation(i) {
    return i.get("$location");
}
exports.getLocation = getLocation;
function getCurrentIdentity(i) {
    return i.get("currentIdentity");
}
exports.getCurrentIdentity = getCurrentIdentity;
function getToastr(i) {
    return i.get("toastr");
}
exports.getToastr = getToastr;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, static_1.UpgradeModule],
                declarations: [
                    app_component_1.AppComponent,
                    unreviewedTalk_component_1.unreviewedTalkComponent,
                    talkDuration_pipe_1.talkDurationPipe,
                    profile_component_1.ProfileComponent,
                    nav_component_1.NavComponent
                ],
                providers: [
                    nameParser_service_1.NameParser,
                    { provide: "$location", useFactory: getLocation, deps: ["$injector"] },
                    {
                        provide: "currentIdentity",
                        useFactory: getCurrentIdentity,
                        deps: ["$injector"]
                    },
                    { provide: "toastr", useFactory: getToastr, deps: ["$injector"] }
                ],
                bootstrap: [app_component_1.AppComponent],
                entryComponents: [unreviewedTalk_component_1.unreviewedTalkComponent, profile_component_1.ProfileComponent]
            },] },
];
/** @nocollapse */
AppModule.ctorParameters = function () { return []; };
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map