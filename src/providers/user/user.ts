import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { URLServices } from "../url-services";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  testing: boolean = false;

  constructor(public http: HttpClient, public urlServices: URLServices) {}

  getAllUsers() {
    const url = this.urlServices.api + "/user/all";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let options = { headers: headers };

    return this.http
      .get(url, options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  create(body) {
    const url = this.urlServices.api + "/user/create";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let options = { headers: headers };
    return this.http
      .post(url, body, options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  update(body) {
    const url = this.urlServices.api + "/user/update";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let options = { headers: headers };
    return this.http
      .post(url, body, options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getUserBy(body) {
    const url = this.urlServices.api + "/user/find";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let options = { headers: headers };

    return this.http
      .post(url, body, options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  remove(body) {
    const url = this.urlServices.api + "/user/delete";
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let options = { headers: headers };

    return this.http
      .post(url, body, options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    let errObj: any;

    if (error instanceof HttpErrorResponse) {
      const err = error.message || JSON.stringify(error);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
      errObj = error.message;
    } else {
      errMsg = error.message ? error.message : error.toString();
      const body = error.message || "";
      errObj = body;
    }

    return Observable.throw(errObj);
  }

  private extractData(body: any) {
    return Object.assign(body || body);
  }
}
