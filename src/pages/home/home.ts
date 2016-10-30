import { Component }            from '@angular/core';
import { Camera }               from 'ionic-native';
import { DatabaseService}       from "../../providers/database-service";
import { GlobalVariables}       from "../../providers/global-variables";


@Component({
  selector:     'page-home',
  templateUrl:  'home.html'
})

export class HomePage {

  public  _request : any;

  constructor(
    private _databaseService  : DatabaseService,
    public _global            : GlobalVariables) {}
  
    
  /* DATABASE */

  choosePhoto(source: number){
    
    let options = {
      quality           : 80,
      allowEdit         : true,
      encodingType      : Camera.EncodingType.PNG,
      saveToPhotoAlbum  : true,
      correctOrientation: true,
      destinationType   : Camera.DestinationType.DATA_URL,
      sourceType        : (source == 0) ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY 
    };

    Camera.getPicture(options)
      .then(
        (imageData) => {
          this._databaseService.deletePreviousImage()
              .then(
                  (success) => {
                    this._databaseService.saveImage(imageData)
                        .then(
                            (success) => {
                              this._databaseService.selectImageBase64()
                                  .then(
                                      (success) => {this._request = "data:image/jpeg;base64," + success},
                                      (error)   => {this._global.displayErrorMessage("Promise","selectImageBase64",error)}
                                  )},
                            (error)   => {this._global.displayErrorMessage("Promise","saveImage",error)}
                        );},
                  (error) => {this._global.displayErrorMessage("Promise","deletePreviousImage",error);}
              )},
        (error) => {this._global.displayErrorMessage("Promise","saveImage",error)
    });
  }

}














