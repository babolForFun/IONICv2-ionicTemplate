import { Injectable }   from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class GlobalVariables {

  // APP PARAMS
  public dbName             : string = "databaseName.db";

  // DATABASE VARIABLES
  public TABLE_SYSTEM       : string = "system";
  public SYSTEM_ID          : string = "id";
  public SYSTEM_IMAGE       : string = "image";
  public SYSTEM_CREATED_ON  : string = "created_on";
  
  // HTTP REQUESTs
  public REQUEST_GET        : string = "http://httpbin.org/user-agent";
  public REQUEST_POST       : string = "http://httpbin.org/post";
  public REQUEST_POST_PARAM = {'id':'babolForFun'};
  public REQUEST_HEADER     = {'Accept':'application/json'};
  
  
  constructor() {}

  
  displayErrorMessage(type, functionName, errorMessage){
    console.error("ERROR: " + type + "\nFUNCTION: " + functionName + "\nMESSAGE: " + JSON.stringify(errorMessage))
  }
  
  displayLogMessage(type, functionName, message){
    console.log("ERROR: " + type + "\nFUNCTION: " + functionName + "\nMESSAGE: "   + JSON.stringify(message))
  }

}
