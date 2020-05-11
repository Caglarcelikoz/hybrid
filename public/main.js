"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var static_1 = require("@angular/upgrade/static");
var app_module_1 = require("./app/app.module");
var nameParser_service_1 = require("./app/admin/nameParser.service");
var unreviewedTalk_component_1 = require("./app/home/unreviewedTalk.component");
var profile_component_1 = require("./app/profile/profile.component");
platform_browser_dynamic_1.platformBrowserDynamic()
    .bootstrapModule(app_module_1.AppModule)
    .then(function (platformRef) {
    //downgrades
    angular
        .module("app")
        .factory("nameParser", static_1.downgradeInjectable(nameParser_service_1.NameParser))
        .directive('unreviewedTalk', static_1.downgradeComponent({
        component: unreviewedTalk_component_1.unreviewedTalkComponent
    }))
        .directive('profile', static_1.downgradeComponent({
        component: profile_component_1.ProfileComponent
    }));
    var upgrade = platformRef.injector.get(static_1.UpgradeModule);
    upgrade.bootstrap(document.documentElement, ["app"]);
    console.log("hybrid app bootstrapped");
});
//# sourceMappingURL=main.js.map