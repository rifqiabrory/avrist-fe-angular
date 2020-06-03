import { Component, OnInit, ViewChild } from "@angular/core";
import { UserProvider } from "src/providers/user/user";
import { Router } from "@angular/router";
import { ModalConfirmService } from "../modal-confirm/modal-confirm.service";
import { PreviewService } from "../preview/preview.service";

@Component({
  selector: "app-List",
  templateUrl: "./List.component.html",
  styleUrls: ["./List.component.scss"],
})
export class ListComponent implements OnInit {
  isExist: boolean = false;
  users: Array<any> = [];
  num: number = 0;

  constructor(
    private _userService: UserProvider,
    private _router: Router,
    private _preview: PreviewService,
    private _confirmService: ModalConfirmService
  ) {
    this.init();
  }

  ngOnInit() {}

  init() {
    this._userService.getAllUsers().subscribe((response) => {
      if (response.status === 200) {
        this.users = response.content;
        this.num = this.users.length;
      } else {
        this.isExist = true;
      }
    });
  }

  onEdit(val) {
    this._router.navigate(["/edit"], { queryParams: { id: val.user_id } });
  }

  onPreview(image) {
    this._preview.preview("Preview An Image", image).then((value) => {
      console.log(value);
    });
  }

  onRemove(val) {
    this._confirmService
      .confirm(
        "Confirmation",
        `Do you want to remove ${val.first_name} ${val.last_name} ?`
      )
      .then((confirm) => {
        if (confirm) {
          this._userService
            .remove({
              user_id: val.user_id,
            })
            .subscribe((response) => {
              if (response.status === 200) {
                this.init();
              }
            });
        }
      })
      .catch((err) => {
        console.log("Dismiss ::" + err);
      });
  }
}
