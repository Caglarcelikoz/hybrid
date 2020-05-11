import { Component, Inject } from "@angular/core";
@Component({
  selector: "profile",
  templateUrl: "./profile.component.html"
})
export class ProfileComponent {
  constructor(
    @Inject("$location")
    private $location,
    @Inject("currentIdentity")
    public currentIdentity,
    @Inject("toastr") private toastr
  ) {}

  save(newProfile) {
    this.currentIdentity.updateUser(newProfile);
    this.toastr.success("Profile Saved!");
    this.$location.path("/home");
  }

  cancel() {
    this.$location.path("/home");
  }
}
