import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Http, RequestOptions, Headers } from "@angular/http";
import { HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { URLServices } from "../url-services";

@Injectable()
export class ApiProvider {
  auth: string;

  constructor(
    public http: HttpClient,
    public http2: Http,
    public urlServices: URLServices
  ) {}

  postDocument(url, formData) {
    const headers = new Headers({});
    let options = new RequestOptions({ headers });

    return this.http2.post(url, formData, options).pipe(
      map((res) => this.extractData(res)),
      catchError(this.handleError)
    );
  }

  postD(_url, _body) {
    let url = _url;
    let body = _body;
    let response: any;

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let options = { headers: headers };

    return this.http.post(url, body, options).pipe(
      map((res) => this.extractData(res)),
      catchError(this.handleError)
    );
  }

  private extractData(body: any) {
    return Object.assign(body || body);
  }

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    let errObj: any;

    if (error.error) {
      errObj = error.error;
    } else {
      if (error instanceof HttpErrorResponse) {
        const err = error.message || JSON.stringify(error);
        errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
        errObj = error.message;
      } else {
        errMsg = error.message ? error.message : error.toString();
        const body = error.message || "";
        errObj = body;
      }
    }

    return Observable.throw(errObj);
  }
}
