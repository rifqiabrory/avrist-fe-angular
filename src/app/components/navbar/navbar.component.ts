import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {}

  onCreate(evt) {
    evt.preventDefault();
    this._router.navigate(["/create"]);
  }

  onHome(evt) {
    evt.preventDefault();
    this._router.navigate(["/"]);
  }
}
