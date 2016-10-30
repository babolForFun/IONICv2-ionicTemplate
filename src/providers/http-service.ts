import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class HttpService {

  constructor(public _http: Http) {
    this._http = _http;
  }
  
  
  getRequest(_url:string,_headers){
    return new Promise((resolve, reject) => {
      this._http
          .get(_url,_headers)
          .toPromise()
          .then(
              (success) => { resolve(success);},
              (error)   => { reject(error);}
          );
    })
  }
  
  postRequest(_url,_body, _headers){
    return new Promise((resolve, reject) => {
      this._http
          .post(_url, _body,_headers)
          .toPromise()
          .then(
              (success) => { resolve(success);},
              (error)   => { reject(error);}
          );
    })
  }

}
