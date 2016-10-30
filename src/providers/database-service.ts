import { Injectable }      from '@angular/core';
import { SQLite}           from 'ionic-native';
import { Platform }        from 'ionic-angular';
import { GlobalVariables } from "./global-variables";

import 'rxjs/add/operator/map';


@Injectable()
export class DatabaseService {

  private _query : string;
  private _db    : SQLite;
  private _global: GlobalVariables;

  constructor(
    public platform : Platform,
    public global   : GlobalVariables
  ) {
      this._global = global;

      platform.ready()
        .then(
        (success) => {
          this._db = new SQLite();
          this._db.openDatabase({
            name: this._global.dbName,
            location: "default"
          })
            .then(
              (success) => {this.initDatabase();},
              (error)   => {this._global.displayErrorMessage("Constructor","DatabaseService Constructor",error);}
            );
      });
  }

  private initDatabase(){
    this.createSystemTable()
      .then(
        (success) => {},
        (error)   => {this._global.displayErrorMessage("Promise","createSystemTable",error);}
      );
  }

  private createSystemTable(){
    this._query =
      "CREATE TABLE IF NOT EXISTS " + this._global.TABLE_SYSTEM + "(" +
        this._global.SYSTEM_ID         + " INTEGER primary key, " +
        this._global.SYSTEM_IMAGE      + " BLOB," +
        this._global.SYSTEM_CREATED_ON + " TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
      ")";

    return new Promise((resolve, reject) => {
      this._db.executeSql(this._query, {})
        .then(
          (success) => {resolve(); this._global.displayLogMessage("Database","createSystemTable","Table created");},
          (error)   => {reject();  this._global.displayErrorMessage("Database", "createSystemTable", error);}
        )
    })
  }

  public deletePreviousImage(){
    this._query =
        " DELETE FROM " + this._global.TABLE_SYSTEM +
        " WHERE "       + this._global.SYSTEM_ID    + " = ?";

    return new Promise((resolve, reject) => {
      this._db.executeSql(this._query, ["1"])
          .then(
              (success) => { resolve(); },
              (error)   => { reject(); this._global.displayErrorMessage("Database", "deletePreviousImage", error); }
          );
    })
  }


  public saveImage(base64image){

    this._query =
      "INSERT INTO " + this._global.TABLE_SYSTEM +
      " (" + this._global.SYSTEM_IMAGE + ") VALUES (?)";

    return new Promise((resolve, reject) => {
      this._db.executeSql(this._query, [base64image])
        .then(
          (success) => { resolve(); },
          (error)   => { reject(); this._global.displayErrorMessage("Database", "insertSystemValue", error); }
        );
    })
  }

  public selectImageBase64(){

    this._query =
      " SELECT " + this._global.SYSTEM_IMAGE +
      " FROM "   + this._global.TABLE_SYSTEM;

    return new Promise((resolve, reject) => {
      this._db.executeSql(this._query, [])
        .then(
          (res)   => { resolve(res.rows.item(0).image);},
          (error) => { reject(); this._global.displayErrorMessage("Database", "selectAllFromTable", error);}
        );
    })
  }


  }











