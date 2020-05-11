import { platformBrowser } from "@angular/platform-browser";
import { UpgradeModule, downgradeInjectable, downgradeComponent } from "@angular/upgrade/static";
import { AppModule } from "./app/app.module";
import { NameParser } from "./app/admin/nameParser.service";
import { unreviewedTalkComponent } from "./app/home/unreviewedTalk.component";
import { ProfileComponent } from "./app/profile/profile.component";
import { AppModuleNgFactory} from "../aot/public/app/app.module.ngfactory";
declare var angular: angular.IAngularStatic;

platformBrowser()
  .bootstrapModuleFactory(AppModuleNgFactory)
  .then(platformRef => {
    //downgrades
    angular
      .module("app")
      .factory("nameParser", downgradeInjectable(NameParser))
      .directive('unreviewedTalk',downgradeComponent({
        component: unreviewedTalkComponent
      }))
      .directive('profile',downgradeComponent({
        component: ProfileComponent
      }))
    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(document.documentElement, ["app"]);
    console.log("hybrid app bootstrapped");
  });
