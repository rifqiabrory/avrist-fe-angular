import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserProvider } from "src/providers/user/user";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  submitted: boolean = false;
  formGroup: FormGroup;
  isLoading: boolean = false;
  button: string = "Update";

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _userService: UserProvider
  ) {}

  ngOnInit() {
    this.formGroup = this._fb.group({
      user_id: ["", Validators.required],
      username: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
      birthDate: ["", Validators.required],
      image: [null, Validators.required],
    });

    this._route.queryParams.subscribe((params) => {
      this.init(params.id);
    });
  }

  get form() {
    return this.formGroup.controls;
  }

  init(id) {
    let body = {
      user_id: id,
    };
    this._userService.getUserBy(body).subscribe((response) => {
      if (response.status === 200) {
        let {
          user_id,
          username,
          first_name,
          last_name,
          gender,
          date_of_birth,
        } = response.content;
        let format = moment(date_of_birth, "YYYY-MM-DD").format("YYYY-M-DD");
        let arr = format.split("-");
        let birthDate = {
          year: parseInt(arr[0]),
          month: parseInt(arr[1]),
          day: parseInt(arr[2]),
        };
        this.formGroup.patchValue({
          user_id: user_id,
          username: username,
          firstName: first_name,
          lastName: last_name,
          gender: gender,
          birthDate: birthDate,
          image: "",
        });
      }
    });
  }

  onUpdate() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.isLoading = true;
    this.button = "Processing..";

    setTimeout(() => {
      let {
        user_id,
        username,
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
        user_id: user_id,
        username: username,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        date_of_birth: moment(birthOfDate, "YYYY-M-DD").format("YYYY-MM-DD"),
        user_image: base64,
        status: "submitted",
        updated_by: "admin",
        last_updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      this.isLoading = false;
      this.button = "Update";
      this._userService.update(body).subscribe((response) => {
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
