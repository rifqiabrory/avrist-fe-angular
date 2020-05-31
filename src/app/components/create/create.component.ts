import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserProvider } from "src/providers/user/user";
import * as moment from "moment";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  submitted: boolean = false;
  formGroup: FormGroup;
  isLoading: boolean = false;
  button: string = "Save";

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserProvider
  ) {}

  ngOnInit() {
    this.formGroup = this._fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
      birthDate: ["2020-12-12", Validators.required],
      image: [null, Validators.required],
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  onSave() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing..";

    setTimeout(() => {
      let {
        username,
        password,
        firstName,
        lastName,
        gender,
        birthDate,
        image,
      } = this.formGroup.value;
      let base64 = image.split(",")[1];
      let { year, month, day } = birthDate;
      let birthOfDate = `${year}-${month}-${day}`;
      let body = {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        date_of_birth: moment(birthOfDate, "YYYY-M-DD").format("YYYY-MM-DD"),
        user_image: base64,
        status: "submitted",
        created_by: "admin",
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      this.isLoading = false;
      this.button = "Save";
      this._userService.create(body).subscribe((response) => {
        if (response.status === 200) {
          this._router.navigate(["/"]);
        }
      });
    }, 2000);
  }

  onChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // const size = file.size;
      // if(size > 8000)
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result,
        });
      };
    }
  }

  back() {
    this._router.navigate(["/"]);
  }
}
