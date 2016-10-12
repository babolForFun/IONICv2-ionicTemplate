import { Component }            from '@angular/core';
import { NavController}         from 'ionic-angular';
import { Camera }               from 'ionic-native';
import { DatabaseService}       from "../../providers/database-service";
import { GlobalVariables}       from "../../providers/global-variables";


@Component({
  selector:     'page-home',
  templateUrl:  'home.html'
})

export class HomePage {

  public  _request : any;
  private _global : GlobalVariables;

  constructor(
    public  navCtrl           : NavController,
    private _databaseService  : DatabaseService,
    public global             : GlobalVariables) {

    this._global = global;

  }
  
  /* DATABASE */

  choosePhoto(){
    let options = {
      destinationType   : Camera.DestinationType.DATA_URL,
      sourceType        : Camera.PictureSourceType.PHOTOLIBRARY
    };

    Camera.getPicture(options)
      .then(
        (imageData) => {
          this._databaseService.saveImage(imageData)
            .then(
              (success) => {

                this._databaseService.selectImageBase64()
                  .then(
                    (success) => {this._request = "data:image/jpeg;base64," + success},
                    (error)   => {this._global.displayErrorMessage("Promise","selectImageBase64",error)}
                  )
              },
              (error)   => {this._global.displayErrorMessage("Promise","saveImage",error)}
            );
        },
        (error) => {this._global.displayErrorMessage("Promise","saveImage",error)
    });
  }

}














