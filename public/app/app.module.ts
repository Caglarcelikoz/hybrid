import { NgModule } from "@angular/core";
import { UpgradeModule } from "@angular/upgrade/static";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { NameParser } from "./admin/nameParser.service";
import { unreviewedTalkComponent } from "./home/unreviewedTalk.component";
import { talkDurationPipe } from "./common/talkDuration.pipe";
import { ProfileComponent } from "./profile/profile.component";
import { NavComponent } from "./nav/nav.component";

function getLocation(i: any) {
  return i.get("$location");
}
function getCurrentIdentity(i: any) {
  return i.get("currentIdentity");
}
function getToastr(i: any) {
  return i.get("toastr");
}

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, UpgradeModule],
  declarations: [
    AppComponent,
    unreviewedTalkComponent,
    talkDurationPipe,
    ProfileComponent,
    NavComponent
  ],
  providers: [
    NameParser,
    { provide: "$location", useFactory: getLocation, deps: ["$injector"] },
    {
      provide: "currentIdentity",
      useFactory: getCurrentIdentity,
      deps: ["$injector"]
    },
    { provide: "toastr", useFactory: getToastr, deps: ["$injector"] }
  ],
  bootstrap: [AppComponent],
  entryComponents: [unreviewedTalkComponent, ProfileComponent]
})
export class AppModule {}
