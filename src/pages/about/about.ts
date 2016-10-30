import { Component } from '@angular/core';

import {HttpService} from "../../providers/http-service";
import {GlobalVariables} from "../../providers/global-variables";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public _response;
  
  constructor(
      private _httpService  : HttpService,
      private _global       : GlobalVariables
  ){

  }
  
  getRequest(){
    this._httpService.getRequest(this._global.REQUEST_GET,this._global.REQUEST_HEADER)
        .then(
            (success) => {this._response = JSON.stringify(success, undefined, 2);},
            (error)   => {this._global.displayErrorMessage("Promise","selectImageBase64",error)}
        )
  }
  
  postRequest(){
    this._httpService.postRequest(this._global.REQUEST_POST,this._global.REQUEST_POST_PARAM,this._global.REQUEST_HEADER)
        .then(
            (success) => {this._response = JSON.stringify(success, undefined, 2);},
            (error)   => {this._global.displayErrorMessage("Promise","selectImageBase64",error)}
        )
  }
  

}
